/**
 * QR Code generator
 * Supports Versions 1–6, ECC Level L, Byte mode
 * Auto-selects version based on input length (max 134 bytes)
 */

// Maximum byte capacity per version (ECC Level L, byte mode)
const CAPACITY_L = [17, 32, 53, 78, 106, 134]

// Block info per version: [numBlocks, dataPerBlock, eccPerBlock]
const BLOCK_INFO: [number, number, number][] = [
  [1, 19, 7], // V1
  [1, 34, 10], // V2
  [1, 55, 15], // V3
  [2, 40, 10], // V4
  [2, 54, 13], // V5
  [4, 34, 9], // V6
]

// Alignment pattern row/col position lists per version (v-1 index)
const ALIGN_POSITIONS: number[][] = [
  [], // V1: no alignment
  [6, 18], // V2
  [6, 22], // V3
  [6, 26], // V4
  [6, 30], // V5
  [6, 34], // V6
]

// Remainder bits after the codeword sequence (V2–V6 have 7)
const REMAINDER_BITS = [0, 7, 7, 7, 7, 7]

// Format information word: ECC Level L (01), Mask 0 (000)
// Pre-computed: BCH(01000) XOR 0x5412 = 0x77C4
const FORMAT_ECC_L_MASK0 = 0x77C4

// ── GF(256) arithmetic ───────────────────────────────────────────────────────
const EXP = new Uint8Array(512)
const LOG = new Uint8Array(256)
let _gfReady = false

function initGF() {
  if (_gfReady)
    return
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP[i] = x
    LOG[x] = i
    x <<= 1
    if (x & 0x100)
      x ^= 0x11D // x^8+x^4+x^3+x^2+1
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]
  _gfReady = true
}

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0)
    return 0
  return EXP[LOG[a] + LOG[b]]
}

// ── Reed-Solomon ECC ─────────────────────────────────────────────────────────
function rsECC(data: number[], eccLen: number): number[] {
  initGF()
  // Build generator polynomial
  let g: number[] = [1]
  for (let i = 0; i < eccLen; i++) {
    const newG = Array.from<number>({ length: g.length + 1 }, () => 0)
    for (let j = 0; j < g.length; j++) {
      newG[j] ^= g[j]
      newG[j + 1] ^= gfMul(g[j], EXP[i])
    }
    g = newG
  }
  // Polynomial division
  const msg = [...data, ...Array.from<number>({ length: eccLen }, () => 0)]
  for (let i = 0; i < data.length; i++) {
    const coef = msg[i]
    if (coef !== 0) {
      for (let j = 1; j < g.length; j++) {
        msg[i + j] ^= gfMul(g[j], coef)
      }
    }
  }
  return msg.slice(data.length)
}

// ── Matrix helpers ────────────────────────────────────────────────────────────
function setFn(mat: number[][], fn: boolean[][], r: number, c: number, val: number) {
  mat[r][c] = val
  fn[r][c] = true
}

function placeFinder(mat: number[][], fn: boolean[][], size: number, r0: number, c0: number) {
  for (let dr = -1; dr <= 7; dr++) {
    for (let dc = -1; dc <= 7; dc++) {
      const row = r0 + dr
      const col = c0 + dc
      if (row < 0 || row >= size || col < 0 || col >= size)
        continue
      if (dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6) {
        const onBorder = dr === 0 || dr === 6 || dc === 0 || dc === 6
        const inCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4
        setFn(mat, fn, row, col, onBorder || inCore ? 1 : 0)
      }
      else {
        setFn(mat, fn, row, col, 0) // separator (white)
      }
    }
  }
}

function placeAlignment(mat: number[][], fn: boolean[][], r: number, c: number) {
  for (let dr = -2; dr <= 2; dr++) {
    for (let dc = -2; dc <= 2; dc++) {
      const onBorder = dr === -2 || dr === 2 || dc === -2 || dc === 2
      const inCore = dr === 0 && dc === 0
      setFn(mat, fn, r + dr, c + dc, onBorder || inCore ? 1 : 0)
    }
  }
}

// ── Main encoder ──────────────────────────────────────────────────────────────
export function generateQRMatrix(text: string): boolean[][] | null {
  const bytes = Array.from(new TextEncoder().encode(text))

  // Auto-select version
  let version = -1
  for (let v = 0; v < CAPACITY_L.length; v++) {
    if (bytes.length <= CAPACITY_L[v]) {
      version = v + 1
      break
    }
  }
  if (version < 0)
    return null // text too long (> 134 bytes)

  const size = 21 + (version - 1) * 4
  const [numBlocks, dataPerBlock, eccPerBlock] = BLOCK_INFO[version - 1]
  const totalDataCW = numBlocks * dataPerBlock

  // ── Build bit stream ──────────────────────────────────────────────────────
  const bits: number[] = []
  // Mode: byte = 0100
  bits.push(0, 1, 0, 0)
  // Character count (8 bits for versions 1–9, byte mode)
  for (let i = 7; i >= 0; i--) bits.push((bytes.length >> i) & 1)
  // Data bytes
  for (const b of bytes) {
    for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1)
  }
  // Terminator
  const totalBits = totalDataCW * 8
  for (let i = 0; i < 4 && bits.length < totalBits; i++) bits.push(0)
  // Byte-align
  while (bits.length % 8 !== 0) bits.push(0)
  // Pad codewords
  let padIdx = 0
  while (bits.length < totalBits) {
    const padByte = padIdx % 2 === 0 ? 0xEC : 0x11
    for (let i = 7; i >= 0; i--) bits.push((padByte >> i) & 1)
    padIdx++
  }

  // ── Convert to data codewords ─────────────────────────────────────────────
  const dataBytes: number[] = []
  for (let i = 0; i < totalDataCW; i++) {
    let b = 0
    for (let j = 0; j < 8; j++) b = (b << 1) | bits[i * 8 + j]
    dataBytes.push(b)
  }

  // ── Split into blocks + compute ECC ──────────────────────────────────────
  const dataBlocks: number[][] = []
  const eccBlocks: number[][] = []
  for (let blk = 0; blk < numBlocks; blk++) {
    const block = dataBytes.slice(blk * dataPerBlock, (blk + 1) * dataPerBlock)
    dataBlocks.push(block)
    eccBlocks.push(rsECC(block, eccPerBlock))
  }

  // ── Interleave: data (column-major), then ECC (column-major) ─────────────
  const allBytes: number[] = []
  for (let col = 0; col < dataPerBlock; col++) {
    for (const block of dataBlocks) allBytes.push(block[col])
  }
  for (let col = 0; col < eccPerBlock; col++) {
    for (const block of eccBlocks) allBytes.push(block[col])
  }

  // ── Final bit sequence + remainder bits ──────────────────────────────────
  const finalBits: number[] = []
  for (const b of allBytes) {
    for (let i = 7; i >= 0; i--) finalBits.push((b >> i) & 1)
  }
  for (let i = 0; i < REMAINDER_BITS[version - 1]; i++) finalBits.push(0)

  // ── Build 21+… × 21+… matrix ─────────────────────────────────────────────
  const mat: number[][] = Array.from({ length: size }, () => Array.from<number>({ length: size }, () => -1))
  const fn: boolean[][] = Array.from({ length: size }, () => Array.from<boolean>({ length: size }, () => false))

  // Finder patterns + separators
  placeFinder(mat, fn, size, 0, 0) // top-left
  placeFinder(mat, fn, size, 0, size - 7) // top-right
  placeFinder(mat, fn, size, size - 7, 0) // bottom-left

  // Timing patterns (row 6 and col 6, between separators)
  for (let i = 8; i <= size - 9; i++) {
    setFn(mat, fn, 6, i, i % 2 === 0 ? 1 : 0)
    setFn(mat, fn, i, 6, i % 2 === 0 ? 1 : 0)
  }

  // Dark module (always 1, stays outside format info area)
  setFn(mat, fn, 4 * version + 9, 8, 1)

  // Reserve format information areas
  for (let i = 0; i <= 8; i++) {
    if (!fn[8][i])
      setFn(mat, fn, 8, i, 0)
    if (!fn[i][8])
      setFn(mat, fn, i, 8, 0)
  }
  for (let i = size - 8; i < size; i++) {
    if (!fn[8][i])
      setFn(mat, fn, 8, i, 0)
  }
  for (let i = size - 7; i < size; i++) {
    if (!fn[i][8])
      setFn(mat, fn, i, 8, 0)
  }

  // Alignment patterns (V2+)
  if (version >= 2) {
    const positions = ALIGN_POSITIONS[version - 1]
    for (const r of positions) {
      for (const c of positions) {
        if (!fn[r][c])
          placeAlignment(mat, fn, r, c)
      }
    }
  }

  // ── Place data bits (zig-zag) ─────────────────────────────────────────────
  let bitIdx = 0
  let up = true
  let col = size - 1
  while (col >= 1) {
    if (col === 6)
      col-- // skip timing column
    for (let i = 0; i < size; i++) {
      const row = up ? size - 1 - i : i
      for (let dc = 0; dc < 2; dc++) {
        const c = col - dc
        if (!fn[row][c]) {
          mat[row][c] = bitIdx < finalBits.length ? finalBits[bitIdx++] : 0
        }
      }
    }
    up = !up
    col -= 2
  }

  // ── Apply mask 0: (row + col) % 2 === 0 ──────────────────────────────────
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!fn[r][c] && (r + c) % 2 === 0)
        mat[r][c] ^= 1
    }
  }

  // ── Place format information (ECC-L, Mask 0) ─────────────────────────────
  const FORMAT = FORMAT_ECC_L_MASK0
  const fmtA: [number, number][] = [
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 7],
    [8, 8],
    [7, 8],
    [5, 8],
    [4, 8],
    [3, 8],
    [2, 8],
    [1, 8],
    [0, 8],
  ]
  const fmtB: [number, number][] = [
    [size - 1, 8],
    [size - 2, 8],
    [size - 3, 8],
    [size - 4, 8],
    [size - 5, 8],
    [size - 6, 8],
    [size - 7, 8],
    [8, size - 8],
    [8, size - 7],
    [8, size - 6],
    [8, size - 5],
    [8, size - 4],
    [8, size - 3],
    [8, size - 2],
    [8, size - 1],
  ]
  for (let i = 0; i < 15; i++) {
    const bit = (FORMAT >> i) & 1
    mat[fmtA[i][0]][fmtA[i][1]] = bit
    mat[fmtB[i][0]][fmtB[i][1]] = bit
  }

  // Convert to boolean
  return mat.map(row => row.map(v => v === 1))
}

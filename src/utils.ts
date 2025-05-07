import fs from 'fs'
import { createHash } from 'crypto'
import path from 'path'

export function buildContract(filename: string, ext: string): string {
  const buildPath = process.cwd() + '/' + 'build'
  return wasmToHex(path.resolve(__dirname, `${buildPath}/${filename}.${ext}`))
}

export function wasmToHex(path: string): string {
  const wasm = fs.readFileSync(path)
  return wasm.toString(`hex`).toUpperCase()
}

export function generateHash(dataBytes: Buffer) {
  const hash = createHash('sha512').update(dataBytes).digest()
  return hash.slice(0, 32).toString('hex').toUpperCase()
}

export function padHexString(input: string, targetLength = 64): string {
  const paddedString = '0'.repeat(targetLength - input.length) + input
  return paddedString
}

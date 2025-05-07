import fs from 'fs'
import path from 'path'

export function readWasmFromFile(
  project: string,
  filename: string,
  ext = '.wasm'
): string {
  const buildPath = process.cwd() + '/' + 'build'
  const projectPath = `/${project}/wasm32v1-none/release`
  return wasmToHex(
    path.resolve(__dirname, `${buildPath}/${projectPath}/${filename}.${ext}`)
  )
}

export function wasmToHex(path: string): string {
  const wasm = fs.readFileSync(path)
  return wasm.toString(`hex`).toUpperCase()
}

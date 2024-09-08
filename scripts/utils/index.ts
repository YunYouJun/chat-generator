import path from 'node:path'
import { config, type SheetKey } from '../config'

export * from './convert'

/**
 * Get CSV absolute file path
 */
export function getCSVFilePath(name: SheetKey | 'toc') {
  return path.resolve(config.csvDataPath, `${name}.csv`)
}

/**
 * sleep
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

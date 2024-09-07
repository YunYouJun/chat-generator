import path from 'node:path'
import { config, type SheetKey } from './config'

/**
 * Get CSV absolute file path
 */
export function getCSVFilePath(name: SheetKey) {
  return path.resolve(config.csvDataPath, `${name}.csv`)
}

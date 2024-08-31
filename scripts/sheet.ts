import path from 'node:path'
import fs from 'fs-extra'
import { config } from './config'
import { downloadCSV } from '~~/packages/feishu-sheet'

const csvFilePath = path.resolve(config.srcDataPath, config.srcCsvName)

async function main() {
  await fs.ensureDir(config.srcDataPath)
  await downloadCSV({
    csvFilePath,
  })
}

main()

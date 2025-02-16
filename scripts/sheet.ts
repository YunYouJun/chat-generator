import path from 'node:path'
import { downloadCSV } from '@yunlefun/feishu'

import consola from 'consola'
import fs from 'fs-extra'
import { tocSheetId } from '~~/config'
import { collectionTOC, config, spreadsheetToken } from './config'

import { convertCSVToJSON, getCSVFilePath, sleep } from './utils'

/**
 * Download all dataset CSV files
 */
export async function downloadAllCSV() {
  for (const collection of collectionTOC) {
    const csvFilePath = getCSVFilePath(collection.id)
    const sub_id = collection.sheet_id
    if (sub_id) {
      await downloadCSV({
        token: spreadsheetToken,
        sub_id,
        csvFilePath,
      })
    }
    else {
      consola.warn(`Skip downloading ${collection.name} ...`)
    }
  }
}

export async function main() {
  await fs.ensureDir(config.csvDataPath)

  // 下载合集目录
  const tocCSVFilePath = path.resolve(config.csvDataPath, '../toc.csv')
  await downloadCSV({
    token: spreadsheetToken,
    sub_id: tocSheetId,
    csvFilePath: tocCSVFilePath,
  })
  await sleep(100)
  await convertCSVToJSON(tocCSVFilePath)

  consola.start('Downloading all dataset CSV files ... 🚀')
  await downloadAllCSV()
}

main()

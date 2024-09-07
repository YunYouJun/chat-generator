import fs from 'fs-extra'
import { downloadCSV } from '../packages/feishu-sheet'

import { config, SHEET_MAP, type SheetKey, spreadsheetToken } from './config'
import { getCSVFilePath } from './utils'

export async function main() {
  await fs.ensureDir(config.csvDataPath)

  // download all dataset CSV files
  for (const datasetName in SHEET_MAP) {
    const name = datasetName as SheetKey
    const csvFilePath = getCSVFilePath(name)
    await downloadCSV({
      token: spreadsheetToken,
      sub_id: SHEET_MAP[name],
      csvFilePath,
    })
  }
}

main()

import consola from 'consola'
import { parse } from 'csv-parse/sync'
import fs from 'fs-extra'
import colors from 'picocolors'
import { SHEET_MAP, type SheetKey } from './config'

import { getCSVFilePath } from './utils'

/**
 * Convert CSV to JSON
 */
export async function convertCSVToJSON(datasetName: SheetKey) {
  const csvFilePath = getCSVFilePath(datasetName)
  const csvFileContent = await fs.readFile(csvFilePath, 'utf-8')
  const recordContent = csvFileContent.trim()
  let records = parse(recordContent, {
    columns: true,
    skip_records_with_empty_values: true,
    skip_empty_lines: true,
  })
  if (Array.isArray(records)) {
    records = records.map((record) => {
      // filter empty values
      for (const key in record) {
        if (record[key] === '') {
          delete record[key]
        }
      }
      return record
    })
    consola.success(`Converting ${colors.cyan(`${datasetName}.csv`)} to ${colors.yellow(`${datasetName}.json`)}`)
  }
  else {
    throw new TypeError('Invalid records')
  }

  await fs.writeJson(csvFilePath.replace('.csv', '.json'), records, {
    spaces: 2,
  })
}

Object.keys(SHEET_MAP).forEach((datasetName) => {
  convertCSVToJSON(datasetName as SheetKey)
})

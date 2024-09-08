import path from 'node:path'
import consola from 'consola'
import { parse } from 'csv-parse/sync'
import fs from 'fs-extra'
import colors from 'picocolors'
import { getCSVFilePath } from '.'

import type { SheetKey } from '../config'

/**
 * Convert CSV to JSON
 * @param csvFilePath
 */
export async function convertCSVToJSON(csvFilePath: string) {
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
    const csvFileName = path.basename(csvFilePath)
    consola.success(`Converting ${colors.cyan(csvFileName)} to ${colors.yellow(csvFileName.replace('.csv', '.json'))}`)
  }
  else {
    throw new TypeError('Invalid records')
  }

  await fs.writeJson(csvFilePath.replace('.csv', '.json'), records, {
    spaces: 2,
  })
}

/**
 * Convert CSV to JSON
 */
export async function convertCSVToJSONById(datasetId: SheetKey) {
  const csvFilePath = getCSVFilePath(datasetId)
  await convertCSVToJSON(csvFilePath)
}

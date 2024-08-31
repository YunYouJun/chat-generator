import path from 'node:path'

export const config = {
  srcDataPath: path.resolve(import.meta.dirname, '../packages/datasets/csv'),
  srcCsvName: 'chat-history.csv',
}

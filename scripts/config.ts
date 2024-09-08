import path from 'node:path'
import tocJSON from '../packages/datasets/toc.json'

/**
 * 表格：聊天记录合集
 * @see https://open.feishu.cn/document/server-docs/docs/sheets-v3/overview
 * 可以先创建表格文件，拿到表格的 token，再转入云文档
 */
export const spreadsheetToken = 'EZoZsREUjhDsvEt5iYUct0IInkf'
export type SheetKey = typeof tocJSON[number]['sheet_id']
export const collectionTOC = tocJSON

export const config = {
  csvDataPath: path.resolve(import.meta.dirname, '../packages/datasets/csv'),
}

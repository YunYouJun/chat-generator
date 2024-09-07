import path from 'node:path'

/**
 * 表格：聊天记录合集
 * @see https://open.feishu.cn/document/server-docs/docs/sheets-v3/overview
 * 可以先创建表格文件，拿到表格的 token，再转入云文档
 */
export const spreadsheetToken = 'EZoZsREUjhDsvEt5iYUct0IInkf'
export const SHEET_MAP = {
  joker: '6a7dc9',
  loveSF: 'zuMbfa',
  pua: 'Rrssvg',
  xiatou: 'yndDUM',
}

export type SheetKey = keyof typeof SHEET_MAP

export const config = {
  csvDataPath: path.resolve(import.meta.dirname, '../packages/datasets/csv'),
}

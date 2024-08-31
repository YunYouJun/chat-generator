import process from 'node:process'
import * as lark from '@larksuiteoapi/node-sdk'
import consola from 'consola'
import { FEISHU_APP_ID, FEISHU_APP_SECRET } from './config'

if (!FEISHU_APP_ID || !FEISHU_APP_SECRET)
  throw new Error('Missing FEISHU_APP_ID or FEISHU_APP_SECRET')

if (process.env.NODE_ENV === 'development')
  consola.debug(FEISHU_APP_ID, FEISHU_APP_SECRET)

export const client = new lark.Client({
  appId: FEISHU_APP_ID,
  appSecret: FEISHU_APP_SECRET,
})

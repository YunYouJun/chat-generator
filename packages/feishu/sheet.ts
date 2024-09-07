import { sleep } from '@antfu/utils'
import consola from 'consola'
import { client } from './utils'

/**
 * 获取表格 token
 * 对于知识库中的电子表格，你需调用获取知识空间节点信息接口来获取电子表格的 obj_token。此时，该 obj_token 也是该表格的 spreadsheetToken。
 */
export async function getSheetToken(params: {
  token: string
}) {
  const res = await client.wiki.v2.space.getNode({
    params: {
      token: params.token,
      obj_type: 'sheet',
    },
  }).catch((e) => {
    consola.error(e.message)
  })
  consola.info(res)
}

/**
 * 从飞书表格导出数据
 */
export async function downloadCSV(options: {
  token: string
  sub_id: string
  csvFilePath: string
}) {
  // 创建导出任务
  const res = await client.drive.exportTask.create({
    data: {
      file_extension: 'csv',
      type: 'sheet',
      token: options.token,
      sub_id: options.sub_id,
    },
  }).catch((e) => {
    consola.error(e.message)
  })

  if (!res || !res.data || !res.data.ticket) {
    consola.error('导出任务创建失败')
    return
  }

  let file_token = ''
  // 轮询查询导出任务结果
  for (let i = 0; i < 10; i++) {
    const result = await client.drive.exportTask.get({
      params: {
        token: options.token,
      },
      path: {
        ticket: res.data.ticket,
      },
    })
    if (result.data && result.data.result && result.data.result.file_token) {
      file_token = result.data.result.file_token
      break
    }

    await sleep(1000)
  }

  // 下载导出文件
  await client.drive.exportTask.download({
    path: {
      file_token,
    },
  }).then((res) => {
    if (res.writeFile) {
      res.writeFile(options.csvFilePath)
      consola.success(`下载数据文件：${options.csvFilePath}`)
    }
  }).catch((e) => {
    consola.error(e.msg)
  })
}

import { Buffer } from 'node:buffer'
import { LRUCache } from 'lru-cache'

// LRU cache
const cache = new LRUCache({ max: 1000 })

function wrapBase64(str: string) {
  return `data:image/png;base64,${str}`
}

/**
 * input img url, return img base64
 * lru cache
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { url } = query

  if (!url) {
    return {
      code: 400,
      message: 'url is required',
    }
  }

  if (cache.has(url as string)) {
    return wrapBase64(cache.get(url) as string)
  }
  else {
    const imgUrl = new URL(url as string)
    const res = await fetch(imgUrl)
    const buffer = await res.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    cache.set(url, base64)
    return wrapBase64(base64)
  }
})

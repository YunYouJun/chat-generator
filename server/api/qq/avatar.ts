import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, string>({ max: 1000 })

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!)
  }
  return btoa(binary)
}

/**
 * General image proxy: fetch remote image and return base64 data URL.
 * Query: ?url=https://...
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string

  if (!url || !url.startsWith('http')) {
    throw createError({ statusCode: 400, statusMessage: 'url is required' })
  }

  if (cache.has(url)) {
    return cache.get(url)!
  }

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      throw new Error(`Upstream error: ${res.status}`)
    }

    const buffer = await res.arrayBuffer()
    const base64 = arrayBufferToBase64(buffer)
    const dataUrl = `data:image/jpeg;base64,${base64}`

    cache.set(url, dataUrl)
    return dataUrl
  }
  catch (err: any) {
    console.error('[qq/avatar] error for url', url, '-', err.message)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch image',
    })
  }
})

function wrapBase64(str: string) {
  return `data:image/png;base64,${str}`
}

/**
 * input img url, return img base64
 * lru cache
 */
export async function onRequest({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return {
      code: 400,
      message: 'url is required',
    }
  }

  const cache = await caches.open('default')

  const cacheBase64 = await cache.match(url as string).then(res => res?.text())
  if (cacheBase64) {
    return wrapBase64(cacheBase64)
  }
  else {
    const imgUrl = new URL(url as string)
    const res = await fetch(imgUrl)
    const buffer = await res.arrayBuffer()
    // const base64 = Buffer.from(buffer).toString('base64')
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))

    // cache.set(url, base64)
    cache.put(url, new Response(base64))
    return wrapBase64(base64)
  }
}

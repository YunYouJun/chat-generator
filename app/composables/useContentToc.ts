export interface TocItem {
  id: string
  text: string
  depth: number
}

/**
 * Composable for Nuxt Content TOC with active heading tracking.
 *
 * Uses the built-in `body.toc.links` from Nuxt Content v3 (minimark format).
 *
 * @param body - Reactive ref of the Nuxt Content document body
 * @param options - Observer options for scroll tracking
 */
export function useContentToc(
  body: Ref<any> | ComputedRef<any>,
  options: {
    rootMargin?: string
    threshold?: number
  } = {},
) {
  const { rootMargin = '-80px 0px -60% 0px', threshold = 0.1 } = options

  const tocItems = computed<TocItem[]>(() => {
    const b = toValue(body)
    const links = b?.toc?.links
    if (!Array.isArray(links))
      return []
    return links.map((link: any) => ({
      id: link.id,
      text: link.text,
      depth: link.depth,
    }))
  })

  const activeId = ref('')

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
            break
          }
        }
      },
      { rootMargin, threshold },
    )

    nextTick(() => {
      for (const item of tocItems.value) {
        const el = document.getElementById(item.id)
        if (el)
          observer.observe(el)
      }
    })

    onUnmounted(() => observer.disconnect())
  })

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      activeId.value = id
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return {
    tocItems,
    activeId,
    scrollTo,
  }
}

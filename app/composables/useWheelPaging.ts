import type { Ref } from 'vue'

export function useWheelPaging(scrollEl: Ref<HTMLElement | null>) {
  const reducedMotion = usePreferredReducedMotion()
  const route = useRoute()
  const router = useRouter()
  const activeSnapIndex = shallowRef(0)
  const isAnimating = shallowRef(false)
  const isUserScrolling = shallowRef(false)

  // Runs as an inline script before hydration — scrolls the overflow container
  // to the hash target before first paint, avoiding the SSG flash.
  onPrehydrate(() => {
    const hash = window.location.hash.slice(1)
    if (!hash || hash === 'hero')
      return
    const target = document.getElementById(hash)
    const container = document.querySelector('main')
    if (target && container)
      container.scrollTop = target.offsetTop
  })

  function setup(root: HTMLElement) {
    const initialSnapType = getComputedStyle(root).scrollSnapType || 'y mandatory'
    const snapEls = [...root.querySelectorAll<HTMLElement>('[data-snap]')]

    function disableSnap() {
      root.style.scrollSnapType = 'none'
    }

    function restoreSnap() {
      root.style.scrollSnapType = initialSnapType
    }

    function nearestIndex() {
      const st = root.scrollTop
      let best = 0
      let bestDist = Infinity
      for (let i = 0; i < snapEls.length; i++) {
        const d = Math.abs(snapEls[i]!.offsetTop - st)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      }
      return best
    }

    let rafId: number | undefined
    let wheelBurstTimer: ReturnType<typeof setTimeout> | undefined
    let touchEndTimer: ReturnType<typeof setTimeout> | undefined
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined

    function cancelAnimation() {
      if (rafId != null) {
        cancelAnimationFrame(rafId)
        rafId = undefined
      }
      isAnimating.value = false
      restoreSnap()
    }

    onBeforeUnmount(() => {
      cancelAnimation()
      clearTimeout(wheelBurstTimer)
      clearTimeout(touchEndTimer)
      clearTimeout(scrollEndTimer)
    })

    function animateScrollTo(targetTop: number, durationMs = 600) {
      if (reducedMotion.value === 'reduce') {
        root.scrollTop = targetTop
        return
      }

      cancelAnimation()
      isAnimating.value = true
      disableSnap()

      const startTop = root.scrollTop
      const delta = targetTop - startTop
      if (Math.abs(delta) < 1) {
        isAnimating.value = false
        restoreSnap()
        return
      }

      const start = performance.now()
      const easeInOutQuint = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2)

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs)
        root.scrollTop = startTop + delta * easeInOutQuint(t)
        if (t < 1) {
          rafId = requestAnimationFrame(tick)
        }
        else {
          rafId = undefined
          isAnimating.value = false
          restoreSnap()
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    function updateRoute(index: number) {
      const el = snapEls[index]
      const newHash = el?.id && el.id !== 'hero' ? `#${el.id}` : ''
      if (route.hash !== newHash) {
        router.replace({ hash: newHash })
      }
    }

    function scrollToIndex(index: number, animate = true) {
      if (!snapEls.length || index < 0 || index >= snapEls.length)
        return

      const targetTop = snapEls[index]!.offsetTop
      activeSnapIndex.value = index

      if (animate) {
        animateScrollTo(targetTop, 600)
      }
      else {
        root.scrollTop = targetTop
      }

      clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(() => {
        updateRoute(index)
      }, 100)
    }

    watch(
      () => route.hash,
      (hash) => {
        const id = hash.slice(1)
        const targetIdx = id ? Math.max(0, snapEls.findIndex(el => el.id === id)) : 0
        const index = nearestIndex()
        if (targetIdx !== index && !isUserScrolling.value) {
          scrollToIndex(targetIdx, true)
        }
      },
      { immediate: false },
    )

    const flip = (dir: 1 | -1) => {
      if (isAnimating.value)
        cancelAnimation()

      const index = nearestIndex()
      activeSnapIndex.value = index
      if (!snapEls.length)
        return

      const next = Math.min(snapEls.length - 1, Math.max(0, index + dir))
      if (next === index)
        return

      scrollToIndex(next, true)
    }

    let isWheelActive = false

    useEventListener(
      root,
      'wheel',
      (e: WheelEvent) => {
        const target = e.target as HTMLElement
        const scrollableParent = target.closest('[data-scrollable]') as HTMLElement | null
        if (scrollableParent) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableParent
          const isAtTop = scrollTop === 0
          const isAtBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 1

          if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
            return
          }
        }

        e.preventDefault()

        if (e.deltaY === 0)
          return

        const wasActive = isWheelActive
        isWheelActive = true
        isUserScrolling.value = true

        clearTimeout(wheelBurstTimer)
        wheelBurstTimer = setTimeout(() => {
          isWheelActive = false
          isUserScrolling.value = false
        }, 150)

        if (wasActive || isAnimating.value)
          return

        const dir = e.deltaY > 0 ? 1 : -1
        const index = nearestIndex()

        if (!snapEls.length)
          return

        const next = Math.min(snapEls.length - 1, Math.max(0, index + dir))
        if (next === index)
          return

        flip(dir)
      },
      { passive: false },
    )

    let touchStartY = 0
    let touchStartTime = 0
    let isTouchActive = false

    useEventListener(
      root,
      'touchstart',
      (e: TouchEvent) => {
        touchStartY = e.touches[0]!.clientY
        touchStartTime = Date.now()
        isTouchActive = true
        isUserScrolling.value = true
      },
      { passive: true },
    )

    useEventListener(
      root,
      'touchend',
      (e: TouchEvent) => {
        if (!isTouchActive)
          return

        const touchEndY = e.changedTouches[0]!.clientY
        const touchEndTime = Date.now()
        const deltaY = touchStartY - touchEndY
        const deltaTime = touchEndTime - touchStartTime

        if (Math.abs(deltaY) > 50 && deltaTime < 300) {
          const dir = deltaY > 0 ? 1 : -1
          const index = nearestIndex()

          if (!snapEls.length) {
            isTouchActive = false
            isUserScrolling.value = false
            return
          }

          const next = Math.min(snapEls.length - 1, Math.max(0, index + dir))
          if (next !== index) {
            e.preventDefault()
            flip(dir)
          }
        }

        isTouchActive = false
        clearTimeout(touchEndTimer)
        touchEndTimer = setTimeout(() => {
          isUserScrolling.value = false
        }, 150)
      },
      { passive: false },
    )

    useEventListener(
      root,
      'scroll',
      () => {
        if (isAnimating.value)
          return
        const index = nearestIndex()
        activeSnapIndex.value = index
        clearTimeout(scrollEndTimer)
        scrollEndTimer = setTimeout(() => {
          updateRoute(index)
        }, 50)
      },
      { passive: true },
    )
  }

  onMounted(() => {
    const root = scrollEl.value
    if (root)
      setup(root)
  })

  return {
    activeSnapIndex,
    isAnimating,
  }
}

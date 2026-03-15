export function useWheelPaging(scrollEl: Ref<HTMLElement | null>) {
  const reducedMotion = usePreferredReducedMotion()
  const activeSnapIndex = shallowRef(0)
  const isAnimating = shallowRef(false)

  function setupWheelPaging() {
    const root = scrollEl.value
    if (!root)
      return
    const rootEl = root
    const initialSnapType = getComputedStyle(rootEl).scrollSnapType || 'y mandatory'

    function disableSnap() {
      rootEl.style.scrollSnapType = 'none'
    }

    function restoreSnap() {
      rootEl.style.scrollSnapType = initialSnapType
    }

    const snaps = () => [...rootEl.querySelectorAll<HTMLElement>('[data-snap]')]

    function nearestIndex() {
      const list = snaps()
      const st = rootEl.scrollTop
      let best = 0
      let bestDist = Infinity
      for (let i = 0; i < list.length; i++) {
        const d = Math.abs(list[i]!.offsetTop - st)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      }
      return { list, index: best }
    }

    let rafId: number | undefined
    let wheelBurstTimer: ReturnType<typeof setTimeout> | undefined

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
    })

    function animateScrollTo(targetTop: number, durationMs = 600) {
      if (reducedMotion.value === 'reduce') {
        rootEl.scrollTop = targetTop
        return
      }

      cancelAnimation()
      isAnimating.value = true
      disableSnap()

      const startTop = rootEl.scrollTop
      const delta = targetTop - startTop
      if (Math.abs(delta) < 1) {
        isAnimating.value = false
        return
      }

      const start = performance.now()
      const easeInOutQuint = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2)

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs)
        rootEl.scrollTop = startTop + delta * easeInOutQuint(t)
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

    const flip = (dir: 1 | -1) => {
      if (isAnimating.value)
        cancelAnimation()

      const { list, index } = nearestIndex()
      activeSnapIndex.value = index
      if (!list.length)
        return

      const next = Math.min(list.length - 1, Math.max(0, index + dir))
      if (next === index)
        return

      activeSnapIndex.value = next
      animateScrollTo(list[next]!.offsetTop, 600)
    }

    let isWheelActive = false

    useEventListener(rootEl, 'wheel', (e: WheelEvent) => {
      e.preventDefault()

      if (e.deltaY === 0)
        return

      const wasActive = isWheelActive
      isWheelActive = true

      clearTimeout(wheelBurstTimer)
      wheelBurstTimer = setTimeout(() => {
        isWheelActive = false
      }, 150)

      if (wasActive)
        return

      const dir = e.deltaY > 0 ? 1 : -1
      const { list, index } = nearestIndex()

      if (!list.length)
        return

      const next = Math.min(list.length - 1, Math.max(0, index + dir))
      if (next === index)
        return

      flip(dir)
    }, { passive: false })

    useEventListener(rootEl, 'scroll', () => {
      if (isAnimating.value)
        return
      activeSnapIndex.value = nearestIndex().index
    }, { passive: true })
  }

  onMounted(() => {
    setupWheelPaging()
  })

  return {
    activeSnapIndex,
    isAnimating,
  }
}

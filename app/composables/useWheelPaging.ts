import type { Ref } from 'vue'

export function useWheelPaging(scrollEl: Ref<HTMLElement | null>) {
  const reducedMotion = usePreferredReducedMotion()
  const route = useRoute()
  const router = useRouter()
  const activeSnapIndex = shallowRef(0)
  const isAnimating = shallowRef(false)
  const isUserScrolling = shallowRef(false)

  // 从路由参数读取当前part
  const targetPart = computed(() => {
    const part = Number(route.query.part)
    return Number.isNaN(part) ? 0 : Math.max(0, Math.min(3, part))
  })

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
      clearTimeout(scrollEndTimer)
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
        restoreSnap()
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

    // 更新路由参数
    function updateRoute(index: number) {
      if (index === 0) {
        // part=0时移除参数
        if (route.query.part !== undefined) {
          router.replace({ query: { ...route.query, part: undefined } })
        }
      }
      else {
        // 只有当参数变化时才更新
        const currentPart = Number(route.query.part)
        if (Number.isNaN(currentPart) || currentPart !== index) {
          router.replace({ query: { ...route.query, part: index } })
        }
      }
    }

    // 滚动到指定索引
    function scrollToIndex(index: number, animate = true) {
      const list = snaps()
      if (!list.length || index < 0 || index >= list.length)
        return

      const targetTop = list[index]!.offsetTop
      activeSnapIndex.value = index

      if (animate) {
        animateScrollTo(targetTop, 600)
      }
      else {
        rootEl.scrollTop = targetTop
      }

      // 延迟更新路由，避免动画期间的频繁更新
      clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(() => {
        updateRoute(index)
      }, 100)
    }

    // 监听路由参数变化
    watch(targetPart, (newPart) => {
      const { index } = nearestIndex()
      if (newPart !== index && !isUserScrolling.value) {
        scrollToIndex(newPart, true)
      }
    }, { immediate: false })

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

      scrollToIndex(next, true)
    }

    let isWheelActive = false

    useEventListener(rootEl, 'wheel', (e: WheelEvent) => {
      // 检查是否在某些可滚动元素内
      const target = e.target as HTMLElement
      const scrollableParent = target.closest('[data-scrollable]') as HTMLElement | null
      if (scrollableParent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableParent
        const isAtTop = scrollTop === 0
        const isAtBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 1

        // 如果在内部可滚动元素内且未到达边界，不处理
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

    // Touch support
    let touchStartY = 0
    let touchStartTime = 0
    let isTouchActive = false

    useEventListener(rootEl, 'touchstart', (e: TouchEvent) => {
      touchStartY = e.touches[0]!.clientY
      touchStartTime = Date.now()
      isTouchActive = true
      isUserScrolling.value = true
    }, { passive: true })

    useEventListener(rootEl, 'touchend', (e: TouchEvent) => {
      if (!isTouchActive)
        return

      const touchEndY = e.changedTouches[0]!.clientY
      const touchEndTime = Date.now()
      const deltaY = touchStartY - touchEndY
      const deltaTime = touchEndTime - touchStartTime

      // 只有快速滑动才触发翻页
      if (Math.abs(deltaY) > 50 && deltaTime < 300) {
        const dir = deltaY > 0 ? 1 : -1
        const { list, index } = nearestIndex()

        if (!list.length) {
          isTouchActive = false
          isUserScrolling.value = false
          return
        }

        const next = Math.min(list.length - 1, Math.max(0, index + dir))
        if (next !== index) {
          e.preventDefault()
          flip(dir)
        }
      }

      isTouchActive = false
      clearTimeout(wheelBurstTimer)
      wheelBurstTimer = setTimeout(() => {
        isUserScrolling.value = false
      }, 150)
    }, { passive: false })

    useEventListener(rootEl, 'scroll', () => {
      if (isAnimating.value)
        return
      const { index } = nearestIndex()
      activeSnapIndex.value = index
      updateRoute(index)
    }, { passive: true })

    // 初始化时根据路由参数滚动
    onMounted(() => {
      nextTick(() => {
        if (targetPart.value > 0) {
          scrollToIndex(targetPart.value, false)
        }
      })
    })
  }

  onMounted(() => {
    setupWheelPaging()
  })

  return {
    activeSnapIndex,
    isAnimating,
  }
}

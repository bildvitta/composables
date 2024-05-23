import { onMounted, onUnmounted, ref, nextTick } from 'vue'

const mediaQuery = window.matchMedia('print')
const isMediaPrint = ref<boolean>(mediaQuery.matches)

export function useMediaPrint () {
  function onMediaQueryChange (event: MediaQueryListEvent) {
    isMediaPrint.value = event.matches
  }

  async function openMediaPrint () {
    isMediaPrint.value = true

    await nextTick()

    window.print()
  }

  onMounted(() => {
    mediaQuery.addEventListener('change', onMediaQueryChange)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', onMediaQueryChange)
  })

  return {
    isMediaPrint,
    openMediaPrint
  }
}

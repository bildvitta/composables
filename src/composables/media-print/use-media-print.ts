import { onMounted, onUnmounted, ref, nextTick } from 'vue'

const mediaQuery = window.matchMedia('print')
const isMediaPrintActive = ref<boolean>(mediaQuery.matches)

export function useMediaPrint () {
  function onMediaQueryChange (event: MediaQueryListEvent) {
    isMediaPrintActive.value = event.matches
  }

  async function openMediaPrint () {
    isMediaPrintActive.value = true

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
    isMediaPrintActive,
    openMediaPrint
  }
}

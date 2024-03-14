import { ref } from 'vue'
import type { ViewParams } from './use-view.type'

enum ViewMode {
  List = 'list',
  Form = 'form',
  Single = 'single'
}

/**
 * @desc Composable para utilizar nos componentes de view, estes componentes normalmente
 * são componentes que englobam a página.
 *
 * @examples
 * ```html
 * <app-list-view-component
 *  v-model:results="viewState.results"
 *  v-model:fields="viewState.fields"
 *  v-model:results="viewState.metadata"
 *  v-model:results="viewState.fetching"
 * />
 *
 * <script setup>
 * const { viewState } = useView({ mode: 'list' })
 *
 * viewState.value.fetching // true | false
 * </script>
 * ```
 */
export function useView (config?: ViewParams) {
  const mode = config?.mode ?? ViewMode.Form

  const defaults = {
    errors: config?.defaults?.errors,
    metadata: config?.defaults?.metadata,
    values: config?.defaults?.values,
    fields: config?.defaults?.fields
  }

  const hasViewMode = Object.values(ViewMode).includes(mode as ViewMode)

  if (!hasViewMode) throw new Error('Invalid view mode.')

  const viewState = ref({
    errors: { ...defaults?.errors },
    fields: { ...defaults?.fields },
    metadata: { ...defaults?.metadata },

    fetching: false,

    ...(mode === ViewMode.List && { results: [] }),
    ...(mode === ViewMode.Single && { result: {} }),
    ...(mode === ViewMode.Form && { values: { ...defaults?.values }, submitting: false })
  })

  return {
    viewState
  }
}

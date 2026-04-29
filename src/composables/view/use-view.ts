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
 *  v-model:metadata="viewState.metadata"
 *  v-model:fetching="viewState.fetching"
 * />
 *
 * <script setup>
 * const { viewState, reset } = useView({ mode: 'list' })
 *
 * viewState.value.fetching // true | false
 *
 * reset() // reseta o estado da view para os valores padrões (default)
 *
 * reset(false) // reseta o estado da view para os valores não padrões (não default)
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

  if (!isViewMode(mode)) throw new Error('Invalid view mode.')

  const viewState = ref({
    errors: { ...defaults.errors },
    fields: { ...defaults.fields },
    metadata: { ...defaults.metadata },

    fetching: false,

    ...(mode === ViewMode.List && { results: [] }),
    ...(mode === ViewMode.Single && { result: {} }),
    ...(mode === ViewMode.Form && { values: { ...defaults.values }, submitting: false })
  })

  /**
   * Reseta os valores do estado da view.
   */
  const reset = (toDefaults = true) => {
    viewState.value.fetching = false

    viewState.value.errors = toDefaults ? { ...defaults.errors } : {}
    viewState.value.fields = toDefaults ? { ...defaults.fields } : {}
    viewState.value.metadata = toDefaults ? { ...defaults.metadata } : {}

    if (mode === ViewMode.Form) {
      viewState.value.values = toDefaults ? { ...defaults.values } : {}
      viewState.value.submitting = false
    }

    if (mode === ViewMode.List) viewState.value.results = []

    if (mode === ViewMode.Single) viewState.value.result = {}
  }

  return {
    viewState,
    reset
  }
}

function isViewMode (value: string): value is ViewMode {
  return Object.values(ViewMode).some(modeValue => (modeValue as string) === value)
}
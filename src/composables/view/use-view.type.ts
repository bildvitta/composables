import type { Ref } from 'vue'

export type ViewState = {
  errors: object
  fields: object
  metadata: object
  fetching: boolean
  values?: object
  submitting?: boolean
  results?: object[]
  result?: object
}

export type ViewStateRef = Ref<ViewState>

export type ViewModeTypes = 'list' | 'form' | 'single'

export type ViewStateDefaults = Pick<ViewState, 'errors' | 'metadata' | 'values' | 'fields'>

export type ViewParams = {
  mode: ViewModeTypes
  defaults: ViewStateDefaults
}

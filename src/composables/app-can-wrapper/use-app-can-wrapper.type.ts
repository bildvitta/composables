import { type UserStore } from '../../types'

export type AppCanStoreOptions = 'isSuperuser' | 'companyPermissions' | 'currentMainCompany' | 'mainCompanyOptions'

export type AppCanWrapperStore = Required<Pick<UserStore, AppCanStoreOptions>>

export type ActionType = string | string[]

export type UseAppCanWrapperParam = {
  store: AppCanWrapperStore
}

export type CanConfig = {
  action: ActionType
}

export type StringOrStringList = string | string[]

export type CanObjectOfConfig = Record<string, CanConfig>
export type CanEntityConfig = string | CanObjectOfConfig

export type AppCan = (entityConfig: CanEntityConfig, config?: CanConfig) => boolean
export type CanList = (entity: StringOrStringList) => boolean

// ByPermission
export type CanByPermission = (entityConfig: CanByPermissionEntityConfig, config?: CanByPermissionConfig) => boolean

export type CanByPermissionConfig = {
  company: StringOrStringList
  action: ActionType
}

export type CanByPermissionEditConfig = Pick<CanByPermissionConfig, 'company'>
export type CanByPermissionObjectOfConfig = Record<string, CanByPermissionConfig>
export type CanByPermissionEntityConfig = string | CanByPermissionObjectOfConfig

export type CanByPermissionObjectOfEditConfig = Record<string, CanByPermissionEditConfig>
export type CanByPermissionEntityEditConfig = string | CanByPermissionObjectOfEditConfig

// utils
export type CanByPermissionWrapperFunction = (
  entityConfig: CanByPermissionEntityEditConfig,
  config?: CanByPermissionEditConfig
) => boolean

export type GetNormalizedParamsByPermission = (
  action: ActionType,
  entityConfig: CanByPermissionEntityEditConfig,
  config?: CanByPermissionEditConfig
) => CanByPermissionObjectOfConfig

export type GetNormalizedParams = (action: ActionType, entity: StringOrStringList) => CanObjectOfConfig
export type CanWrapperFunction = (entity: StringOrStringList) => boolean

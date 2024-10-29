import { type UserStore } from '../../types'

export type UseAppCanWrapperParam = {
  store: Required<Pick<UserStore, 'isSuperuser' | 'companyPermissions' | 'currentMainCompany' | 'mainCompanyOptions'>>
}

export type CanConfig = {
  action: string
}

export type CanObjectOfConfig = Record<string, CanConfig>
export type CanEntityConfig = string | CanObjectOfConfig

export type AppCan = (entityConfig: CanEntityConfig, config?: CanConfig) => boolean
export type CanList = (entity: string | string[]) => boolean

// ByPermission
export type CanByPermissionConfig = {
  company: string | string[]
  action: string
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
  action: string,
  entityConfig: CanByPermissionEntityEditConfig,
  config?: CanByPermissionEditConfig
) => CanByPermissionObjectOfConfig

export type GetNormalizedParams = (action: string, entity: string | string[]) => CanObjectOfConfig
export type CanWrapperFunction = (entity: string | string[]) => boolean

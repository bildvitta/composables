import { type UserStore } from '../../types'

export type UseAppCanWrapperParam = {
  store: Required<Pick<UserStore, 'isSuperuser' | 'companyPermissions' | 'currentMainCompany' | 'mainCompanyOptions'>>
}

export type ConfigByPermissionParam = {
  company: string | string[]
  suffix?: string
}

export type ConfigParam = {
  suffix?: string
}

export type ItemParam = (entity: string, config: object) => boolean

export type ParamsByPermissionFirstOption = [string, ConfigByPermissionParam?]
export type ParamsByPermissionSecond = [Record<string, ConfigByPermissionParam>?]
export type AppCanByPermissionParams = ParamsByPermissionFirstOption | ParamsByPermissionSecond

export type ParamsFirstOption = [string, ConfigParam]
export type ParamsSecond = [Record<string, ConfigParam>]
export type AppCanParams = ParamsFirstOption | ParamsSecond

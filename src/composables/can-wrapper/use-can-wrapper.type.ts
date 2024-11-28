import { type UserStore } from '../../types'

export type Can = (permission: string, entity: string) => boolean
export type CanAny = (permissions: string[], entity: string) => boolean

export type UseCanWrapperParam = {
  store: Required<Pick<UserStore, 'userPermissions' | 'isSuperuser'>>
}

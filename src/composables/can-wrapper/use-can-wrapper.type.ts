export type UserStore = {
  /**
   * @example
   *
   * ```ts
   * {
   *  'companies.list': '*',
   *  'companies.show': '*',
   *  'users.create': '*',
   *  'users.delete': '*'
   * }
   * ```
   */
  userPermissions: Record<string, string>
  isSuperuser?: boolean
}

export type Can = (permission: string, entity: string) => boolean
export type CanAny = (permissions: string[], entity: string) => boolean

export type UseCanWrapperParam = {
  store: UserStore
}

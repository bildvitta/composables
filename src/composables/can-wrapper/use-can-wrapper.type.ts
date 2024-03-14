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

export type UseCanWrapperParam = {
  store: UserStore
}

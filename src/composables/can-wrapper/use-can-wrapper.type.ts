export type UserStore = {
  userPermissions: Record<string, string>
  isSuperuser?: boolean
}

export type UseCanWrapperParam = {
  store: UserStore
}

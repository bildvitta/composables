export type SelectOption = {
  label: string
  value: string
}

export type UserStore = {
  /**
   * @example
   *
   * ```js
   * {
   *  'companies.list': '*',
   *  'companies.show': '*',
   *  'users.create': '*',
   *  'users.delete': '*'
   * }
   * ```
   */
  userPermissions?: Record<string, string>

  /**
   * @desc Permissões por empresa.
   *
   * @example
   *
   * ```js
   * {
   *  'company-uuid01': ['companies.list', 'companies.show'],
   *  'company-uuid02': ['companies.list', 'companies.show', 'companies.delete'],
   *  'company-uuid03': ['companies.list', 'companies.show', 'companies.delete']
   * }
   * ```
   */
  companyPermissions?: Record<string, string[]>

  /**
   * @desc Empresa mãe do usuário selecionada.
   */
  currentMainCompany?: string

  /**
   * @desc Opções de empresas mãe para o usuário selecionar.
   */
  mainCompanyOptions?: SelectOption[]

  isSuperuser?: boolean
}

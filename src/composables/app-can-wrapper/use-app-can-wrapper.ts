import {
  type UseAppCanWrapperParam,
  type CanByPermissionEntityConfig,
  type CanByPermissionConfig,
  type CanByPermissionWrapperFunction,
  type AppCan,
  type CanWrapperFunction
} from './use-app-can-wrapper.type'

import {
  getNormalizedParams,
  getNormalizedParamsByPermission,
  getNormalizedParamsPayload
} from './use-app-can-wrapper.util'

export function useAppCanWrapper ({ store }: UseAppCanWrapperParam) {
  /**
   * recupera todas permissões da empresa mãe atual e a empresa mãe atual
   *
   * @example currentMainCompany: 'company-uuid01'
   * @example companyPermissions:
   * {
   *  'company-uuid01': ['companies.list', 'companies.show'],
   *  'company-uuid02': ['companies.list', 'companies.show', 'companies.delete'],
   *  'company-uuid03': ['companies.list', 'companies.show', 'companies.delete']
   * }
   */
  const { companyPermissions, currentMainCompany } = store

  const can: AppCan = (entityConfig, config?) => {
    const normalizedParamsPayload = getNormalizedParamsPayload(entityConfig, config)
    console.log('TCL: can:AppCan -> normalizedParamsPayload?', normalizedParamsPayload)

    /**
     * @example normalizedParamsPayload:
     * {
     *  users: { action: 'list' },
     *  settings: { action: 'dashboard' }
     * }
     */
    for (const entity in normalizedParamsPayload) {
      console.log('TCL: can:AppCan -> entity', entity)
      const { action } = normalizedParamsPayload[entity]
      console.log('TCL: can:AppCan -> action', action)

      for (const companyKey in companyPermissions) {
        console.log('TCL: can:AppCan -> companyKey', companyKey)
        /**
         * @example permissionItem: ['companies.list', 'companies.show']
         */
        const permissionItem = companyPermissions[companyKey]
        console.log('TCL: can:AppCan -> permissionItem', permissionItem)

        if (permissionItem.includes(`${entity}.${action}`)) return true
      }
    }

    return false
  }

  // wrappers do can
  const canList: CanWrapperFunction = entity => {
    const normalizedParams = getNormalizedParams('list', entity)
    console.log('TCL: canList -> normalizedParams', normalizedParams)

    return can(normalizedParams)
  }

  const canCreate: CanWrapperFunction = entity => {
    const normalizedParams = getNormalizedParams('create', entity)

    return can(normalizedParams)
  }

  function canByPermission (entityConfig: CanByPermissionEntityConfig, config?: CanByPermissionConfig) {
    // parâmetros normalizados sempre serão um objeto
    const normalizedParamsPayload = getNormalizedParamsPayload(entityConfig, config)

    // recupera as permissões da empresa mãe atual
    const mainCompanyPermissions = companyPermissions[currentMainCompany] || []
    console.log('TCL: canByPermission -> mainCompanyPermissions', mainCompanyPermissions)

    /**
     * @example normalizedParamsPayload:
     * {
     *  users: { company: 'company1' },
     *  settings: { company: ['company1', 'company2'], action: 'dashboard' }
     * }
     */
    for (const entity in normalizedParamsPayload) {
      const { company, action } = normalizedParamsPayload[entity]

      // se a empresa for uma string, normaliza para um array
      const normalizedCompany = Array.isArray(company) ? company : [company]

      /**
       * @example normalizedCompany: ['company1', 'company2']
       */
      for (const companyItem of normalizedCompany) {
        const companyPermission = companyPermissions[companyItem] || []

        // mergeia as permissões da empresa mãe atual com as permissões da empresa atual
        const permissionItem = [
          ...mainCompanyPermissions,
          ...companyPermission
        ]

        console.log('TCL: canByPermission -> permissionItem', { permissionItem, if: `${entity}.${action}` })
        if (permissionItem.includes(`${entity}.${action}`)) return true
      }
    }

    return false
  }

  // wrappers do canByPermission
  const canEdit: CanByPermissionWrapperFunction = (entityConfig, config?) => {
    const normalizedParamsPayload = getNormalizedParamsByPermission('edit', entityConfig, config)

    return canByPermission(normalizedParamsPayload)
  }

  const canDelete: CanByPermissionWrapperFunction = (entityConfig, config?) => {
    const normalizedParamsPayload = getNormalizedParamsByPermission('delete', entityConfig, config)

    return canByPermission(normalizedParamsPayload)
  }

  const canShow: CanByPermissionWrapperFunction = (entityConfig, config?) => {
    const normalizedParamsPayload = getNormalizedParamsByPermission('show', entityConfig, config)

    return canByPermission(normalizedParamsPayload)
  }

  return {
    can,
    canList,
    canCreate,

    canByPermission,
    canEdit,
    canDelete,
    canShow
  }
}

// const { can, canByPermission, canList } = useAppCanWrapper()

// can('users', { action: 'list' })
// can({ users: { action: 'list' } })

// canByPermission('users', { company: 'company1', action: 'list' })
// canByPermission({ users: { company: 'company1', action: 'list' } })

// canList('users')
// canList(['users'])

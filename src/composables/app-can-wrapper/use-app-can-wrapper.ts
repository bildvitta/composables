import {
  type AppCan,
  type CanByPermission,
  type CanByPermissionWrapperFunction,
  type CanWrapperFunction,
  type UseAppCanWrapperParam
} from './use-app-can-wrapper.type'

import {
  getNormalizedParams,
  getNormalizedParamsByPermission,
  getNormalizedParamsPayload
} from './use-app-can-wrapper.util'

/**
 * @desc Novo sistema de permissionamento baseado em empresas.
 *
 * @example
 * ```js
 * const{
 *  can,
 *  canList,
 *  canCreate,
 *  canByPermission,
 *  canEdit,
 *  canDelete,
 *  canShow
 * } = useAppCanWrapper({ store })
 *
 * can('users', { action: 'dashboard' })
 * can({ users: { action: 'dashboard' } })
 *
 * canList('users')
 * canList(['users', 'approvals'])
 *
 * canCreate('users')
 * canCreate(['users', 'approvals'])
 *
 * canByPermission('users', { company: 'company1', action: 'dashboard' })
 * canByPermission({ users: { company: ['company1', 'company2'], action: 'dashboard' } })
 *
 * canEdit('users', { company: ['company1', 'company2'] })
 * canEdit({ users: { company: 'company1' } })
 *
 * canDelete('users', { company: 'company1' })
 * canDelete({ users: { company: ['company1', 'company2'] } })
 *
 * canShow('users', { company: 'company1' })
 * canShow({ users: { company: ['company1', 'company2'] } })
 * ```
 */
export function useAppCanWrapper ({ store }: UseAppCanWrapperParam) {
  const { companyPermissions, currentMainCompany, isSuperuser } = store

  /**
   * @desc função para verificar se o usuário tem permissão sem levar em consideração a empresa
   * especifica, por exemplo, se o usuário tem permissão para listar usuários em alguma empresa
   * então ele pode listar usuários em qualquer empresa.
   */
  const can: AppCan = (entityConfig, config?) => {
    if (isSuperuser) return true

    const normalizedParamsPayload = getNormalizedParamsPayload(entityConfig, config)

    /**
     * @example normalizedParamsPayload:
     * {
     *  users: { action: 'list' },
     *  settings: { action: 'dashboard' }
     * }
     */
    for (const entity in normalizedParamsPayload) {
      const { action } = normalizedParamsPayload[entity]

      for (const companyKey in companyPermissions) {
        /**
         * @example permissionItem: ['companies.list', 'companies.show']
         */
        const permissionItem = companyPermissions[companyKey]

        if (permissionItem.includes(`${entity}.${action}`)) return true
      }
    }

    return false
  }

  // wrappers do can
  const canList: CanWrapperFunction = entity => {
    const normalizedParams = getNormalizedParams('list', entity)

    return can(normalizedParams)
  }

  const canCreate: CanWrapperFunction = entity => {
    const normalizedParams = getNormalizedParams('create', entity)

    return can(normalizedParams)
  }

  /**
   * @type {CanByPermission}
   * @desc função para verificar se o usuário tem permissão levando em consideração a empresa.
   * Se o usuário tem permissão para listar usuários em uma empresa mãe, então ele pode listar
   * usuários em qualquer empresa filha, empresas filhas podem ter permissões diferentes e especificas,
   * por exemplo, a empresa mãe pode ter permissão para listar usuários, mas a empresa filha pode ter
   * permissão para deletar usuários, só naquela empresa especifica ele poderá deletar usuários.
   */
  const canByPermission: CanByPermission = (entityConfig, config) => {
    if (isSuperuser) return true

    // parâmetros normalizados sempre serão um objeto
    const normalizedParamsPayload = getNormalizedParamsPayload(entityConfig, config)

    // recupera as permissões da empresa mãe atual
    const mainCompanyPermissions = companyPermissions[currentMainCompany] || []

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
        const companyPermission = companyPermissions[companyItem]

        if (!companyPermission) continue

        /**
         * mergeia as permissões da empresa mãe atual com as permissões da empresa atual
         *
         * @example permissionItem: ['companies.list', 'companies.show']
         */
        const permissionItem = [
          ...mainCompanyPermissions,
          ...(companyPermission || [])
        ]

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

    // by permission
    canByPermission,
    canEdit,
    canDelete,
    canShow
  }
}

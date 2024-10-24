import {
  type UseAppCanWrapperParam,
  type AppCanByPermissionParams,
  type ConfigByPermissionParam,
  type AppCanParams,
  type ConfigParam
} from './use-app-can-wrapper.type'

/**
 * - canEdit
 * - canList
 * - canShow
 * - canCreate
 * - canDelete
 * - canByPermission
 */
export default function useAppCanWrapper ({ store }: UseAppCanWrapperParam) {
  function can (...params: AppCanParams) {
    const normalizedParamPayload = _getNormalizedParamPayload(...params)
  }

  function canByPermission (...params: AppCanByPermissionParams) {
    // parâmetros normalizados sempre serão um objeto
    const normalizedParamPayload = _getNormalizedParamPayload(...params)

    // recupera todas permissões da empresa mãe atual e a empresa mãe atual
    const { companyPermissions, currentMainCompany } = store

    // recupera as permissões da empresa mãe atual
    const mainCompanyPermissions = companyPermissions[currentMainCompany]

    /**
     * @example normalizedParamPayload
     *
     * {
     *  users: { company: 'company1' },
     *  settings: { company: ['company1', 'company2'], suffix: 'dashboard }
     * }
     */
    for (const entity in normalizedParamPayload) {
      const { company, suffix } = normalizedParamPayload[entity]

      // se a empresa for uma string, normaliza para um array
      const normalizedCompany = Array.isArray(company) ? company : [company]

      /**
       * @example normalizedCompany
       *
       * ['company1', 'company2']
       */
      for (const companyItem of normalizedCompany) {
        // mergeia as permissões da empresa mãe atual com as permissões da empresa atual
        const permissionItem = [
          ...mainCompanyPermissions,
          ...companyPermissions[companyItem]
        ]

        if (permissionItem.includes(`${entity}.${suffix}`)) return true
      }
    }

    return true
  }

  function canEdit (...params: AppCanByPermissionParams) {
    return _withSuffix('edit', canByPermission)(...params)
  }

  function canDelete (...params: AppCanByPermissionParams) {
    return _withSuffix('delete', canByPermission)(...params)
  }

  function canShow (...params: AppCanByPermissionParams) {
    return _withSuffix('show', canByPermission)(...params)
  }

  // private functions
  function _getNormalizedParamPayload<T> (...params: T extends AppCanByPermissionParams ? AppCanByPermissionParams : AppCanParams) {
  // function _getNormalizedParamPayload<T> (...params: T extends AppCanByPermissionParams ? AppCanByPermissionParams : AppCanParams) {
    const [entityOrObjectConfig, config] = params

    const normalizedParamPayload: Record<string, T extends AppCanByPermissionParams ? ConfigByPermissionParam : ConfigParam> = {}

    /**
     * Se o primeiro parâmetro for uma string, sempre normaliza para um objeto
     */
    if (typeof entityOrObjectConfig === 'string' && config) {
      normalizedParamPayload[entityOrObjectConfig] = config
    }

    return normalizedParamPayload
  }

  // Função de ordem superior para injetar o suffix
  function _withSuffix (suffix: string, fn: (...params: AppCanByPermissionParams) => boolean) {
    return (...params: AppCanByPermissionParams) => {
      const normalizedParamPayload = _getNormalizedParamPayload<AppCanByPermissionParams>(...params)

      for (const entity in normalizedParamPayload) {
        normalizedParamPayload[entity].suffix = suffix
      }

      return fn(normalizedParamPayload)
    }
  }

  return {
    can,
    canByPermission,
    canEdit,
    canDelete,
    canShow
  }
}

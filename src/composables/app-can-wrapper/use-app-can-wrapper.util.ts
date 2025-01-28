import {
  type CanByPermissionObjectOfConfig,
  type GetNormalizedParamsByPermission,
  type CanObjectOfConfig,
  type GetNormalizedParams,
  type HasPermission
} from './use-app-can-wrapper.type'

export const getNormalizedParams: GetNormalizedParams = (action, entity) => {
  const normalizedParam = Array.isArray(entity) ? entity : [entity]
  const normalizedParamsPayload: CanObjectOfConfig = {}

  normalizedParam.forEach(entityKey => {
    normalizedParamsPayload[entityKey] = { action }
  })

  return normalizedParamsPayload
}

export const getNormalizedParamsPayload = <T, U>(entityConfig: T, config?: U) => {
  const normalizedParamsPayload: Record<string, U> = {}
  const isStringEntityConfig = typeof entityConfig === 'string'

  /**
   * Se o primeiro parâmetro for uma string, sempre normaliza para um objeto
   */
  if (isStringEntityConfig && config) {
    normalizedParamsPayload[entityConfig] = config as U
  }

  return (isStringEntityConfig ? normalizedParamsPayload : entityConfig) as Record<string, U>
}

export const getNormalizedParamsByPermission: GetNormalizedParamsByPermission = (action, entityConfig, config?) => {
  const normalizedParamsPayload = getNormalizedParamsPayload(entityConfig, config) as CanByPermissionObjectOfConfig

  for (const entity in normalizedParamsPayload) {
    normalizedParamsPayload[entity].action = action
  }

  return normalizedParamsPayload
}

/**
 * Verifica se há permissão para uma determinada ação em uma entidade específica.
 *
 * @param action - Ações a serem verificadas.
 * @param entity - Entidade na qual a ação será verificada.
 * @param permissions - Lista de permissões disponíveis.
 * @returns `true` se houver permissão para a ação na entidade, caso contrário `false`.
 *
 * @example
 * ```typescript
 * const permissions = ['user.create', 'user.delete', 'post.read'];
 * const canCreateUser = hasPermission(['create'], 'user', permissions); // true
 * const canUpdateUser = hasPermission(['update'], 'user', permissions); // false
 * const canReadPost = hasPermission(['read'], 'post', permissions); // true
 * ```
 */
export const hasPermission: HasPermission = (action, entity, permissions: string[]) => {
  return action.some(actionItem => permissions.includes(`${entity}.${actionItem}`))
}

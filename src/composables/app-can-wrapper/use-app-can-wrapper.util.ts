import type {
  GetNormalizedParamsByPermission,
  CanObjectOfConfig,
  GetNormalizedParams,
  HasPermission
} from './use-app-can-wrapper.type'

export const getNormalizedParams: GetNormalizedParams = (action, entity) => {
  const normalizedParam = Array.isArray(entity) ? entity : [entity]
  const normalizedParamsPayload: CanObjectOfConfig = {}

  normalizedParam.forEach(entityKey => {
    normalizedParamsPayload[entityKey] = { action }
  })

  return normalizedParamsPayload
}

export const getNormalizedParamsPayload = <U>(entityConfig: string | Record<string, U>, config?: U): Record<string, U> => {
  if (typeof entityConfig === 'string') {

    if (config === undefined) return {}

    return { [entityConfig]: config }
  }

  return entityConfig
}

export const getNormalizedParamsByPermission: GetNormalizedParamsByPermission = (action, entityConfig, config?) => {
  const basePayload = getNormalizedParamsPayload(entityConfig, config)

  const result: ReturnType<GetNormalizedParamsByPermission> = {}

  for (const entity in basePayload) {
    if (!Object.hasOwn(basePayload, entity)) continue

    result[entity] = { ...basePayload[entity], action }
  }

  return result
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
export const hasPermission: HasPermission = (action, entity, permissions: string[]) => action.some(actionItem => permissions.includes(`${entity}.${actionItem}`))

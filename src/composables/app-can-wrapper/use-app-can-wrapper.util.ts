import {
  type CanByPermissionObjectOfConfig,
  type GetNormalizedParamsByPermission,
  type CanObjectOfConfig,
  type GetNormalizedParams
} from './use-app-can-wrapper.type'

export const getNormalizedParams: GetNormalizedParams = (action, entity) => {
  console.log('TCL: getNormalizedParams:GetNormalizedParams -> action, entity', action, entity)
  const normalizedParam = Array.isArray(entity) ? entity : [entity]
  const normalizedParamsPayload: CanObjectOfConfig = {}

  normalizedParam.forEach(entityKey => {
    normalizedParamsPayload[entityKey] = { action }
  })

  return normalizedParamsPayload
}

export const getNormalizedParamsPayload = <T, U>(entityConfig: T, config?: U) => {
  console.log('TCL: getNormalizedParamsPayload -> entityConfig: T, config?: U', entityConfig, config)
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

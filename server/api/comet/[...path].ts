// Proxy Nitro del Tutorial 6: credenciales privadas, nunca expuestas en Vue.
export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Método no permitido' })
  }

  const path = String(getRouterParam(event, 'path') || '').replace(/^\/+/, '')
  // Solamente los tres tipos de contenido usados por esta tarea.
  if (!/^content\/(?:matches|editions|stadiums)(?:\/[A-Za-z0-9_-]+)?$/.test(path)) {
    throw createError({ statusCode: 404, statusMessage: 'Recurso no encontrado' })
  }

  const { cometUrl, cometWorkspace, cometApiToken } = useRuntimeConfig(event)
  const workspace = String(cometWorkspace || '').trim()
  const token = String(cometApiToken || '').trim()
  const root = String(cometUrl || '').trim().replace(/\/+$/, '')

  if (!/^https?:\/\//.test(root) || !/^[a-z0-9_-]+$/.test(workspace)) {
    throw createError({ statusCode: 503, statusMessage: 'La URL o el workspace de CometCMS no están configurados' })
  }
  if (!token || /^(REEMPLAZAR|TU_TOKEN|PEGA_AQUI)/i.test(token)) {
    throw createError({ statusCode: 503, statusMessage: 'Falta configurar NUXT_COMET_API_TOKEN' })
  }

  const endpoint = `${root}/api/v1/workspaces/${encodeURIComponent(workspace)}/${path}`
  setHeader(event, 'Cache-Control', 'no-store')

  let response
  try {
    response = await $fetch.raw<string>(endpoint, {
      method: 'GET',
      query: getQuery(event),
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      responseType: 'text',
      ignoreResponseError: true,
      retry: 0,
      timeout: 12000
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'No se pudo conectar con CometCMS' })
  }

  if (response.status === 401 || response.status === 403) {
    throw createError({ statusCode: response.status, statusMessage: 'El token no tiene acceso al contenido solicitado' })
  }
  if (response.status === 404) {
    throw createError({ statusCode: 404, statusMessage: 'No existe la colección o el workspace solicitado' })
  }

  let content: unknown = response._data
  // El proveedor puede responder HTTP 200 con HTML en vez de JSON.
  if (typeof content === 'string' && /^\s*</.test(content)) {
    throw createError({ statusCode: 502, statusMessage: 'El alojamiento de CometCMS devolvió HTML en lugar de JSON' })
  }
  try {
    for (let i = 0; i < 2 && typeof content === 'string'; i++) content = JSON.parse(content)
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'CometCMS no devolvió JSON válido' })
  }
  if (!response.ok || !content || typeof content !== 'object') {
    throw createError({ statusCode: 502, statusMessage: 'Respuesta inválida de CometCMS' })
  }
  return content
})

// Proxy Nitro seguro: la cabecera Bearer nunca se envía desde el navegador.
export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Solo lectura' })
  }
  const path = String(getRouterParam(event, 'path') || '').replace(/^\/+/, '')
  if (!/^content\/(editions|stadiums|matches)(?:\/[\w-]+)?$/.test(path)) {
    throw createError({ statusCode: 404, statusMessage: 'Ruta no permitida' })
  }
  const { cometUrl, cometWorkspace, cometApiToken } = useRuntimeConfig()
  if (!cometUrl || !cometWorkspace || !cometApiToken || String(cometUrl).includes('.example') || String(cometApiToken).startsWith('REEMPLAZAR')) {
    throw createError({ statusCode: 503, statusMessage: 'Configurar CometCMS antes de publicar' })
  }
  const url = `${String(cometUrl).replace(/\/$/, '')}/api/v1/workspaces/${encodeURIComponent(String(cometWorkspace))}/${path}`
  try {
    return await $fetch(url, {
      query: getQuery(event),
      headers: { Authorization: `Bearer ${cometApiToken}` }
    })
  } catch (error: any) {
    const status = Number(error?.response?.status) || 502
    throw createError({ statusCode: status, statusMessage: status === 401 || status === 403 ? 'Token sin permiso de lectura' : 'Error consultando CometCMS' })
  }
})

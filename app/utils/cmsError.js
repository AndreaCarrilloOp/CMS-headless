// Mensajes de error únicamente para Ediciones y Partidos.
export function cmsErrorMessage(error) {
  const status = Number(error?.statusCode ?? error?.data?.statusCode ?? 0)
  const detail = String(error?.statusMessage ?? error?.data?.statusMessage ?? '')

  if (status === 503) return 'Revisá la configuración privada de CometCMS.'
  if ([401, 403].includes(status)) return 'Revisá los permisos del token de CometCMS.'
  if (status === 404) return 'No se encontró el contenido solicitado.'
  if (/HTML en lugar de JSON/i.test(detail)) return 'CometCMS no está devolviendo datos JSON.'
  return 'No fue posible consultar los datos de CometCMS.'
}

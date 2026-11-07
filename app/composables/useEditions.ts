import { normalizeCmsEditions } from '~/utils/cometWorldCup'

// Leer los mundiales directamente desde la colección de CometCMS.
// Evita que /ediciones dependa de la relación dentro de un partido.
export async function useEditions() {
  const response = await useFetch('/api/comet/content/editions', {
    key: 'fifa-cometcms-editions'
  })
  const data = computed(() => normalizeCmsEditions(response.data.value))
  return { ...response, data }
}

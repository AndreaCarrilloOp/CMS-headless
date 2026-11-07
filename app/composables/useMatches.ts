import { normalizeCmsList, responseItems } from '~/utils/cometWorldCup'

export const PAGE_SIZE = 12

export const normalizeSearch = (value: unknown) =>
  String(value ?? '').trim().toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

// Reutilizable en todas las vistas: mismo patrón del Tutorial 6 (useFetch + Nitro).
export async function useMatches() {
  const response = await useFetch('/api/comet/content/matches', {
    key: 'fifa-cometcms-matches',
    query: { include: 'edition,stadium' }
  })
  const data = computed(() => normalizeCmsList(response.data.value)
    .sort((a, b) => (b.edition_year - a.edition_year) || String(a.date).localeCompare(String(b.date))))
  // Si la respuesta contiene filas, pero no se normalizan, el frontend debe
  // mostrar un problema de formato y NO afirmar que el CMS está vacío.
  const rawCount = computed(() => responseItems(response.data.value).length)
  return { ...response, data, rawCount }
}

export function filterMatches(matches: any[], search: string, year: string, stage: string) {
  const query = normalizeSearch(search)
  return matches.filter((match) => {
    if (year && String(match.edition_year) !== year) return false
    if (stage && match.stage !== stage) return false
    if (!query) return true
    return normalizeSearch([
      match.home_team, match.away_team, match.stadium,
      match.stage, match.group, match.edition_year, match.match_id
    ].join(' ')).includes(query)
  })
}

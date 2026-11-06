import { normalizeCmsList } from '~/utils/cometWorldCup'
export const PAGE_SIZE = 12
export const normalizeSearch = (v: unknown) =>
  String(v ?? '').trim().toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export async function useMatches() {
  const result = await useFetch('/api/comet/content/matches', {
    key: 'fifa-cometcms-matches',
    query: { include: 'edition,stadium' }
  })
  // CometCMS permite omitir limit para consultar todos los registros.
  const data = computed(() => normalizeCmsList(result.data.value).sort((a,b) => b.edition_year - a.edition_year))
  return { ...result, data }
}
export function filterMatches(matches: any[], text: string, year: string, stage: string) {
  const q = normalizeSearch(text)
  return matches.filter(m => {
    if (year && String(m.edition_year) !== year) return false
    if (stage && m.stage !== stage) return false
    if (!q) return true
    return normalizeSearch([
      m.home_team, m.away_team, m.home_code, m.away_code, m.stadium, m.city,
      m.host_country, m.stage, m.edition_year, m.group, m.match_id
    ].join(' ')).includes(q)
  })
}

// Convierte registros con relaciones de CometCMS al formato usado en el Proyecto 1.
type Entry = Record<string, any>
const attrs = (value: unknown): Entry => {
  if (!value || typeof value !== 'object') return {}
  const obj = value as Entry
  return obj.data && typeof obj.data === 'object' && !Array.isArray(obj.data) ? obj.data : obj
}
const relation = (value: unknown): Entry => {
  if (Array.isArray(value)) return relation(value[0])
  return value && typeof value === 'object' ? { ...(value as Entry), ...attrs(value) } : {}
}
const asText = (v: unknown) => String(v ?? '')
const asNumber = (v: unknown) => Number(v ?? 0) || 0
const asBoolInt = (v: unknown) => [true, 'true', 1, '1'].includes(v as never) ? 1 : 0
export function normalizeCmsMatch(entry: Entry) {
  const v = attrs(entry)
  const ed = relation(v.edition)
  const st = relation(v.stadium)
  const edition_year = asNumber(ed.year ?? ed.edition_year ?? v.edition_year ?? v.year)
  const stadium = asText(st.name ?? st.stadium ?? st.title ?? v.stadium)
  const host_country = asText(ed.host_country ?? st.country ?? v.host_country)
  const home_team = asText(v.home_team ?? v.home)
  const away_team = asText(v.away_team ?? v.away)
  const home_score = asNumber(v.home_score ?? v.home_goals)
  const away_score = asNumber(v.away_score ?? v.away_goals)
  const match_id = asText(v.match_id ?? v.source_match_id ?? entry.slug ?? entry.id)
  const group = asText(v.group ?? v.group_name)
  return {
    match_id, edition_year,
    tournament_name: asText(ed.tournament_name ?? ed.title ?? v.tournament_name),
    stage: asText(v.stage), group, date: asText(v.date), time: asText(v.time),
    stadium, city: asText(st.city ?? v.city), host_country,
    home_team, home_code: asText(v.home_code), away_team, away_code: asText(v.away_code),
    home_score, away_score,
    extra_time: asBoolInt(v.extra_time), penalty_shootout: asBoolInt(v.penalty_shootout),
    home_penalties: asNumber(v.home_penalties), away_penalties: asNumber(v.away_penalties),
    year: edition_year, home: home_team, away: away_team,
    home_goals: home_score, away_goals: away_score,
    group_name: group, country: host_country, source_match_id: match_id
  }
}
export function normalizeCmsList(response: unknown) {
  const res = response as Entry | null
  const rows = Array.isArray(res?.data) ? res.data : []
  return rows.map(normalizeCmsMatch).filter(m => m.match_id && Number.isInteger(m.edition_year) && m.edition_year >= 1930)
}

// Convierte las colecciones de CometCMS a los datos usados por las páginas.
const fields = entry => entry?.data || {}
const isPublished = entry => !entry.status || entry.status === 'published'
const year = value => Number(String(value ?? '').match(/(?:19|20)\d{2}/)?.[0] || 0)
const score = value => value == null || value === '' ? null : Number(value)

export const responseItems = response => Array.isArray(response?.data) ? response.data : []

export function normalizeCmsEditions(response) {
  return responseItems(response)
    .filter(isPublished)
    .map(entry => ({ year: year(fields(entry).year || entry.title) }))
    .filter(edition => edition.year > 0)
    .sort((a, b) => b.year - a.year)
}

export function normalizeCmsList(response) {
  return responseItems(response)
    .filter(isPublished)
    .map(entry => {
      const data = fields(entry)
      const edition = data.edition
      const stadium = data.stadium
      return {
        match_id: Number(data.match_id),
        stage: String(data.stage ?? ''),
        group: String(data.group ?? ''),
        date: String(data.date ?? '').slice(0, 10),
        home_team: String(data.home_team ?? ''),
        away_team: String(data.away_team ?? ''),
        home_score: score(data.home_score),
        away_score: score(data.away_score),
        edition_year: year(edition?.data?.year || edition?.title),
        stadium: String(stadium?.title ?? '')
      }
    })
    .filter(match => Number.isInteger(match.match_id) && match.match_id > 0 && match.home_team && match.away_team)
}

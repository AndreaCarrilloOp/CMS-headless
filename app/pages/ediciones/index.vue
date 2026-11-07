<script setup>
import { cmsErrorMessage } from '~/utils/cmsError.js'
useHead({ title: 'Ediciones' })
const { data: cmsEditions, error: editionsError, refresh: refreshEditions } = await useEditions()
const { data: matches, error: matchesError, refresh: refreshMatches } = await useMatches()
const editions = computed(() => {
  const countByYear = new Map()
  for (const edition of cmsEditions.value || []) countByYear.set(edition.year, 0)
  for (const match of matches.value || []) {
    const year = Number(match.edition_year)
    if (year >= 1930) countByYear.set(year, (countByYear.get(year) || 0) + 1)
  }
  return [...countByYear.entries()].sort((a, b) => b[0] - a[0])
})
const hasError = computed(() => !editions.value.length && (editionsError.value || matchesError.value))
function retry() { refreshEditions(); refreshMatches() }
</script>
<template>
  <div class="section-block">
    <Breadcrumbs :items="[{ label: 'Ediciones' }]" />
    <p class="eyebrow">Explorar por edición</p>
    <h1>Mundiales</h1>
    <p class="muted">Elegí un año para consultar los encuentros de esa edición.</p>
    <CmsNotice v-if="hasError" type="error" :message="cmsErrorMessage(editionsError || matchesError)" @retry="retry" />
    <CmsNotice v-else-if="!editions.length" message="No hay ediciones disponibles en CometCMS." />
    <div v-if="editions.length" class="edition-grid">
      <NuxtLink v-for="[year, total] in editions" :key="year" :to="`/ediciones/${year}`" class="edition-tile">
        <span>FIFA World Cup</span>
        <strong>{{ year }}</strong>
        <span>{{ total }} {{ total === 1 ? 'partido' : 'partidos' }} <span aria-hidden="true">↗</span></span>
      </NuxtLink>
    </div>
  </div>
</template>

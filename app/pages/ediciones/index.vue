<script setup>
useHead({ title: 'Ediciones' })
const { data: matches } = await useMatches()
const editions = computed(() => {
  const countByYear = new Map()
  for (const match of matches.value || []) {
    const year = Number(match.edition_year)
    countByYear.set(year, (countByYear.get(year) || 0) + 1)
  }
  return [...countByYear.entries()].sort((a, b) => b[0] - a[0])
})
</script>
<template>
  <div class="section-block">
    <Breadcrumbs :items="[{ label: 'Ediciones' }]" />
    <p class="eyebrow">Explorar por edición</p>
    <h1>Mundiales</h1><p class="muted">Elegí un año para consultar los encuentros de esa edición.</p>
    <div class="edition-grid"><NuxtLink v-for="[year, total] in editions" :key="year" :to="`/ediciones/${year}`" class="edition-tile"><span>FIFA World Cup</span><strong>{{ year }}</strong><span>{{ total }} partidos <span aria-hidden="true">↗</span></span></NuxtLink></div>
  </div>
</template>

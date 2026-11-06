<script setup>
useHead({ title: 'Ediciones' })

const { data: matches } = await useMatches()

const editions = computed(() => {
  const years = []
  const list = []

  for (const match of matches.value || []) {
    if (!years.includes(match.edition_year)) {
      years.push(match.edition_year)
      list.push({
        year: match.edition_year,
        name: match.tournament_name,
        matches: 0
      })
    }

    for (const edition of list) {
      if (edition.year === match.edition_year) {
        edition.matches++
        break
      }
    }
  }

  return list.reverse()
})
</script>

<template>
  <div class="container page">
    <AppBreadcrumbs :items="[{ label: 'Inicio', to: '/' }, { label: 'Ediciones' }]" />

    <header class="page-header">
      <p class="eyebrow">NAVEGACIÓN POR EDICIÓN</p>
      <h1>Ediciones de la Copa Mundial</h1>
      <p>Selecciona un torneo para explorar sus rondas y partidos.</p>
    </header>

    <div class="edition-grid">
      <EditionCard
        v-for="edition in editions"
        :key="edition.year"
        :edition="edition"
      />
    </div>
  </div>
</template>

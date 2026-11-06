<script setup>
const route = useRoute()
const year = Number(route.params.year)

const search = ref('')
const selectedStage = ref('')
const page = ref(1)
const pageSize = 12

const { data: allMatches } = await useMatches()
const matches = computed(() => (allMatches.value || []).filter(m => Number(m.edition_year) === year).sort((a,b) => String(a.date).localeCompare(String(b.date))))

if (!matches.value || matches.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Edición no encontrada' })
}

const stages = computed(() => {
  const list = []

  for (const match of matches.value || []) {
    if (!list.includes(match.stage)) list.push(match.stage)
  }

  return list
})

const filteredMatches = computed(() => {
  const text = search.value.toLowerCase().trim()

  return (matches.value || []).filter(match => {
    const matchesSearch = text === '' ||
      match.home_team.toLowerCase().includes(text) ||
      match.away_team.toLowerCase().includes(text) ||
      match.home_code.toLowerCase().includes(text) ||
      match.away_code.toLowerCase().includes(text)

    const matchesStage = selectedStage.value === '' ||
      match.stage === selectedStage.value

    return matchesSearch && matchesStage
  })
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredMatches.value.length / pageSize))
})

const paginatedMatches = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredMatches.value.slice(start, start + pageSize)
})

const hasActiveFilters = computed(() => {
  return search.value.trim() !== '' || selectedStage.value !== ''
})

function clearFilters() {
  search.value = ''
  selectedStage.value = ''
  page.value = 1
}

watch(search, () => { page.value = 1 })
watch(selectedStage, () => { page.value = 1 })

useHead({ title: `Copa Mundial ${route.params.year}` })
</script>

<template>
  <div class="container page">
    <AppBreadcrumbs :items="[
      { label: 'Inicio', to: '/' },
      { label: 'Ediciones', to: '/mundiales' },
      { label: String(route.params.year) }
    ]" />

    <p class="back-link edition-back-link">
      <NuxtLink to="/mundiales">← Volver a ediciones</NuxtLink>
    </p>

    <header class="page-header">
      <p class="eyebrow">EDICIÓN {{ route.params.year }}</p>
      <h1>{{ matches[0].tournament_name }}</h1>
      <p>{{ matches[0].host_country }} · {{ matches.length }} partidos en esta edición.</p>
    </header>

    <section class="filters edition-filters" aria-label="Búsqueda y filtros de la edición">
      <label class="search-field">
        <span>Buscar partido</span>
        <input
          v-model="search"
          type="search"
          placeholder="Ej.: Costa Rica, BRA..."
        />
      </label>

      <label>
        <span>Ronda</span>
        <select v-model="selectedStage">
          <option value="">Todas</option>
          <option
            v-for="stage in stages"
            :key="stage"
            :value="stage"
          >
            {{ stage }}
          </option>
        </select>
      </label>

      <button
        class="clear-filters"
        type="button"
        :disabled="!hasActiveFilters"
        @click="clearFilters"
      >
        Limpiar
      </button>
    </section>

    <div class="results-toolbar">
      <p class="result-count">
        <strong>{{ filteredMatches.length }}</strong> partidos encontrados
      </p>
      <p v-if="filteredMatches.length" class="page-count">
        Página {{ page }} de {{ totalPages }}
      </p>
    </div>

    <template v-if="paginatedMatches.length">
      <div class="desktop-match-table">
        <table class="match-table">
          <thead>
            <tr>
              <th scope="col">Ronda</th>
              <th scope="col">Partido</th>
              <th scope="col">Marcador</th>
              <th scope="col">Fecha</th>
              <th scope="col"><span class="visually-hidden">Acción</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="match in paginatedMatches" :key="match.match_id">
              <td>{{ match.stage }}</td>
              <td class="match-name-cell">
                <strong>{{ match.home_team }} vs {{ match.away_team }}</strong>
                <span v-if="match.penalty_shootout === 1">
                  Penales {{ match.home_penalties }}–{{ match.away_penalties }}
                </span>
              </td>
              <td class="score-cell">{{ match.home_score }}–{{ match.away_score }}</td>
              <td><time :datetime="match.date">{{ match.date }}</time></td>
              <td class="action-cell">
                <NuxtLink :to="`/partidos/${match.match_id}`" class="match-link">Ver detalle →</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mobile-match-list">
        <article
          v-for="match in paginatedMatches"
          :key="match.match_id"
          class="match-list-item"
        >
          <p class="match-context">{{ match.stage }}</p>
          <div class="match-list-main">
            <h2>{{ match.home_team }} vs {{ match.away_team }}</h2>
            <strong class="match-list-score">{{ match.home_score }}–{{ match.away_score }}</strong>
          </div>
          <p class="match-list-meta">
            <time :datetime="match.date">{{ match.date }}</time>
            <span v-if="match.penalty_shootout === 1">
              · Penales {{ match.home_penalties }}–{{ match.away_penalties }}
            </span>
          </p>
          <NuxtLink :to="`/partidos/${match.match_id}`" class="match-link">Ver detalle →</NuxtLink>
        </article>
      </div>
    </template>

    <div v-else class="empty-state">
      <h2>No se encontraron partidos</h2>
      <p>Prueba con otro equipo o cambia la ronda seleccionada.</p>
    </div>

    <nav v-if="filteredMatches.length" class="pagination" aria-label="Paginación de la edición">
      <button
        type="button"
        :disabled="page === 1"
        @click="page--"
      >
        ← Anterior
      </button>

      <span>Página {{ page }} de {{ totalPages }}</span>

      <button
        type="button"
        :disabled="page === totalPages"
        @click="page++"
      >
        Siguiente →
      </button>
    </nav>
  </div>
</template>

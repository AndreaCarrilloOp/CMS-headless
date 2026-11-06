<script setup>
useHead({ title: 'Partidos' })
const { data: matches } = await useMatches()
const search = ref('')
const year = ref('')
const stage = ref('')
const page = ref(1)
const years = computed(() => [...new Set((matches.value || []).map(m => Number(m.edition_year)))].sort((a, b) => b - a))
const stages = computed(() => [...new Set((matches.value || []).map(m => m.stage))].sort())
const filtered = computed(() => filterMatches(matches.value || [], search.value, year.value, stage.value))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))
watch([search, year, stage], () => { page.value = 1 })
</script>
<template>
  <div class="section-block">
    <Breadcrumbs :items="[{ label: 'Partidos' }]" />
    <p class="eyebrow">Archivo histórico</p><h1>Buscar partidos</h1>
    <p class="muted">Encontrá encuentros por selección, estadio, ciudad, país sede, fase o año.</p>
    <div class="filters">
      <label>Buscar<input v-model="search" type="search" placeholder="Ej. Costa Rica, Brasil, final" autocomplete="off" /></label>
      <label>Edición<select v-model="year"><option value="">Todas</option><option v-for="item in years" :key="item" :value="String(item)">{{ item }}</option></select></label>
      <label>Fase<select v-model="stage"><option value="">Todas</option><option v-for="item in stages" :key="item" :value="item">{{ item }}</option></select></label>
    </div>
    <p class="result-count" aria-live="polite">{{ filtered.length }} partidos encontrados</p>
    <MatchList :matches="visible" />
    <p v-if="!visible.length" class="empty-state">No hay resultados. Probá otro término o quitá un filtro.</p>
    <PaginationNav :page="page" :total-pages="totalPages" @change="page = $event" />
  </div>
</template>

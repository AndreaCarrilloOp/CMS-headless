<script setup>
const route = useRoute()
const year = Number(route.params.year)
if (!Number.isInteger(year) || year < 1930) throw createError({ statusCode: 404, statusMessage: 'Edición no disponible' })
const { data: allMatches } = await useMatches()
const matches = computed(() => (allMatches.value || []).filter(m => Number(m.edition_year) === year))
if (!matches.value?.length) throw createError({ statusCode: 404, statusMessage: 'Edición no disponible' })
const search = ref('')
const stage = ref('')
const page = ref(1)
const stages = computed(() => [...new Set((matches.value || []).map(m => m.stage))].sort())
const filtered = computed(() => filterMatches(matches.value || [], search.value, '', stage.value))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))
watch([search, stage], () => { page.value = 1 })
useHead({ title: `Mundial ${year}` })
</script>
<template>
  <div class="section-block">
    <Breadcrumbs :items="[{ label: 'Ediciones', to: '/ediciones' }, { label: String(year) }]" />
    <p class="eyebrow">Edición histórica</p><h1>FIFA World Cup {{ year }}</h1>
    <p class="muted">{{ matches?.length }} partidos registrados.</p>
    <div class="filters"><label>Buscar en esta edición<input v-model="search" type="search" placeholder="Selección o estadio" /></label><label>Fase<select v-model="stage"><option value="">Todas las fases</option><option v-for="item in stages" :key="item" :value="item">{{ item }}</option></select></label></div>
    <p class="result-count" aria-live="polite">{{ filtered.length }} resultados</p>
    <MatchList :matches="visible" />
    <p v-if="!visible.length" class="empty-state">No hay partidos que coincidan con esos filtros.</p>
    <PaginationNav :page="page" :total-pages="totalPages" @change="page = $event" />
  </div>
</template>

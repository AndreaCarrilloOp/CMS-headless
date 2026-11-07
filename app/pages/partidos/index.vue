<script setup>
import { cmsErrorMessage } from '~/utils/cmsError.js'
useHead({ title: 'Partidos' })
const { data: matches, error, refresh, rawCount } = await useMatches()
const search = ref('')
const year = ref('')
const stage = ref('')
const page = ref(1)
const years = computed(() => [...new Set((matches.value || []).map(m => Number(m.edition_year)))].filter(y => y >= 1930).sort((a, b) => b - a))
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
    <p class="muted">Encontrá encuentros por selección, estadio, fase o año.</p>
    <CmsNotice v-if="error" type="error" :message="cmsErrorMessage(error)" @retry="refresh" />
    <CmsNotice v-else-if="!matches?.length" :message="rawCount > 0
      ? `CometCMS devolvió ${rawCount} registros, pero no se pudo interpretar su estructura.`
      : 'No hay partidos publicados disponibles en la consulta.'" />
    <div v-if="!error && matches?.length" class="filters">
      <label>Buscar<input v-model="search" type="search" placeholder="Ej. Costa Rica, Brasil, final" autocomplete="off" /></label>
      <label>Edición<select v-model="year"><option value="">Todas</option><option v-for="item in years" :key="item" :value="String(item)">{{ item }}</option></select></label>
      <label>Fase<select v-model="stage"><option value="">Todas</option><option v-for="item in stages" :key="item" :value="item">{{ item }}</option></select></label>
    </div>
    <p v-if="!error && matches?.length" class="result-count" aria-live="polite">{{ filtered.length }} partidos encontrados</p>
    <MatchList v-if="!error && matches?.length" :matches="visible" />
    <p v-if="!error && matches?.length && !visible.length" class="empty-state">No hay resultados. Probá otro término o quitá un filtro.</p>
    <PaginationNav v-if="!error && matches?.length" :page="page" :total-pages="totalPages" @change="page = $event" />
  </div>
</template>

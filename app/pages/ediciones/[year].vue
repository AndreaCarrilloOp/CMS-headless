<script setup>
import { cmsErrorMessage } from '~/utils/cmsError.js'
const route = useRoute()
const year = Number(route.params.year)
if (!Number.isInteger(year) || year < 1930) throw createError({ statusCode: 404, statusMessage: 'Edición no disponible' })
const { data: allMatches, error, refresh } = await useMatches()
const matches = computed(() => (allMatches.value || []).filter(m => Number(m.edition_year) === year).sort((a, b) => String(a.date).localeCompare(String(b.date))))
// Una edición no publicada no rompe el sitio: mostramos estado vacío o error de CMS.
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
    <CmsNotice v-if="error" type="error" :message="cmsErrorMessage(error)" @retry="refresh" />
    <CmsNotice v-else-if="!matches?.length" message="No se encontraron partidos asociados a esta edición en la respuesta recibida. Comprobá las relaciones y el año de los registros." />
    <div v-if="!error && matches?.length" class="filters"><label>Buscar en esta edición<input v-model="search" type="search" placeholder="Selección o estadio" /></label><label>Fase<select v-model="stage"><option value="">Todas las fases</option><option v-for="item in stages" :key="item" :value="item">{{ item }}</option></select></label></div>
    <p v-if="!error && matches?.length" class="result-count" aria-live="polite">{{ filtered.length }} resultados</p>
    <MatchList v-if="!error && matches?.length" :matches="visible" />
    <p v-if="!error && matches?.length && !visible.length" class="empty-state">No hay partidos que coincidan con esos filtros.</p>
    <PaginationNav v-if="!error && matches?.length" :page="page" :total-pages="totalPages" @change="page = $event" />
  </div>
</template>

<script setup>
import { cmsErrorMessage } from '~/utils/cmsError.js'
const route = useRoute()
const id = String(route.params.id || '')
// El identificador corresponde al campo numérico match_id de CometCMS.
const { data: allMatches, error, refresh } = await useMatches()
const match = computed(() => (allMatches.value || []).find(m => String(m.match_id) === id))
// Mostrar estado vacío si el partido no existe en CometCMS.
useHead({ title: 'Detalle del partido' })
</script>
<template>
  <div class="detail-page">
    <CmsNotice v-if="error" type="error" :message="cmsErrorMessage(error)" @retry="refresh" />
    <CmsNotice v-else-if="!match" message="Este partido no aparece entre los registros publicados de CometCMS." />
    <template v-else>
    <Breadcrumbs :items="[{ label: 'Ediciones', to: '/ediciones' }, { label: String(match.edition_year), to: `/ediciones/${match.edition_year}` }, { label: `${match.home_team} vs ${match.away_team}` }]" />
    <p class="eyebrow">{{ match.stage }} · {{ match.edition_year || 'No registrada' }}</p>
    <div class="scoreboard"><div><span class="team-name">{{ match.home_team }}</span></div><div class="score">{{ match.home_score ?? '—' }} <span>–</span> {{ match.away_score ?? '—' }}</div><div><span class="team-name">{{ match.away_team }}</span></div></div>
    <h1 class="sr-only">{{ match.home_team }} {{ match.home_score ?? '—' }} a {{ match.away_score ?? '—' }} {{ match.away_team }}</h1>
    <section class="detail-facts"><h2>Ficha del partido</h2><dl>
      <div><dt>Edición</dt><dd><NuxtLink v-if="match.edition_year" :to="`/ediciones/${match.edition_year}`">{{ match.edition_year }}</NuxtLink><span v-else>No registrada</span></dd></div>
      <div><dt>Fecha</dt><dd>{{ match.date || 'No registrada' }}</dd></div>
      <div><dt>Fase</dt><dd>{{ match.stage }}</dd></div>
      <div v-if="match.group && match.group !== 'No aplica'"><dt>Grupo</dt><dd>{{ match.group }}</dd></div>
      <div><dt>Estadio</dt><dd>{{ match.stadium || 'No registrado' }}</dd></div>
      <div><dt>Código del partido</dt><dd>{{ match.match_id }}</dd></div>
    </dl></section>
    <NuxtLink class="secondary-link" :to="match.edition_year ? `/ediciones/${match.edition_year}` : '/ediciones'">Volver a ediciones</NuxtLink>
    </template>
  </div>
</template>

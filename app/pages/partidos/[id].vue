<script setup>
const route = useRoute()
const id = String(route.params.id || '')
if (!/^M-\d{4}-\d{2,3}$/.test(id)) throw createError({ statusCode: 404, statusMessage: 'Partido no encontrado' })
const { data: allMatches } = await useMatches()
const match = computed(() => (allMatches.value || []).find(m => String(m.match_id) === id))
if (!match.value) throw createError({ statusCode: 404, statusMessage: 'Partido no encontrado' })
useHead({ title: `${match.value.home_team} vs ${match.value.away_team} (${match.value.edition_year})` })
</script>
<template>
  <div v-if="match" class="detail-page">
    <Breadcrumbs :items="[{ label: 'Ediciones', to: '/ediciones' }, { label: String(match.edition_year), to: `/ediciones/${match.edition_year}` }, { label: `${match.home_team} vs ${match.away_team}` }]" />
    <p class="eyebrow">{{ match.stage }} · {{ match.edition_year }}</p>
    <div class="scoreboard"><div><span class="team-name">{{ match.home_team }}</span></div><div class="score">{{ match.home_score }} <span>–</span> {{ match.away_score }}</div><div><span class="team-name">{{ match.away_team }}</span></div></div>
    <h1 class="sr-only">{{ match.home_team }} {{ match.home_score }} a {{ match.away_score }} {{ match.away_team }}</h1>
    <section class="detail-facts"><h2>Ficha del partido</h2><dl>
      <div><dt>Edición</dt><dd><NuxtLink :to="`/ediciones/${match.edition_year}`">{{ match.edition_year }}</NuxtLink></dd></div>
      <div><dt>Fecha</dt><dd>{{ match.date }}</dd></div>
      <div><dt>Hora local registrada</dt><dd>{{ match.time || 'No registrada' }}</dd></div>
      <div><dt>Fase</dt><dd>{{ match.stage }}</dd></div>
      <div v-if="match.group && match.group !== 'No aplica'"><dt>Grupo</dt><dd>{{ match.group }}</dd></div>
      <div><dt>Estadio</dt><dd>{{ match.stadium || 'No registrado' }}</dd></div>
      <div><dt>Ciudad</dt><dd>{{ match.city || 'No registrada' }}</dd></div>
      <div><dt>País anfitrión</dt><dd>{{ match.host_country || 'No registrado' }}</dd></div>
      <div v-if="match.extra_time === 1"><dt>Prórroga</dt><dd>Sí</dd></div>
      <div v-if="match.penalty_shootout === 1"><dt>Penales</dt><dd>{{ match.home_penalties }}–{{ match.away_penalties }}</dd></div>
      <div><dt>Código del partido</dt><dd>{{ match.match_id }}</dd></div>
    </dl></section>
    <NuxtLink class="secondary-link" :to="`/ediciones/${match.edition_year}`">Volver a la edición</NuxtLink>
  </div>
</template>

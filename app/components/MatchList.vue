<script setup>
const props = defineProps({ matches: { type: Array, default: () => [] } })
</script>
<template>
  <div class="table-scroll">
    <table class="match-table">
      <caption class="sr-only">Listado de partidos con fecha, selecciones, resultado y fase</caption>
      <thead><tr>
        <th scope="col">Fecha</th><th scope="col">Selección local</th><th scope="col">Resultado</th>
        <th scope="col">Selección visitante</th><th scope="col">Fase</th>
        <th scope="col"><span class="sr-only">Enlace al partido</span></th>
      </tr></thead>
      <tbody>
        <tr v-for="match in props.matches" :key="match.match_id">
          <td class="table-muted">{{ match.date }}</td>
          <td>{{ match.home_team }}</td>
          <td class="table-score">{{ match.home_score }}–{{ match.away_score }}</td>
          <td>{{ match.away_team }}</td>
          <td class="table-muted">{{ match.stage }}</td>
          <td class="table-action"><NuxtLink :to="`/partidos/${match.match_id}`" :aria-label="`Ver detalle: ${match.home_team} contra ${match.away_team}, ${match.date}`">Ver partido<span aria-hidden="true"> →</span></NuxtLink></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

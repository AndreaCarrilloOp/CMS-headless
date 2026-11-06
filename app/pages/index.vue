<script setup>
useHead({ title: 'Inicio' })
</script>

<template>
  <section class="hero">
    <p class="eyebrow">Archivo histórico · Copa Mundial de la FIFA</p>
    <h1>La historia del Mundial, partido a partido.</h1>
    <p class="lead">
      Explorá las ediciones del torneo, consultá sus resultados y encontrá encuentros
      por selección, estadio o fase.
    </p>
    <nav class="hero-actions" aria-label="Explorar el archivo">
      <NuxtLink class="primary-link" to="/ediciones">Explorar ediciones</NuxtLink>
      <NuxtLink class="secondary-link" to="/partidos">Buscar partidos</NuxtLink>
    </nav>
  </section>
</template>

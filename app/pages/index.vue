<script setup>
useHead({ title: 'Inicio' })
</script>

<template>
  <section class="hero" aria-labelledby="inicio-titulo">
    <p class="eyebrow">Archivo histórico · Copa Mundial de la FIFA</p>
    <h1 id="inicio-titulo">La historia del Mundial, partido a partido.</h1>
    <p class="lead">Explorá las ediciones del torneo, consultá sus resultados y encontrá encuentros por selección, estadio o fase.</p>
    <div class="hero-actions">
      <NuxtLink class="primary-link" to="/ediciones">Explorar ediciones</NuxtLink>
      <NuxtLink class="secondary-link" to="/partidos">Buscar partidos</NuxtLink>
    </div>
  </section>
</template>

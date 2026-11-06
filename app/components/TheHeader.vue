<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand" aria-label="FIFA World Cup, inicio">World Cup <span>Archive</span></NuxtLink>
      <nav aria-label="Navegación principal">
        <NuxtLink to="/" exact-active-class="is-active">Inicio</NuxtLink>
        <NuxtLink to="/ediciones">Ediciones</NuxtLink>
        <NuxtLink to="/partidos">Partidos</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
// Jerarquía visible y accesible, sin añadir rutas fuera del enunciado.
const props = defineProps({ items: { type: Array, required: true } })
</script>
<template>
  <nav class="breadcrumbs" aria-label="Ruta de navegación">
    <ol>
      <li><NuxtLink to="/">Inicio</NuxtLink></li>
      <li v-for="(item, index) in props.items" :key="`${item.label}-${index}`">
        <span class="breadcrumb-separator" aria-hidden="true">/</span>
        <NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

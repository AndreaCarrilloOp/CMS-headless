<script setup>
defineProps({
  edition: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <NuxtLink :to="`/mundiales/${edition.year}`" class="edition-card">
    <div class="edition-year">{{ edition.year }}</div>
    <div class="edition-copy">
      <h2>{{ edition.host }}</h2>
      <p>{{ edition.matches }} partidos</p>
    </div>
    <span class="edition-action">Ver edición →</span>
  </NuxtLink>
</template>

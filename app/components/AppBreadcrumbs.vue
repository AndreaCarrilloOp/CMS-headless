<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <nav class="breadcrumbs" aria-label="Migas de pan">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
      <span v-else>{{ item.label }}</span>
      <span v-if="index < items.length - 1"> / </span>
    </template>
  </nav>
</template>

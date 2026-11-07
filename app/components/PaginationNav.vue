<script setup>
const props = defineProps({ page: { type: Number, required: true }, totalPages: { type: Number, required: true } })
const emit = defineEmits(['change'])
</script>
<template>
  <nav v-if="totalPages > 1" class="pager" aria-label="Paginación">
    <button type="button" :disabled="page <= 1" @click="emit('change', page - 1)">Anterior</button>
    <span aria-live="polite">Página {{ page }} de {{ totalPages }}</span>
    <button type="button" :disabled="page >= totalPages" @click="emit('change', page + 1)">Siguiente</button>
  </nav>
</template>

<script setup>
defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'info' }
})
defineEmits(['retry'])
</script>

<template>
  <section class="cms-notice" :class="`cms-notice--${type}`" role="status">
    <strong>{{ type === 'error' ? 'No se pudo consultar CometCMS' : 'Información del catálogo' }}</strong>
    <p>{{ message }}</p>
    <button v-if="type === 'error'" type="button" class="cms-retry" @click="$emit('retry')">Reintentar</button>
  </section>
</template>

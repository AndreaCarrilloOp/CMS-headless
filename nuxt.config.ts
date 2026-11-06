// Tarea 3 · El frontend del Proyecto 1 obtiene datos desde CometCMS.
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  css: ['~/assets/css/site.css'],
  app: { head: {
    titleTemplate: '%s · FIFA World Cup',
    meta: [{ name: 'description', content: 'Explorador de partidos de la Copa Mundial mediante CometCMS' }]
  } },
  runtimeConfig: {
    cometUrl: '',
    cometWorkspace: '',
    cometApiToken: ''
  }
})

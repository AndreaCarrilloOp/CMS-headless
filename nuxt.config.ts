export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/site.css'],
  app: {
    head: {
      titleTemplate: '%s · FIFA World Cup',
      meta: [
        { name: 'description', content: 'Explorador histórico de la Copa Mundial de la FIFA con CometCMS.' }
      ]
    }
  },
  runtimeConfig: {
    cometUrl: '',
    cometWorkspace: '',
    cometApiToken: ''
  }
})

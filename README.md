# FIFA World Cup Explorer · CometCMS

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxtdotjs&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![CometCMS](https://img.shields.io/badge/CMS-CometCMS-666)](https://getcometcms.github.io/CometCMS/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://cometcms.netlify.app/)

**EIF-511 · Arquitectura de Información · Universidad Nacional**  
**Estudiante:** Andrea Carrillo Oporto  
**Tarea 3:** Uso de un CMS headless

Adaptación del [Proyecto 1 — FIFA World Cup Explorer](https://github.com/AndreaCarrilloOp/fifa-world-cup-nuxt), que conserva el diseño, los componentes y la jerarquía de navegación **Ediciones → Rondas → Partidos → Detalle**. La fuente de información cambia de Nuxt Content/CSV a CometCMS mediante un proxy Nitro privado.

**Repositorio de Tarea 3:** https://github.com/AndreaCarrilloOp/CMS-headless  
**Sitio previsto en Netlify:** https://cometcms.netlify.app/  
**Estado:** código adaptado; conexión con el CMS y despliegue real pendientes de comprobar.

## Características
- Listados, detalle de partidos y ediciones.
- Búsqueda, filtros y paginación (12 registros por página).
- Rutas dinámicas, diseño responsive y navegación del Proyecto 1.
- Relaciones `matches.edition → editions` y `matches.stadium → stadiums`.
- Consultas vía `useFetch('/api/comet/content/matches')`, Nitro y token privado.

## Ejecución local
```powershell
npm install
Copy-Item .env.example .env
# Completar las tres variables en .env
npm run dev
```

## Publicación
Conectar este repositorio (rama `main`) al sitio Netlify existente, usar `npm run build` y publicar `dist`. Configurar `NUXT_COMET_URL`, `NUXT_COMET_WORKSPACE`, `NUXT_COMET_API_TOKEN` como variables privadas de Netlify. CometCMS debe estar disponible por HTTPS desde Internet; `localhost` no funciona en producción. No usar `npm run generate` porque Nitro ejecuta el proxy en el servidor.

## Documentación
- [Modelo de contenido en CometCMS](docs/MODELO_COMETCMS.md)
- [Guía de configuración y pruebas](docs/GUIA_TAREA3.md)
- [Verificación y entrega](docs/VERIFICACION_Y_ENTREGA.md)

## Datos
Datos originalmente adaptados de [The Fjelstul World Cup Database](https://github.com/jfjelstul/worldcup), Joshua C. Fjelstul (CC BY-SA 4.0). El [CSV original del Proyecto 1](https://github.com/AndreaCarrilloOp/fifa-world-cup-nuxt/blob/main/content/matches.csv) sirve para importar registros a CometCMS, **no** como fuente de datos del frontend. La cantidad importada debe registrarse según lo que efectivamente se publique.

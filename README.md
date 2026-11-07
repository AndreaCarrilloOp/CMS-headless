# FIFA World Cup Explorer · CometCMS

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxtdotjs&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![CometCMS](https://img.shields.io/badge/CMS-CometCMS-596579)](https://getcometcms.github.io/CometCMS/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://cometcms.netlify.app/)


**Sitio Netlify previsto:** https://cometcms.netlify.app/

Adaptación del [FIFA World Cup Explorer](https://github.com/AndreaCarrilloOp/fifa-world-cup-nuxt) para consultar los registros publicados en **CometCMS**. Se conserva la navegación **Ediciones → Partidos → Detalle**, la búsqueda, los filtros y la paginación.

## Tecnologías y estructura

- **Nuxt 4 + Vue 3:** páginas, componentes, layouts y rutas dinámicas.
- **CometCMS:** colecciones `editions`, `stadiums` y `matches`.
- **Campos de `matches`:** `match_id`, `stage`, `group`, `date`, `home_team`, `away_team`, `home_score`, `away_score`, `edition` y `stadium`.
- **Relaciones:** `edition` y `stadium`; el año procede de la edición y el nombre del estadio de su título.
- **Proxy Nitro:** `server/api/comet/[...path].ts`, de acuerdo con el Tutorial 6.
- **Consultas:** `useFetch('/api/comet/content/...')`, sin exponer el token en el navegador.

## Ejecución local

Requisitos: Node.js compatible con Nuxt 4 y acceso a una instancia CometCMS.

```powershell
npm install
Copy-Item .env.example .env
# Completar NUXT_COMET_API_TOKEN en .env sin compartirlo
npm run dev
```

Abrí `http://localhost:3000`. La portada muestra solamente la navegación y el bloque principal. Las secciones **Ediciones** y **Partidos** recuperan el contenido del CMS.

## Publicación en Netlify

Conectá el repositorio al sitio Netlify `cometcms`, rama `main`. Configuración incluida en `netlify.toml`: `npm run build`, directorio `dist`, con Nitro SSR para ejecutar el proxy.

En **Netlify → Site configuration → Environment variables**, configurá estos valores privados para Build y Functions:

| Variable | Valor |
|---|---|
| `NUXT_COMET_URL` | URL base de CometCMS con acceso API desde servidores |
| `NUXT_COMET_WORKSPACE` | Workspace que contiene tus colecciones (`fifa-world-cup` o `default`, según tu configuración real) |
| `NUXT_COMET_API_TOKEN` | Token privado con permiso Content / Read |

No subir el archivo `.env` ni configurar redirecciones SPA que sustituyan las rutas `/api/`.

# Guía de ejecución y entrega · Tarea 3

## 1. Aplicación base y destinos

- Proyecto 1 original: https://github.com/AndreaCarrilloOp/fifa-world-cup-nuxt
- **Solución de la Tarea 3:** https://github.com/AndreaCarrilloOp/CMS-headless
- **URL prevista en Netlify:** https://cometcms.netlify.app/

La adaptación se mantiene en un repositorio independiente. No modificar ni desplegar el Proyecto 1 sobre la misma URL.

## 2. Preparar CometCMS

El PDF de la tarea muestra `http://http://cms-una.gt.tc`; contiene `http://` duplicado. Confirmar con el profesor la dirección correcta, el workspace y el acceso HTTPS. El servidor local del Tutorial 6 (`localhost/cometcms`) **no estará disponible para Netlify**.

Crear `editions`, `stadiums` y `matches` según [MODELO_COMETCMS.md](MODELO_COMETCMS.md). En `matches`, establecer `edition` y `stadium` como relaciones. Publicar entradas reales provenientes del CSV utilizado en el Proyecto 1.

## 3. Token privado

En CometCMS, crear un token de solo lectura: **Content → View** para los tres tipos y el workspace correcto. No otorgar permisos de Create, Edit, Delete ni Publish. Guardar el token únicamente en `.env` local y como variable de entorno de Netlify.

## 4. Desarrollo local

```powershell
git clone https://github.com/AndreaCarrilloOp/CMS-headless.git
cd CMS-headless
npm install
Copy-Item .env.example .env
notepad .env
npm run dev
```

Completar `NUXT_COMET_URL` (dirección raíz del CMS, sin `/admin` ni `/api/v1`), `NUXT_COMET_WORKSPACE` (slug asignado), `NUXT_COMET_API_TOKEN`.

Durante la revisión de la rama propuesta, usar `git switch feature/tarea3-fifa-cometcms` después de clonar.

## 5. Verificar consultas y navegación

- Abrir `http://localhost:3000/api/comet/content/matches?include=edition,stadium`; revisar que devuelva entradas publicadas con relaciones.
- Abrir `/ediciones`, `/partidos`, una edición y un partido existente en el CMS. Las rutas disponibles dependerán de los registros que realmente se carguen.
- Probar búsqueda, filtros, paginación y detalle.
- Abrir F12 → Network: las solicitudes desde el navegador van al proxy `/api/comet/...`, no deben incluir el encabezado Bearer.
- Editar un registro en CometCMS, guardar/publicar y recargar Nuxt para demostrar que **los datos no proceden del CSV**.
- Ejecutar `npm run build`.

## 6. Publicación de Netlify

En el sitio Netlify correspondiente a `cometcms.netlify.app`, conectar **este repositorio** y la rama `main` tras revisar y fusionar los cambios. Build command `npm run build`; publish directory `dist` (configuración de Nitro/Netlify). Configurar las tres variables `NUXT_COMET_*` en **Environment variables**, disponibles en compilación y funciones.

Para producción CometCMS necesita una URL **HTTPS pública**. No usar `localhost`; tampoco `npm run generate` ni redirecciones SPA que intercepten las rutas de Nitro.

Si Netlify presenta errores de compilación o rutas API, verificar el adaptador Nitro disponible y los registros de Build y Functions.

## 7. Evidencias académicas

Registrar capturas de tipos y campos, relaciones, publicaciones, API, navegación, red sin Bearer y despliegue exitoso. README incluye autoría y enlace Netlify. No mostrar ningún token real.

**Nota:** el proyecto está preparado en código, pero no se declara funcionalidad del CMS ni despliegue verificados mientras falten datos de acceso y pruebas.

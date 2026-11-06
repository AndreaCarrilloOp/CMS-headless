# Modelo de contenido — Tarea 3

El proyecto reutiliza los datos de FIFA World Cup Explorer. Crear **tres tipos de contenido** en el workspace de CometCMS asignado:

| Tipo | Campos y tipos |
|---|---|
| `editions` | `year` (Number), `tournament_name` (Text), `host_country` (Text) |
| `stadiums` | `name` (Text), `city` (Text), `country` (Text) |
| `matches` | `match_id`, `date`, `time`, `stage`, `group`, `home_team`, `home_code`, `away_team`, `away_code` (Text); `home_score`, `away_score`, `home_penalties`, `away_penalties` (Number); `extra_time`, `penalty_shootout` (Boolean o Number 0/1); `edition` (Relation a `editions`), `stadium` (Relation a `stadiums`) |

CometCMS incorpora sus campos `title` y `slug`; los campos personalizados se guardan dentro de `data`. No duplicar `title` sin necesidad.

## Orden de carga

1. Crear y publicar `editions`.
2. Crear y publicar `stadiums`.
3. Crear y publicar `matches` y seleccionar **registros existentes** para `edition` y `stadium`.
4. Verificar `include=edition,stadium` en la respuesta de la API.

No reemplazar relaciones por nombres de texto plano. El CSV del [Proyecto 1](https://github.com/AndreaCarrilloOp/fifa-world-cup-nuxt/blob/main/content/matches.csv) sirve de fuente para transcribir los registros reales, pero no debe utilizarse para renderizar la Tarea 3. Documentar el número real de registros incorporados y publicados.

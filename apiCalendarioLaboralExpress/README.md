# API Calendario Laboral en Express + MongoDB

## Requisitos

- Node.js 18 o superior
- MongoDB en ejecucion

## Instalacion

```bash
npm install
copy .env.example .env
```

## Ejecutar

```bash
npm run seed
npm run start
```

## Scripts para MongoDB

Si prefieres poblar MongoDB directamente con `mongosh`, ejecuta:

```bash
mongosh --file mongodb/01-init-db.mongodb.js
mongosh --file mongodb/02-seed-data.mongodb.js
```

## Endpoints principales

- `GET /api/usuarios/validar/:nombreUsuario/:clave`
- `GET /api/paises/listar`
- `GET /api/tipos/listar`
- `GET /api/TipoFestivos/listar`
- `GET /api/festivos/listar`
- `GET /api/festivos/verificar/:idPais/:anio/:mes/:dia`
- `GET /api/festivos/listar/:idPais/:anio`
- `GET /api/calendario/generar/:idPais/:anio`
- `GET /api/calendario/listar/:idPais/:anio`

## Notas

- El seed reutiliza los `INSERT` de `../BD/DML - CalendarioLaboral.sql`.
- La autenticacion mantiene JWT simple como en la version Java.
- Se corrigio el manejo del tipo festivo `5`, que en Java estaba cargado en datos pero no calculado.

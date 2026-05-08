# Marketplace UNAD - Prototipo MVP TRL5

Plataforma web tipo marketplace para apoyar la comercializacion digital de emprendedores locales (Tocaima, Viota y zonas cercanas a Girardot) en el contexto del curso **Proyecto de Grado - UNAD**.

## 1) Contexto academico

- **Curso:** Proyecto de Grado (Codigo 202016907)
- **Programa:** Ingenieria de Sistemas
- **Fase:** Fase 4 - Desarrollo del componente practico
- **Titulo del proyecto:** Desarrollo de una Plataforma Web tipo Marketplace para el Fortalecimiento Digital de Emprendedores Locales
- **Integrantes:** Daniel Enrique Preciado Quintero, Mercy Julieth Parrado Ramirez, Natalia Garcia Alvarez
- **Tutor:** Orlando Gomez Barboza

## 2) Stack tecnologico

- React 19
- TypeScript
- Vite 6
- Hono
- Cloudflare Workers
- Wrangler

## 3) Funcionalidades implementadas en el MVP

- Landing page con contexto del problema y propuesta de valor.
- Seleccion de rol (comprador / emprendedor) con usuarios demo.
- Autenticacion simulada para prototipo academico (sin backend real).
- Catalogo de productos con datos semilla locales.
- Busqueda por texto y filtro por categoria.
- Carrito de compras y generacion de pedidos.
- Confirmacion de pedidos con estado inicial `Pendiente`.
- Dashboard de emprendedor con:
  - CRUD basico de productos;
  - consulta de pedidos recibidos;
  - actualizacion de estado (`Pendiente`, `Confirmado`, `Entregado`, `Cancelado`);
  - estadisticas basicas (productos, pedidos, pendientes, ventas estimadas, producto mas solicitado).
- Seccion de validacion TRL5 dentro de la app.
- Persistencia local usando `localStorage`.

## 4) Arquitectura de prototipo

La aplicacion usa persistencia local (navegador) para acelerar el prototipo TRL5:

- rol/usuario activo;
- productos;
- pedidos;
- carrito por comprador.

No se usan pagos reales, autenticacion avanzada ni base de datos remota en esta iteracion.

## 5) Usuarios demo

- Emprendedor:
  - `emprendedor@demo.com / 123456`
  - `emprendedor2@demo.com / 123456`
- Comprador:
  - `comprador@demo.com / 123456`
  - `comprador2@demo.com / 123456`

## 6) Instalacion y ejecucion local

```bash
npm install
npm run dev
```

Aplicacion local: `http://localhost:5173`

## 7) Construccion (build)

```bash
npm run build
```

## 8) Despliegue en Cloudflare Workers

```bash
npm run deploy
```

## 9) Nota para entornos con proxy corporativo

```bash
env -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY \
    -u http_proxy -u https_proxy -u all_proxy \
    NO_PROXY=localhost,127.0.0.1,::1 \
    npm run dev
```

## 10) Enlaces de evidencia

- **Repositorio GitHub:** pendiente de anexar en documento maestro
- **Despliegue Cloudflare:** pendiente de anexar
- **Video demostrativo (max. 10 min):** pendiente de anexar

## 11) Estado TRL5

El prototipo se encuentra en **estado TRL5 (validacion en entorno relevante simulado)**:

- flujos comprador y emprendedor operativos;
- navegacion funcional;
- datos de contexto local;
- documentacion de validacion y plan de pruebas.

Detalles: [docs/TRL5_VALIDATION.md](docs/TRL5_VALIDATION.md)

## 12) Documentacion adicional

- [docs/TRL5_VALIDATION.md](docs/TRL5_VALIDATION.md)
- [docs/TEST_PLAN.md](docs/TEST_PLAN.md)
- [docs/VIDEO_SCRIPT.md](docs/VIDEO_SCRIPT.md)
- [docs/ACADEMIC_ALIGNMENT.md](docs/ACADEMIC_ALIGNMENT.md)

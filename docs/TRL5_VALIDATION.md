# TRL5_VALIDATION

## Que significa TRL5 en este proyecto

TRL5 implica validar una solucion funcional en un entorno relevante o simulado cercano al contexto real. En este caso, el prototipo se valida como plataforma web ejecutable para emprendedores locales y compradores.

## Funcionalidades implementadas

1. Landing informativa del proyecto.
2. Seleccion de rol comprador / emprendedor.
3. Inicio simulado con usuarios demo.
4. Catalogo de productos locales con busqueda y filtro.
5. Carrito y generacion de pedidos.
6. Dashboard emprendedor.
7. CRUD de productos.
8. Gestion de pedidos y estados.
9. Estadisticas basicas de ventas y demanda.
10. Persistencia local con localStorage.

## Entorno de validacion

- Navegador moderno en entorno web.
- Ejecucion local con Vite.
- Compatibilidad objetivo: Chrome, Edge y Firefox.
- Despliegue objetivo: Cloudflare Workers.

## Usuarios participantes en la validacion

- Emprendedor local (perfil con baja apropiacion digital).
- Comprador local.
- Equipo academico del curso para verificacion de criterios.

## Tareas de prueba sugeridas

### Comprador

1. Entrar como comprador demo.
2. Buscar y filtrar productos.
3. Agregar productos al carrito.
4. Generar pedido.
5. Ver confirmacion e historial.

### Emprendedor

1. Entrar como emprendedor demo.
2. Crear un nuevo producto.
3. Editar un producto existente.
4. Eliminar un producto.
5. Revisar pedidos recibidos.
6. Cambiar estado de pedido.
7. Revisar estadisticas basicas.

## Criterios de aceptacion

- `npm run build` exitoso.
- Navegacion por rol sin bloqueos.
- Pedido generado con estado inicial `Pendiente`.
- CRUD de productos operativo.
- Cambio de estado de pedidos operativo.
- Persistencia local entre recargas.

## Evidencias esperadas

- Capturas de la interfaz por flujo.
- Registro de build exitoso.
- Video demostrativo (maximo 10 minutos).
- Enlaces a repositorio y despliegue.

## Relacion con escala SUS

Se recomienda aplicar encuesta SUS al finalizar cada sesion de prueba para medir:

- facilidad de aprendizaje;
- claridad de navegacion;
- confianza de uso inicial;
- percepcion de utilidad del prototipo.

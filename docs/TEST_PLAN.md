# TEST_PLAN

## Objetivo

Validar funcionalidad y usabilidad del MVP marketplace en un entorno academico simulado para TRL5.

## Alcance

- Flujos comprador.
- Flujos emprendedor.
- Persistencia local.
- Claridad de interfaz y facilidad de uso.

## Casos de prueba funcionales

| ID | Caso | Pasos | Resultado esperado |
|---|---|---|---|
| CP-01 | Seleccion de rol | Abrir app y entrar por selector de rol | Usuario queda en vista correspondiente al rol |
| CP-02 | Busqueda en catalogo | Escribir texto en buscador | Lista filtrada por coincidencia |
| CP-03 | Filtro por categoria | Seleccionar categoria | Solo se muestran productos de esa categoria |
| CP-04 | Agregar a carrito | Agregar varios productos | Contador de carrito incrementa |
| CP-05 | Modificar carrito | Cambiar cantidad y quitar item | Totales y lista se actualizan |
| CP-06 | Generar pedido | Desde carrito, presionar generar pedido | Se crean pedidos con estado `Pendiente` |
| CP-07 | Ver historial comprador | Revisar historial en carrito | Aparecen pedidos del comprador activo |
| CP-08 | Crear producto | En dashboard emprendedor, registrar producto | Producto aparece en listado |
| CP-09 | Editar producto | Modificar un producto creado | Cambios visibles en listado |
| CP-10 | Eliminar producto | Eliminar producto | Producto desaparece del listado |
| CP-11 | Gestionar pedido | Cambiar estado en panel de pedidos | Estado se actualiza y persiste |
| CP-12 | Estadisticas | Revisar panel de estadisticas | Indicadores coherentes con datos actuales |

## Casos de usabilidad

| ID | Evaluacion | Criterio |
|---|---|---|
| CU-01 | Claridad del lenguaje | Botones y mensajes comprensibles para usuario no tecnico |
| CU-02 | Facilidad de navegacion | Secciones clave accesibles en maximo 2 clics |
| CU-03 | Legibilidad | Contraste y tamano de texto suficiente en movil y desktop |
| CU-04 | Feedback de acciones | La app confirma acciones relevantes (pedido generado, cambios de estado) |

## Tareas guiadas para comprador

1. Entrar con usuario comprador demo.
2. Buscar "cafe".
3. Filtrar por "Alimentos".
4. Agregar 2 productos y generar pedido.
5. Confirmar visualizacion del pedido creado.

## Tareas guiadas para emprendedor

1. Entrar con usuario emprendedor demo.
2. Crear un producto nuevo.
3. Editar precio del producto.
4. Revisar pedidos y marcar uno como `Confirmado`.
5. Revisar indicador de pedidos confirmados/entregados.

## Resultado esperado global

El usuario logra completar los dos flujos principales sin asistencia tecnica, con persistencia local funcional y build exitoso.

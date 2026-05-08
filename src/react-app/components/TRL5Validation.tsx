export function TRL5Validation() {
	return (
		<section className="panel trl5">
			<header className="panel__header">
				<h2>Validacion TRL5</h2>
				<p>
					Esta seccion resume como se valida el prototipo en un entorno relevante
					(simulado) para emprendedores locales.
				</p>
			</header>

			<div className="trl5-grid">
				<article>
					<h3>Funcionalidades implementadas</h3>
					<ul>
						<li>Landing con contexto academico del proyecto.</li>
						<li>Seleccion de rol comprador/emprendedor con usuarios demo.</li>
						<li>Catalogo con busqueda y filtro por categoria.</li>
						<li>Carrito, generacion de pedido y confirmacion.</li>
						<li>Dashboard emprendedor con CRUD de productos.</li>
						<li>Gestion de pedidos y actualizacion de estado.</li>
						<li>Estadisticas basicas de negocio.</li>
					</ul>
				</article>

				<article>
					<h3>Entorno de validacion</h3>
					<ul>
						<li>App React + Vite ejecutada en navegador moderno.</li>
						<li>Persistencia local usando localStorage.</li>
						<li>Compatibilidad esperada: Chrome, Edge y Firefox.</li>
						<li>Despliegue objetivo: Cloudflare Workers (Wrangler).</li>
					</ul>
				</article>

				<article>
					<h3>Usuarios objetivo</h3>
					<ul>
						<li>Emprendedores locales con baja apropiacion digital.</li>
						<li>Compradores de municipios cercanos.</li>
						<li>Equipo academico para validacion de requisitos funcionales.</li>
					</ul>
				</article>

				<article>
					<h3>Criterios de aceptacion</h3>
					<ul>
						<li>Navegacion funcional por roles.</li>
						<li>Pedido generado desde carrito sin errores.</li>
						<li>CRUD de productos operativo.</li>
						<li>Cambio de estados de pedidos operativo.</li>
						<li>Compilacion exitosa con npm run build.</li>
					</ul>
				</article>

				<article>
					<h3>Tareas sugeridas de prueba</h3>
					<ol>
						<li>Ingresar como comprador y crear un pedido.</li>
						<li>Ingresar como emprendedor y confirmar ese pedido.</li>
						<li>Editar un producto y verificar persistencia local.</li>
						<li>Revisar estadisticas actualizadas por pedidos.</li>
					</ol>
				</article>

				<article>
					<h3>Relacion con escala SUS</h3>
					<p>
						El plan de pruebas incluye encuesta SUS posterior a los flujos de
						uso para medir facilidad de aprendizaje, claridad de navegacion y
						confianza de uso inicial.
					</p>
					<p>
						Los detalles de validacion se encuentran en{" "}
						<code>docs/TRL5_VALIDATION.md</code> y <code>docs/TEST_PLAN.md</code>.
					</p>
				</article>
			</div>
		</section>
	);
}

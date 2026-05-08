interface LandingProps {
	onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
	return (
		<section className="landing">
			<div className="landing__hero">
				<p className="eyebrow">Proyecto de Grado UNAD - Fase 4</p>
				<h2>Marketplace para fortalecer emprendedores locales</h2>
				<p>
					Este prototipo conecta compradores y emprendedores de Tocaima, Viota y
					Girardot en un entorno web simple, demostrable y alineado con TRL5.
				</p>
				<div className="landing__cta">
					<button type="button" onClick={onStart}>
						Ingresar al prototipo
					</button>
				</div>
			</div>

			<div className="landing__grid">
				<article>
					<h3>Problema</h3>
					<p>
						La venta informal por mensajeria limita visibilidad, trazabilidad y
						crecimiento comercial para emprendimientos locales.
					</p>
				</article>
				<article>
					<h3>Solucion</h3>
					<p>
						Catalogo digital, gestion de pedidos y tablero de seguimiento con
						datos de ejemplo y persistencia local.
					</p>
				</article>
				<article>
					<h3>Beneficiarios</h3>
					<p>
						Emprendedores con baja apropiacion tecnologica y compradores que
						buscan oferta local organizada.
					</p>
				</article>
				<article>
					<h3>Funcionalidades clave</h3>
					<p>
						Seleccion de rol, carrito, pedido, CRUD de productos, estados de
						pedido, estadisticas y validacion TRL5.
					</p>
				</article>
			</div>
		</section>
	);
}

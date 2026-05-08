import type { Order, Product } from "../types";
import { formatCurrency } from "../utils/format";

interface StatsPanelProps {
	products: Product[];
	orders: Order[];
}

export function StatsPanel({ products, orders }: StatsPanelProps) {
	const pendingOrders = orders.filter((order) => order.status === "Pendiente").length;
	const completedOrders = orders.filter(
		(order) => order.status === "Confirmado" || order.status === "Entregado",
	).length;
	const estimatedSales = orders
		.filter((order) => order.status !== "Cancelado")
		.reduce((acc, order) => acc + order.total, 0);

	const demandByProduct = orders.reduce<Record<string, number>>((acc, order) => {
		for (const item of order.items) {
			acc[item.productName] = (acc[item.productName] ?? 0) + item.quantity;
		}
		return acc;
	}, {});

	const mostRequested = Object.entries(demandByProduct).sort(
		(a, b) => b[1] - a[1],
	)[0];

	return (
		<div className="stats-grid">
			<article>
				<h3>Total productos</h3>
				<p>{products.length}</p>
			</article>
			<article>
				<h3>Total pedidos</h3>
				<p>{orders.length}</p>
			</article>
			<article>
				<h3>Pedidos pendientes</h3>
				<p>{pendingOrders}</p>
			</article>
			<article>
				<h3>Pedidos confirmados/entregados</h3>
				<p>{completedOrders}</p>
			</article>
			<article>
				<h3>Ventas estimadas</h3>
				<p>{formatCurrency(estimatedSales)}</p>
			</article>
			<article>
				<h3>Producto mas solicitado</h3>
				<p>
					{mostRequested ? `${mostRequested[0]} (${mostRequested[1]} und)` : "Sin datos"}
				</p>
			</article>
		</div>
	);
}

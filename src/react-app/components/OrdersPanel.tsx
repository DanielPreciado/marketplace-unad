import type { Order, OrderStatus } from "../types";
import { ORDER_STATUSES } from "../types";
import { formatCurrency, formatDate } from "../utils/format";

interface OrdersPanelProps {
	orders: Order[];
	onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export function OrdersPanel({ orders, onUpdateStatus }: OrdersPanelProps) {
	if (orders.length === 0) {
		return (
			<div className="empty-state">
				<p>No hay pedidos recibidos para este emprendedor.</p>
			</div>
		);
	}

	return (
		<div className="orders-panel">
			{orders.map((order) => (
				<article key={order.id} className="order-card">
					<header>
						<h3>{order.id}</h3>
						<p>
							{order.buyerName} - {order.buyerEmail}
						</p>
					</header>
					<ul>
						{order.items.map((item) => (
							<li key={`${order.id}-${item.productId}`}>
								{item.productName} x {item.quantity} (
								{formatCurrency(item.unitPrice * item.quantity)})
							</li>
						))}
					</ul>
					<p>Total: {formatCurrency(order.total)}</p>
					<p>Fecha: {formatDate(order.createdAt)}</p>
					<label>
						Estado
						<select
							value={order.status}
							onChange={(event) =>
								onUpdateStatus(order.id, event.target.value as OrderStatus)
							}
						>
							{ORDER_STATUSES.map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</label>
				</article>
			))}
		</div>
	);
}

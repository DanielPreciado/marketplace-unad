import { useMemo, useState } from "react";
import type { CartItem, Order, Product, User } from "../types";
import { formatCurrency, formatDate } from "../utils/format";

interface CartProps {
	buyer: User;
	cartItems: CartItem[];
	products: Product[];
	buyerOrders: Order[];
	onUpdateQuantity: (productId: string, quantity: number) => void;
	onRemoveItem: (productId: string) => void;
	onCheckout: () => Order[];
}

export function Cart({
	buyer,
	cartItems,
	products,
	buyerOrders,
	onUpdateQuantity,
	onRemoveItem,
	onCheckout,
}: CartProps) {
	const [createdOrders, setCreatedOrders] = useState<Order[]>([]);

	const detailedItems = useMemo(
		() =>
			cartItems
				.map((item) => {
					const product = products.find((candidate) => candidate.id === item.productId);
					if (!product) {
						return null;
					}
					return {
						...item,
						product,
						subtotal: product.price * item.quantity,
					};
				})
				.filter((item): item is NonNullable<typeof item> => item !== null),
		[cartItems, products],
	);

	const total = detailedItems.reduce((acc, item) => acc + item.subtotal, 0);

	const handleCheckout = () => {
		const orders = onCheckout();
		setCreatedOrders(orders);
	};

	return (
		<section className="panel cart">
			<header className="panel__header">
				<h2>Carrito y generacion de pedido</h2>
				<p>
					Comprador: {buyer.name} ({buyer.email})
				</p>
			</header>

			{detailedItems.length === 0 ? (
				<div className="empty-state">
					<p>Tu carrito esta vacio.</p>
				</div>
			) : (
				<>
					<div className="cart-list">
						{detailedItems.map((item) => (
							<article key={item.product.id} className="cart-item">
								<div>
									<h3>{item.product.name}</h3>
									<p>{item.product.entrepreneurName}</p>
								</div>
								<div className="cart-item__controls">
									<button
										type="button"
										onClick={() =>
											onUpdateQuantity(item.product.id, item.quantity - 1)
										}
									>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										type="button"
										onClick={() =>
											onUpdateQuantity(item.product.id, item.quantity + 1)
										}
									>
										+
									</button>
								</div>
								<p>{formatCurrency(item.subtotal)}</p>
								<button type="button" onClick={() => onRemoveItem(item.product.id)}>
									Quitar
								</button>
							</article>
						))}
					</div>
					<div className="cart-summary">
						<p>
							Total estimado: <strong>{formatCurrency(total)}</strong>
						</p>
						<button type="button" onClick={handleCheckout}>
							Generar pedido
						</button>
					</div>
				</>
			)}

			{createdOrders.length > 0 ? (
				<div className="confirmation">
					<h3>Pedido generado</h3>
					<p>
						Se generaron {createdOrders.length} pedido(s) con estado inicial
						"Pendiente".
					</p>
					<ul>
						{createdOrders.map((order) => (
							<li key={order.id}>
								{order.id} - {order.entrepreneurName} -{" "}
								{formatCurrency(order.total)}
							</li>
						))}
					</ul>
				</div>
			) : null}

			<div className="orders-history">
				<h3>Historial de pedidos del comprador</h3>
				{buyerOrders.length === 0 ? (
					<p>Aun no hay pedidos registrados para esta cuenta.</p>
				) : (
					<ul>
						{buyerOrders.slice(0, 6).map((order) => (
							<li key={order.id}>
								<strong>{order.id}</strong> - {order.entrepreneurName} -{" "}
								{order.status} - {formatCurrency(order.total)} -{" "}
								{formatDate(order.createdAt)}
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}

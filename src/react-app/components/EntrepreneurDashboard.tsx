import { useMemo, useState } from "react";
import { OrdersPanel } from "./OrdersPanel";
import { ProductForm } from "./ProductForm";
import { StatsPanel } from "./StatsPanel";
import type { Order, OrderStatus, Product, ProductDraft, User } from "../types";
import { formatCurrency, formatDate } from "../utils/format";

type DashboardTab = "products" | "orders" | "stats";

interface EntrepreneurDashboardProps {
	entrepreneur: User;
	products: Product[];
	orders: Order[];
	onCreateProduct: (draft: ProductDraft) => void;
	onUpdateProduct: (productId: string, draft: ProductDraft) => void;
	onDeleteProduct: (productId: string) => void;
	onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export function EntrepreneurDashboard({
	entrepreneur,
	products,
	orders,
	onCreateProduct,
	onUpdateProduct,
	onDeleteProduct,
	onUpdateOrderStatus,
}: EntrepreneurDashboardProps) {
	const [tab, setTab] = useState<DashboardTab>("products");
	const [editingProductId, setEditingProductId] = useState<string | null>(null);

	const editingProduct = useMemo(
		() => products.find((product) => product.id === editingProductId) ?? null,
		[editingProductId, products],
	);

	const handleSubmit = (draft: ProductDraft) => {
		if (editingProduct) {
			onUpdateProduct(editingProduct.id, draft);
			setEditingProductId(null);
			return;
		}
		onCreateProduct(draft);
	};

	return (
		<section className="panel dashboard">
			<header className="panel__header">
				<h2>Dashboard emprendedor</h2>
				<p>
					Usuario activo: {entrepreneur.name} ({entrepreneur.municipality})
				</p>
			</header>

			<div className="segmented-control" role="group" aria-label="Panel emprendedor">
				<button
					type="button"
					className={tab === "products" ? "is-active" : undefined}
					onClick={() => setTab("products")}
				>
					Productos
				</button>
				<button
					type="button"
					className={tab === "orders" ? "is-active" : undefined}
					onClick={() => setTab("orders")}
				>
					Pedidos
				</button>
				<button
					type="button"
					className={tab === "stats" ? "is-active" : undefined}
					onClick={() => setTab("stats")}
				>
					Estadisticas
				</button>
			</div>

			{tab === "products" ? (
				<div className="dashboard-block">
					<ProductForm
						initialProduct={editingProduct}
						onSubmit={handleSubmit}
						onCancelEdit={() => setEditingProductId(null)}
					/>

					<div className="entrepreneur-products">
						<h3>Mis productos</h3>
						{products.length === 0 ? (
							<p>No hay productos publicados aun.</p>
						) : (
							<ul>
								{products.map((product) => (
									<li key={product.id}>
										<div>
											<strong>{product.name}</strong>
											<p>
												{product.category} - {formatCurrency(product.price)} -{" "}
												{product.available ? "Disponible" : "No disponible"} -{" "}
												{formatDate(product.createdAt)}
											</p>
										</div>
										<div className="line-actions">
											<button
												type="button"
												onClick={() => setEditingProductId(product.id)}
											>
												Editar
											</button>
											<button
												type="button"
												onClick={() => onDeleteProduct(product.id)}
											>
												Eliminar
											</button>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			) : null}

			{tab === "orders" ? (
				<div className="dashboard-block">
					<h3>Pedidos recibidos</h3>
					<OrdersPanel orders={orders} onUpdateStatus={onUpdateOrderStatus} />
				</div>
			) : null}

			{tab === "stats" ? (
				<div className="dashboard-block">
					<h3>Indicadores basicos del emprendimiento</h3>
					<StatsPanel products={products} orders={orders} />
				</div>
			) : null}
		</section>
	);
}

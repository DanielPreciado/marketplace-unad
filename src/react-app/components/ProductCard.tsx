import type { Product } from "../types";
import { formatCurrency } from "../utils/format";

interface ProductCardProps {
	product: Product;
	cartQuantity: number;
	onAddToCart: (productId: string) => void;
}

export function ProductCard({
	product,
	cartQuantity,
	onAddToCart,
}: ProductCardProps) {
	const initials = product.name
		.split(" ")
		.slice(0, 2)
		.map((word) => word[0]?.toUpperCase() ?? "")
		.join("");

	return (
		<article className="product-card">
			<div className="product-card__placeholder" aria-hidden="true">
				<span>{initials}</span>
			</div>
			<div className="product-card__content">
				<h3>{product.name}</h3>
				<p>{product.description}</p>
				<p className="meta">
					{product.category} - {product.municipality}
				</p>
				<p className="meta">Vendedor: {product.entrepreneurName}</p>
				<p className="price">{formatCurrency(product.price)}</p>
				<div className="product-card__actions">
					<button
						type="button"
						disabled={!product.available}
						onClick={() => onAddToCart(product.id)}
					>
						{product.available ? "Agregar al carrito" : "No disponible"}
					</button>
					<span>En carrito: {cartQuantity}</span>
				</div>
			</div>
		</article>
	);
}

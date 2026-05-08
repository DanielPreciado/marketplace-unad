import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { PRODUCT_CATEGORIES } from "../types";
import type { Product } from "../types";

interface CatalogProps {
	products: Product[];
	cartByProduct: Record<string, number>;
	onAddToCart: (productId: string) => void;
	onGoToCart: () => void;
}

export function Catalog({
	products,
	cartByProduct,
	onAddToCart,
	onGoToCart,
}: CatalogProps) {
	const [searchText, setSearchText] = useState("");
	const [category, setCategory] = useState<string>("Todas");

	const filteredProducts = useMemo(() => {
		const normalizedSearch = searchText.trim().toLowerCase();

		return products.filter((product) => {
			const matchCategory =
				category === "Todas" ? true : product.category === category;
			const matchSearch =
				normalizedSearch.length === 0
					? true
					: [
							product.name,
							product.description,
							product.municipality,
							product.entrepreneurName,
					  ]
							.join(" ")
							.toLowerCase()
							.includes(normalizedSearch);

			return matchCategory && matchSearch;
		});
	}, [category, products, searchText]);

	return (
		<section className="panel">
			<header className="panel__header">
				<h2>Catalogo de productos locales</h2>
				<p>
					Busca por texto o filtra por categoria para encontrar productos de
					emprendedores regionales.
				</p>
			</header>

			<div className="catalog-filters">
				<label>
					Buscar
					<input
						type="text"
						placeholder="Ej: mermelada, Viota, cafe"
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
					/>
				</label>
				<label>
					Categoria
					<select
						value={category}
						onChange={(event) => setCategory(event.target.value)}
					>
						<option value="Todas">Todas</option>
						{PRODUCT_CATEGORIES.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</label>
				<button type="button" onClick={onGoToCart}>
					Ver carrito
				</button>
			</div>

			<p className="catalog-result">
				{filteredProducts.length} producto(s) encontrado(s).
			</p>

			{filteredProducts.length === 0 ? (
				<div className="empty-state">
					<p>No hay productos con esos filtros.</p>
				</div>
			) : (
				<div className="product-grid">
					{filteredProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							cartQuantity={cartByProduct[product.id] ?? 0}
							onAddToCart={onAddToCart}
						/>
					))}
				</div>
			)}
		</section>
	);
}

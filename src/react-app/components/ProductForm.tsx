import { useEffect, useState, type FormEvent } from "react";
import { PRODUCT_CATEGORIES } from "../types";
import type { Product, ProductDraft } from "../types";

interface ProductFormProps {
	initialProduct: Product | null;
	onSubmit: (draft: ProductDraft) => void;
	onCancelEdit: () => void;
}

const initialDraft: ProductDraft = {
	name: "",
	description: "",
	category: "Alimentos",
	price: 0,
	municipality: "",
	imageUrl: "",
	available: true,
};

export function ProductForm({
	initialProduct,
	onSubmit,
	onCancelEdit,
}: ProductFormProps) {
	const [draft, setDraft] = useState<ProductDraft>(initialDraft);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!initialProduct) {
			setDraft(initialDraft);
			return;
		}

		setDraft({
			name: initialProduct.name,
			description: initialProduct.description,
			category: initialProduct.category,
			price: initialProduct.price,
			municipality: initialProduct.municipality,
			imageUrl: initialProduct.imageUrl ?? "",
			available: initialProduct.available,
		});
	}, [initialProduct]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (draft.name.trim().length < 3) {
			setError("El nombre del producto debe tener al menos 3 caracteres.");
			return;
		}
		if (draft.description.trim().length < 10) {
			setError("La descripcion debe tener al menos 10 caracteres.");
			return;
		}
		if (!Number.isFinite(draft.price) || draft.price <= 0) {
			setError("El precio debe ser mayor a cero.");
			return;
		}
		if (draft.municipality.trim().length < 3) {
			setError("El municipio es obligatorio.");
			return;
		}
		setError("");
		onSubmit({
			...draft,
			name: draft.name.trim(),
			description: draft.description.trim(),
			municipality: draft.municipality.trim(),
			imageUrl: draft.imageUrl?.trim() ? draft.imageUrl.trim() : undefined,
		});
		if (!initialProduct) {
			setDraft(initialDraft);
		}
	};

	return (
		<form className="product-form" onSubmit={handleSubmit}>
			<h3>{initialProduct ? "Editar producto" : "Crear producto"}</h3>
			<div className="form-grid">
				<label>
					Nombre
					<input
						type="text"
						value={draft.name}
						onChange={(event) =>
							setDraft((prev) => ({ ...prev, name: event.target.value }))
						}
						required
					/>
				</label>
				<label>
					Categoria
					<select
						value={draft.category}
						onChange={(event) =>
							setDraft((prev) => ({
								...prev,
								category: event.target.value as ProductDraft["category"],
							}))
						}
					>
						{PRODUCT_CATEGORIES.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</label>
				<label>
					Precio (COP)
					<input
						type="number"
						min={0}
						step={100}
						value={draft.price}
						onChange={(event) =>
							setDraft((prev) => ({
								...prev,
								price: Number(event.target.value),
							}))
						}
						required
					/>
				</label>
				<label>
					Municipio
					<input
						type="text"
						value={draft.municipality}
						onChange={(event) =>
							setDraft((prev) => ({ ...prev, municipality: event.target.value }))
						}
						required
					/>
				</label>
				<label className="form-grid__wide">
					Descripcion
					<textarea
						rows={3}
						value={draft.description}
						onChange={(event) =>
							setDraft((prev) => ({ ...prev, description: event.target.value }))
						}
						required
					/>
				</label>
				<label className="form-grid__wide">
					URL de imagen (opcional)
					<input
						type="text"
						value={draft.imageUrl}
						onChange={(event) =>
							setDraft((prev) => ({ ...prev, imageUrl: event.target.value }))
						}
					/>
				</label>
			</div>

			<label className="switch">
				<input
					type="checkbox"
					checked={draft.available}
					onChange={(event) =>
						setDraft((prev) => ({ ...prev, available: event.target.checked }))
					}
				/>
				<span>Producto disponible</span>
			</label>

			{error ? <p className="form-error">{error}</p> : null}

			<div className="form-actions">
				<button type="submit">{initialProduct ? "Guardar cambios" : "Crear"}</button>
				{initialProduct ? (
					<button type="button" onClick={onCancelEdit}>
						Cancelar
					</button>
				) : null}
			</div>
		</form>
	);
}

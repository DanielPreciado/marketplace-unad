export type UserRole = "entrepreneur" | "buyer";

export type AppView =
	| "landing"
	| "role"
	| "catalog"
	| "cart"
	| "dashboard"
	| "trl5";

export type ProductCategory =
	| "Alimentos"
	| "Artesanias"
	| "Ropa"
	| "Agricola"
	| "Hogar"
	| "Otros";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
	"Alimentos",
	"Artesanias",
	"Ropa",
	"Agricola",
	"Hogar",
	"Otros",
];

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	municipality: string;
}

export interface Product {
	id: string;
	entrepreneurId: string;
	entrepreneurName: string;
	name: string;
	description: string;
	category: ProductCategory;
	price: number;
	municipality: string;
	imageUrl?: string;
	available: boolean;
	createdAt: string;
}

export interface ProductDraft {
	name: string;
	description: string;
	category: ProductCategory;
	price: number;
	municipality: string;
	imageUrl?: string;
	available: boolean;
}

export type OrderStatus =
	| "Pendiente"
	| "Confirmado"
	| "Entregado"
	| "Cancelado";

export const ORDER_STATUSES: OrderStatus[] = [
	"Pendiente",
	"Confirmado",
	"Entregado",
	"Cancelado",
];

export interface OrderItem {
	productId: string;
	productName: string;
	quantity: number;
	unitPrice: number;
}

export interface Order {
	id: string;
	buyerName: string;
	buyerEmail: string;
	entrepreneurId: string;
	entrepreneurName: string;
	items: OrderItem[];
	total: number;
	status: OrderStatus;
	createdAt: string;
}

export interface CartItem {
	productId: string;
	quantity: number;
}

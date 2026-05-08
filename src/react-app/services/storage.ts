import { seedOrders, seedProducts } from "../data/seed";
import type { CartItem, Order, Product, UserRole } from "../types";

const STORAGE_KEY = "marketplace-unad:mvp:v1";

export interface PersistedAppState {
	selectedRole: UserRole | null;
	selectedUserId: string | null;
	products: Product[];
	orders: Order[];
	cartsByBuyer: Record<string, CartItem[]>;
}

const createDefaultState = (): PersistedAppState => ({
	selectedRole: null,
	selectedUserId: null,
	products: seedProducts,
	orders: seedOrders,
	cartsByBuyer: {},
});

export const loadState = (): PersistedAppState => {
	if (typeof window === "undefined") {
		return createDefaultState();
	}

	const raw = window.localStorage.getItem(STORAGE_KEY);
	if (!raw) {
		return createDefaultState();
	}

	try {
		const parsed = JSON.parse(raw) as Partial<PersistedAppState>;
		return {
			selectedRole: parsed.selectedRole ?? null,
			selectedUserId: parsed.selectedUserId ?? null,
			products: Array.isArray(parsed.products) ? parsed.products : seedProducts,
			orders: Array.isArray(parsed.orders) ? parsed.orders : seedOrders,
			cartsByBuyer:
				parsed.cartsByBuyer && typeof parsed.cartsByBuyer === "object"
					? parsed.cartsByBuyer
					: {},
		};
	} catch (error) {
		console.warn("No se pudo leer localStorage. Se usara estado semilla.", error);
		return createDefaultState();
	}
};

export const saveState = (state: PersistedAppState): void => {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const getCartForBuyer = (
	state: PersistedAppState,
	buyerId: string,
): CartItem[] => state.cartsByBuyer[buyerId] ?? [];

export const setCartForBuyer = (
	state: PersistedAppState,
	buyerId: string,
	cartItems: CartItem[],
): PersistedAppState => ({
	...state,
	cartsByBuyer: {
		...state.cartsByBuyer,
		[buyerId]: cartItems,
	},
});

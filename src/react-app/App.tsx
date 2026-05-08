import { useEffect, useMemo, useState } from "react";
import { Cart } from "./components/Cart";
import { Catalog } from "./components/Catalog";
import { EntrepreneurDashboard } from "./components/EntrepreneurDashboard";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { RoleSelector } from "./components/RoleSelector";
import { TRL5Validation } from "./components/TRL5Validation";
import { demoUsers } from "./data/seed";
import {
	getCartForBuyer,
	loadState,
	saveState,
	setCartForBuyer,
} from "./services/storage";
import type { AppView, Order, OrderItem, Product, ProductDraft, User } from "./types";
import "./App.css";

function buildCartSummary(cartItems: { productId: string; quantity: number }[]) {
	return cartItems.reduce((acc, item) => acc + item.quantity, 0);
}

function App() {
	const [state, setState] = useState(() => loadState());
	const [view, setView] = useState<AppView>(() => {
		if (state.selectedRole === "buyer") {
			return "catalog";
		}
		if (state.selectedRole === "entrepreneur") {
			return "dashboard";
		}
		return "landing";
	});

	const currentUser = useMemo<User | null>(
		() => demoUsers.find((user) => user.id === state.selectedUserId) ?? null,
		[state.selectedUserId],
	);

	const buyer = currentUser?.role === "buyer" ? currentUser : null;
	const entrepreneur = currentUser?.role === "entrepreneur" ? currentUser : null;

	const buyerCart = useMemo(
		() => (buyer ? getCartForBuyer(state, buyer.id) : []),
		[buyer, state],
	);
	const cartCount = useMemo(() => buildCartSummary(buyerCart), [buyerCart]);

	const buyerCartByProduct = useMemo(() => {
		const map: Record<string, number> = {};
		for (const item of buyerCart) {
			map[item.productId] = item.quantity;
		}
		return map;
	}, [buyerCart]);

	const buyerOrders = useMemo(
		() =>
			buyer
				? state.orders
						.filter((order) => order.buyerEmail === buyer.email)
						.sort(
							(first, second) =>
								new Date(second.createdAt).getTime() -
								new Date(first.createdAt).getTime(),
						)
				: [],
		[buyer, state.orders],
	);

	const entrepreneurProducts = useMemo(
		() =>
			entrepreneur
				? state.products.filter(
						(product) => product.entrepreneurId === entrepreneur.id,
					)
				: [],
		[entrepreneur, state.products],
	);

	const entrepreneurOrders = useMemo(
		() =>
			entrepreneur
				? state.orders.filter((order) => order.entrepreneurId === entrepreneur.id)
				: [],
		[entrepreneur, state.orders],
	);

	useEffect(() => {
		saveState(state);
	}, [state]);

	const handleSelectUser = (user: User) => {
		setState((previous) => ({
			...previous,
			selectedRole: user.role,
			selectedUserId: user.id,
		}));
		setView(user.role === "buyer" ? "catalog" : "dashboard");
	};

	const handleSignOut = () => {
		setState((previous) => ({
			...previous,
			selectedRole: null,
			selectedUserId: null,
		}));
		setView("role");
	};

	const handleAddToCart = (productId: string) => {
		if (!buyer) {
			setView("role");
			return;
		}

		setState((previous) => {
			const currentCart = getCartForBuyer(previous, buyer.id);
			const existingItem = currentCart.find((item) => item.productId === productId);
			const nextCart = existingItem
				? currentCart.map((item) =>
						item.productId === productId
							? { ...item, quantity: item.quantity + 1 }
							: item,
					)
				: [...currentCart, { productId, quantity: 1 }];

			return setCartForBuyer(previous, buyer.id, nextCart);
		});
	};

	const handleUpdateCartItem = (productId: string, quantity: number) => {
		if (!buyer) {
			return;
		}

		setState((previous) => {
			const currentCart = getCartForBuyer(previous, buyer.id);
			const nextCart =
				quantity <= 0
					? currentCart.filter((item) => item.productId !== productId)
					: currentCart.map((item) =>
							item.productId === productId ? { ...item, quantity } : item,
						);
			return setCartForBuyer(previous, buyer.id, nextCart);
		});
	};

	const handleRemoveCartItem = (productId: string) => {
		if (!buyer) {
			return;
		}
		setState((previous) => {
			const nextCart = getCartForBuyer(previous, buyer.id).filter(
				(item) => item.productId !== productId,
			);
			return setCartForBuyer(previous, buyer.id, nextCart);
		});
	};

	const handleCheckout = (): Order[] => {
		if (!buyer) {
			return [];
		}

		const cartItems = getCartForBuyer(state, buyer.id);
		if (cartItems.length === 0) {
			return [];
		}

		const groupedOrders = new Map<
			string,
			{
				entrepreneurId: string;
				entrepreneurName: string;
				items: OrderItem[];
				total: number;
			}
		>();

		for (const cartItem of cartItems) {
			const product = state.products.find(
				(candidate) => candidate.id === cartItem.productId,
			);
			if (!product) {
				continue;
			}

			const existingGroup = groupedOrders.get(product.entrepreneurId);
			const orderItem: OrderItem = {
				productId: product.id,
				productName: product.name,
				quantity: cartItem.quantity,
				unitPrice: product.price,
			};

			if (existingGroup) {
				existingGroup.items.push(orderItem);
				existingGroup.total += orderItem.unitPrice * orderItem.quantity;
				continue;
			}

			groupedOrders.set(product.entrepreneurId, {
				entrepreneurId: product.entrepreneurId,
				entrepreneurName: product.entrepreneurName,
				items: [orderItem],
				total: orderItem.unitPrice * orderItem.quantity,
			});
		}

		const timestamp = new Date().toISOString();
		const newOrders = Array.from(groupedOrders.values()).map((group, index) => ({
			id: `ord-${Date.now()}-${index + 1}`,
			buyerName: buyer.name,
			buyerEmail: buyer.email,
			entrepreneurId: group.entrepreneurId,
			entrepreneurName: group.entrepreneurName,
			items: group.items,
			total: group.total,
			status: "Pendiente" as const,
			createdAt: timestamp,
		}));

		setState((previous) => {
			const withEmptyCart = setCartForBuyer(previous, buyer.id, []);
			return {
				...withEmptyCart,
				orders: [...newOrders, ...previous.orders],
			};
		});

		return newOrders;
	};

	const handleCreateProduct = (draft: ProductDraft) => {
		if (!entrepreneur) {
			return;
		}

		const newProduct: Product = {
			id: `prd-${Date.now()}`,
			entrepreneurId: entrepreneur.id,
			entrepreneurName: entrepreneur.name,
			createdAt: new Date().toISOString(),
			...draft,
		};

		setState((previous) => ({
			...previous,
			products: [newProduct, ...previous.products],
		}));
	};

	const handleUpdateProduct = (productId: string, draft: ProductDraft) => {
		setState((previous) => ({
			...previous,
			products: previous.products.map((product) =>
				product.id === productId ? { ...product, ...draft } : product,
			),
		}));
	};

	const handleDeleteProduct = (productId: string) => {
		setState((previous) => {
			const nextProducts = previous.products.filter(
				(product) => product.id !== productId,
			);

			const nextCartsByBuyer = Object.fromEntries(
				Object.entries(previous.cartsByBuyer).map(([buyerId, cartItems]) => [
					buyerId,
					cartItems.filter((item) => item.productId !== productId),
				]),
			);

			return {
				...previous,
				products: nextProducts,
				cartsByBuyer: nextCartsByBuyer,
			};
		});
	};

	const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
		setState((previous) => ({
			...previous,
			orders: previous.orders.map((order) =>
				order.id === orderId ? { ...order, status } : order,
			),
		}));
	};

	const showBuyerGuard = view === "catalog" || view === "cart";
	const showEntrepreneurGuard = view === "dashboard";
	const missingRoleAccess =
		(showBuyerGuard && !buyer) || (showEntrepreneurGuard && !entrepreneur);

	return (
		<div className="app-shell">
			<Header
				currentView={view}
				currentUser={currentUser}
				cartCount={cartCount}
				onNavigate={setView}
				onSignOut={handleSignOut}
			/>

			<main className="app-main">
				{view === "landing" ? <Landing onStart={() => setView("role")} /> : null}
				{view === "role" ? (
					<RoleSelector users={demoUsers} onSelectUser={handleSelectUser} />
				) : null}
				{view === "catalog" && buyer ? (
					<Catalog
						products={state.products}
						cartByProduct={buyerCartByProduct}
						onAddToCart={handleAddToCart}
						onGoToCart={() => setView("cart")}
					/>
				) : null}
				{view === "cart" && buyer ? (
					<Cart
						buyer={buyer}
						cartItems={buyerCart}
						products={state.products}
						buyerOrders={buyerOrders}
						onUpdateQuantity={handleUpdateCartItem}
						onRemoveItem={handleRemoveCartItem}
						onCheckout={handleCheckout}
					/>
				) : null}
				{view === "dashboard" && entrepreneur ? (
					<EntrepreneurDashboard
						entrepreneur={entrepreneur}
						products={entrepreneurProducts}
						orders={entrepreneurOrders}
						onCreateProduct={handleCreateProduct}
						onUpdateProduct={handleUpdateProduct}
						onDeleteProduct={handleDeleteProduct}
						onUpdateOrderStatus={handleUpdateOrderStatus}
					/>
				) : null}
				{view === "trl5" ? <TRL5Validation /> : null}
				{missingRoleAccess ? (
					<div className="panel empty-state">
						<p>
							Para acceder a esta seccion primero debes seleccionar un usuario
							demo con el rol correspondiente.
						</p>
						<button type="button" onClick={() => setView("role")}>
							Ir a seleccion de rol
						</button>
					</div>
				) : null}
			</main>
		</div>
	);
}

export default App;

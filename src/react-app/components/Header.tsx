import type { AppView, User } from "../types";

interface HeaderProps {
	currentView: AppView;
	currentUser: User | null;
	cartCount: number;
	onNavigate: (view: AppView) => void;
	onSignOut: () => void;
}

export function Header({
	currentView,
	currentUser,
	cartCount,
	onNavigate,
	onSignOut,
}: HeaderProps) {
	const isBuyer = currentUser?.role === "buyer";
	const isEntrepreneur = currentUser?.role === "entrepreneur";

	return (
		<header className="topbar">
			<div className="topbar__brand">
				<h1>Marketplace UNAD</h1>
				<p>Prototipo web TRL5 para emprendedores locales</p>
			</div>

			<nav className="topbar__nav" aria-label="Navegacion principal">
				<button
					type="button"
					className={currentView === "landing" ? "is-active" : undefined}
					onClick={() => onNavigate("landing")}
				>
					Inicio
				</button>
				<button
					type="button"
					className={currentView === "role" ? "is-active" : undefined}
					onClick={() => onNavigate("role")}
				>
					Rol
				</button>
				{isBuyer ? (
					<>
						<button
							type="button"
							className={currentView === "catalog" ? "is-active" : undefined}
							onClick={() => onNavigate("catalog")}
						>
							Catalogo
						</button>
						<button
							type="button"
							className={currentView === "cart" ? "is-active" : undefined}
							onClick={() => onNavigate("cart")}
						>
							Carrito ({cartCount})
						</button>
					</>
				) : null}
				{isEntrepreneur ? (
					<button
						type="button"
						className={currentView === "dashboard" ? "is-active" : undefined}
						onClick={() => onNavigate("dashboard")}
					>
						Dashboard
					</button>
				) : null}
				<button
					type="button"
					className={currentView === "trl5" ? "is-active" : undefined}
					onClick={() => onNavigate("trl5")}
				>
					Validacion TRL5
				</button>
			</nav>

			<div className="topbar__session">
				{currentUser ? (
					<>
						<p>
							<strong>{currentUser.name}</strong>
						</p>
						<p>
							{currentUser.role === "buyer" ? "Comprador" : "Emprendedor"} -{" "}
							{currentUser.municipality}
						</p>
						<button type="button" onClick={onSignOut}>
							Cerrar sesion simulada
						</button>
					</>
				) : (
					<p>Sin sesion activa</p>
				)}
			</div>
		</header>
	);
}

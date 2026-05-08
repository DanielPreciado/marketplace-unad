import { useMemo, useState } from "react";
import type { User, UserRole } from "../types";

interface RoleSelectorProps {
	users: User[];
	onSelectUser: (user: User) => void;
}

export function RoleSelector({ users, onSelectUser }: RoleSelectorProps) {
	const [role, setRole] = useState<UserRole>("buyer");

	const roleUsers = useMemo(
		() => users.filter((user) => user.role === role),
		[role, users],
	);

	return (
		<section className="panel role-selector">
			<header className="panel__header">
				<h2>Seleccion de rol y acceso demo</h2>
				<p>
					Autenticacion simulada para prototipo academico. No se usa backend de
					credenciales ni tokens.
				</p>
			</header>

			<div className="segmented-control" role="group" aria-label="Rol de usuario">
				<button
					type="button"
					className={role === "buyer" ? "is-active" : undefined}
					onClick={() => setRole("buyer")}
				>
					Comprador
				</button>
				<button
					type="button"
					className={role === "entrepreneur" ? "is-active" : undefined}
					onClick={() => setRole("entrepreneur")}
				>
					Emprendedor
				</button>
			</div>

			<div className="credentials-hint">
				<p>
					Usuarios demo sugeridos: <strong>emprendedor@demo.com / 123456</strong>{" "}
					y <strong>comprador@demo.com / 123456</strong>.
				</p>
			</div>

			<div className="user-grid">
				{roleUsers.map((user) => (
					<article key={user.id} className="user-card">
						<h3>{user.name}</h3>
						<p>{user.email}</p>
						<p>
							{user.role === "buyer" ? "Comprador" : "Emprendedor"} -{" "}
							{user.municipality}
						</p>
						<button type="button" onClick={() => onSelectUser(user)}>
							Entrar como {user.role === "buyer" ? "comprador" : "emprendedor"}
						</button>
					</article>
				))}
			</div>
		</section>
	);
}

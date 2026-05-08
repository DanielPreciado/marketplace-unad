import type { Order, Product, User } from "../types";

export const demoUsers: User[] = [
	{
		id: "ent-1",
		name: "Sandra Morales",
		email: "emprendedor@demo.com",
		role: "entrepreneur",
		municipality: "Tocaima",
	},
	{
		id: "ent-2",
		name: "Luis Herrera",
		email: "emprendedor2@demo.com",
		role: "entrepreneur",
		municipality: "Viota",
	},
	{
		id: "buy-1",
		name: "Carolina Ruiz",
		email: "comprador@demo.com",
		role: "buyer",
		municipality: "Girardot",
	},
	{
		id: "buy-2",
		name: "Johan Prieto",
		email: "comprador2@demo.com",
		role: "buyer",
		municipality: "Tocaima",
	},
];

export const seedProducts: Product[] = [
	{
		id: "prd-001",
		entrepreneurId: "ent-1",
		entrepreneurName: "Sandra Morales",
		name: "Mermelada artesanal de mora",
		description:
			"Frasco de 250 g elaborado en cocina local, sin conservantes artificiales.",
		category: "Alimentos",
		price: 18500,
		municipality: "Tocaima",
		available: true,
		createdAt: "2026-04-18T09:30:00.000Z",
	},
	{
		id: "prd-002",
		entrepreneurId: "ent-2",
		entrepreneurName: "Luis Herrera",
		name: "Arepas caseras de maiz",
		description:
			"Paquete de 10 unidades precocidas, ideal para desayuno o venta en tienda.",
		category: "Alimentos",
		price: 4200,
		municipality: "Viota",
		available: true,
		createdAt: "2026-04-18T10:00:00.000Z",
	},
	{
		id: "prd-003",
		entrepreneurId: "ent-2",
		entrepreneurName: "Luis Herrera",
		name: "Canasta artesanal tejida",
		description:
			"Canasta decorativa elaborada a mano con fibras naturales de la region.",
		category: "Artesanias",
		price: 45000,
		municipality: "Girardot",
		available: true,
		createdAt: "2026-04-19T11:10:00.000Z",
	},
	{
		id: "prd-004",
		entrepreneurId: "ent-1",
		entrepreneurName: "Sandra Morales",
		name: "Camisa bordada artesanal",
		description:
			"Prenda en lino liviano con bordado manual inspirado en flora local.",
		category: "Ropa",
		price: 78000,
		municipality: "Tocaima",
		available: true,
		createdAt: "2026-04-20T08:40:00.000Z",
	},
	{
		id: "prd-005",
		entrepreneurId: "ent-1",
		entrepreneurName: "Sandra Morales",
		name: "Tomate campesino fresco",
		description:
			"Bolsa de 1 kg recolectada en finca familiar con manejo poscosecha basico.",
		category: "Agricola",
		price: 6300,
		municipality: "Viota",
		available: true,
		createdAt: "2026-04-20T09:15:00.000Z",
	},
	{
		id: "prd-006",
		entrepreneurId: "ent-2",
		entrepreneurName: "Luis Herrera",
		name: "Cafe artesanal regional",
		description:
			"Bolsa de 500 g de cafe tostado medio, origen fincas de la region.",
		category: "Alimentos",
		price: 22000,
		municipality: "Girardot",
		available: true,
		createdAt: "2026-04-21T14:20:00.000Z",
	},
	{
		id: "prd-007",
		entrepreneurId: "ent-1",
		entrepreneurName: "Sandra Morales",
		name: "Postres caseros por encargo",
		description:
			"Unidad individual de postre de tres leches. Pedido minimo de 4 unidades.",
		category: "Alimentos",
		price: 9500,
		municipality: "Tocaima",
		available: true,
		createdAt: "2026-04-22T12:05:00.000Z",
	},
	{
		id: "prd-008",
		entrepreneurId: "ent-2",
		entrepreneurName: "Luis Herrera",
		name: "Kit verduras mixtas",
		description:
			"Seleccion semanal de verduras de temporada para consumo familiar.",
		category: "Agricola",
		price: 28000,
		municipality: "Viota",
		available: true,
		createdAt: "2026-04-22T17:15:00.000Z",
	},
];

export const seedOrders: Order[] = [
	{
		id: "ord-001",
		buyerName: "Carolina Ruiz",
		buyerEmail: "comprador@demo.com",
		entrepreneurId: "ent-1",
		entrepreneurName: "Sandra Morales",
		items: [
			{
				productId: "prd-001",
				productName: "Mermelada artesanal de mora",
				quantity: 2,
				unitPrice: 18500,
			},
			{
				productId: "prd-005",
				productName: "Tomate campesino fresco",
				quantity: 3,
				unitPrice: 6300,
			},
		],
		total: 55900,
		status: "Pendiente",
		createdAt: "2026-04-24T10:30:00.000Z",
	},
	{
		id: "ord-002",
		buyerName: "Johan Prieto",
		buyerEmail: "comprador2@demo.com",
		entrepreneurId: "ent-2",
		entrepreneurName: "Luis Herrera",
		items: [
			{
				productId: "prd-002",
				productName: "Arepas caseras de maiz",
				quantity: 5,
				unitPrice: 4200,
			},
			{
				productId: "prd-006",
				productName: "Cafe artesanal regional",
				quantity: 1,
				unitPrice: 22000,
			},
		],
		total: 43000,
		status: "Confirmado",
		createdAt: "2026-04-25T15:00:00.000Z",
	},
	{
		id: "ord-003",
		buyerName: "Carolina Ruiz",
		buyerEmail: "comprador@demo.com",
		entrepreneurId: "ent-2",
		entrepreneurName: "Luis Herrera",
		items: [
			{
				productId: "prd-003",
				productName: "Canasta artesanal tejida",
				quantity: 1,
				unitPrice: 45000,
			},
		],
		total: 45000,
		status: "Entregado",
		createdAt: "2026-04-26T09:45:00.000Z",
	},
];

const currencyFormatter = new Intl.NumberFormat("es-CO", {
	style: "currency",
	currency: "COP",
	maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
	day: "2-digit",
	month: "short",
	year: "numeric",
});

export const formatCurrency = (value: number): string =>
	currencyFormatter.format(value);

export const formatDate = (isoDate: string): string =>
	dateFormatter.format(new Date(isoDate));

const API_URL = 'http://localhost:3000';

export async function fetchCategoriesWithProducts() {
	const response = await fetch(`${API_URL}/categories`);
	if (!response.ok) throw new Error('Error al cargar las categorías');
	const categories = await response.json();

	return Promise.all(
		categories.map(async (category) => {
			const productsResponse = await fetch(
				`${API_URL}/products?category_id=eq.${category.id}`,
			);
			if (!productsResponse.ok) throw new Error('Error al cargar los productos');
			const products = await productsResponse.json();
			return { ...category, products };
		}),
	);
}

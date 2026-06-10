const API_URL = 'http://localhost:3000';

function normalizeProduct(product) {
	const images = (product.product_images ?? [])
		.slice()
		.sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
		.map((img) => img.image_url);

	return { ...product, product_images: undefined, images, image: images[0] ?? '' };
}

export async function fetchCategoriesWithProducts() {
	const response = await fetch(`${API_URL}/categories`);
	if (!response.ok) throw new Error('Error al cargar las categorías');
	const categories = await response.json();

	return Promise.all(
		categories.map(async (category) => {
			const productsResponse = await fetch(
				`${API_URL}/products?category_id=eq.${category.id}&select=*,product_images(image_url,is_primary)&order=id`,
			);
			if (!productsResponse.ok) throw new Error('Error al cargar los productos');
			const products = await productsResponse.json();
			return { ...category, products: products.map(normalizeProduct) };
		}),
	);
}

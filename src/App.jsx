import { useEffect } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';

import { StoreProvider, useStore } from './context/StoreContext';
import AdminPanel from './components/AdminPanel';

function AppContent() {
	const { setCategories } = useStore();
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:3000/categories');
			const categories = await response.json();
			const categoriesWithProducts = await Promise.all(
				categories.map(async (category) => {
					const productsResponse = await fetch(
						'http://localhost:3000/products?category_id=eq.' + category.id,
					);
					const products = await productsResponse.json();
					return {
						...category,
						products,
					};
				}),
			);
			setCategories(categoriesWithProducts);
		};
		fetchData();
	}, [setCategories]);

	return (
		<>
			<Header />
			<AdminPanel />
			<div className="container-fluid py-4">
				<div className="row g-4">
					<div className="col-lg-8">
						<Products />
					</div>
					<div className="col-lg-4">
						<Cart />
					</div>
				</div>
			</div>
		</>
	);
}

export default function App() {
	return (
		<StoreProvider>
			<AppContent />
		</StoreProvider>
	);
}

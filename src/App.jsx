import { useEffect, useState } from 'react';

import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';
import ToastContainer from './components/ToastContainer';

import { StoreProvider, useStore } from './context/StoreContext';
import AdminPanel from './components/AdminPanel';
import { fetchCategoriesWithProducts } from './services/api';

function AppContent() {
	const { setCategories } = useStore();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchCategoriesWithProducts()
			.then(setCategories)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [setCategories]);

	return (
		<>
			<Header />
			<AdminPanel />
			<ToastContainer />
			<div className="container-fluid py-4">
				<div className="row g-4">
					<div className="col-lg-8">
						{loading && (
							<div className="d-flex justify-content-center py-5">
								<div className="spinner-border text-primary" role="status">
									<span className="visually-hidden">Cargando...</span>
								</div>
							</div>
						)}
						{error && (
							<div className="alert alert-danger" role="alert">
								{error}
							</div>
						)}
						{!loading && !error && <Products />}
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

import { useEffect } from 'react';

import Header from './components/Header';
// import Products from './components/Products'
// import Cart from './components/Cart'

import { StoreProvider, useStore } from './context/StoreContext';

function AppContent() {
	const { setCategories } = useStore();
	//useEffect()

	return (
		<>
			<Header />
			<div className="container-fluid py-4">
				<div className="row g-4">
					<div className="col-lg-8">{/* <Products /> */}</div>
					<div className="col-lg-4">{/* <Crt /> */}</div>
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

import { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext();
export function StoreProvider({ children }) {
	const [categories, setCategories] = useState([]);
	const [cart, setCart] = useState([]);
	const [adminLogged, setAdminLogged] = useState(false);
	const [toasts, setToasts] = useState([]);
	const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

	useEffect(() => {
		document.documentElement.setAttribute('data-bs-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	function toggleTheme() {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	}

	function addToCart(productId) {
		let updatedProduct = null;

		const updatedCategories = categories.map((category) => ({
			...category,
			products: category.products.map((product) => {
				if (product.id === productId && product.stock > 0) {
					updatedProduct = { ...product, stock: product.stock - 1 };
					return updatedProduct;
				}
				return product;
			}),
		}));

		if (!updatedProduct) return;

		const existingItem = cart.find((item) => item.product.id === productId);
		const updatedCart = existingItem
			? cart.map((item) =>
					item.product.id === productId
						? { ...item, product: updatedProduct, quantity: item.quantity + 1 }
						: item,
				)
			: [...cart, { product: updatedProduct, quantity: 1 }];

		setCategories(updatedCategories);
		setCart(updatedCart);
	}

	function removeFromCart(productId) {
		const item = cart.find((item) => item.product.id === productId);
		if (!item) return;

		const updatedProduct = { ...item.product, stock: item.product.stock + 1 };

		const updatedCart =
			item.quantity <= 1
				? cart.filter((i) => i.product.id !== productId)
				: cart.map((i) =>
						i.product.id === productId
							? { ...i, product: updatedProduct, quantity: i.quantity - 1 }
							: i,
					);

		const updatedCategories = categories.map((category) => ({
			...category,
			products: category.products.map((product) =>
				product.id === productId ? updatedProduct : product,
			),
		}));

		setCategories(updatedCategories);
		setCart(updatedCart);
	}

	function showToast(message, type = 'success') {
		const id = Date.now();
		const toast = {
			id,
			message,
			type,
		};

		setToasts((prev) => [...prev, toast]);
		setTimeout(() => {
			setToasts((prev) => {
				return prev.filter((toast) => {
					return toast.id !== id;
				});
			});
		}, 3000);
	}

	function clearCart() {
		if (cart.length === 0) return;

		const updatedCategories = categories.map((category) => ({
			...category,
			products: category.products.map((product) => {
				const cartItem = cart.find((item) => item.product.id === product.id);
				return cartItem
					? { ...product, stock: product.stock + cartItem.quantity }
					: product;
			}),
		}));

		setCategories(updatedCategories);
		setCart([]);
		showToast('Carrito vaciado', 'warning');
	}

	function checkout() {
		if (cart.length === 0) {
			showToast('El carrito está vacío', 'danger');
		} else {
			setCart([]);
			showToast('Pedido realizado correctamente');
		}
	}

	return (
		<StoreContext.Provider
			value={{
				categories,
				setCategories,
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				adminLogged,
				setAdminLogged,
				toasts,
				showToast,
				checkout,
				theme,
				toggleTheme,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
}

export function useStore() {
	return useContext(StoreContext);
}

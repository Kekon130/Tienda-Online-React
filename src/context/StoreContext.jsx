import { createContext, useContext, useState } from 'react';

const StoreContext = createContext();
export function StoreProvider({ children }) {
	const [categories, setCategories] = useState([]);
	const [cart, setCart] = useState([]);
	const [adminLogged, setAdminLogged] = useState(false);
	const [toasts, setToasts] = useState([]);

	function addToCart(productId) {
		const updatedCategories = [...categories];
		let selectedProduct = null;
		for (let category of updatedCategories) {
			for (let product of category.products) {
				if (product.id === productId) {
					if (product.stock > 0) {
						product.stock--;
						selectedProduct = product;
						break;
					}
				}
			}
			if (selectedProduct) break;
		}

		if (selectedProduct) {
			const updatedCart = [...cart];

			const item = updatedCart.find((item) => {
				return item.product.id === productId;
			});

			if (item) {
				item.quantity++;
			} else {
				updatedCart.push({
					product: selectedProduct,
					quantity: 1,
				});
			}

			setCategories(updatedCategories);
			setCart(updatedCart);
		}
	}

	function removeFromCart(productId) {
		const updatedCart = [...cart];
		const item = updatedCart.find((item) => {
			return item.product.id === productId;
		});

		if (item) {
			item.product.stock++;
			item.quantity--;
			if (item.quantity <= 0) {
				const index = updatedCart.indexOf(item);
				updatedCart.splice(index, 1);
			}

			const updatedCategories = [...categories];
			let selectedProduct = null;
			for (let category of updatedCategories) {
				category.products = category.products.map((product) => {
					return product.id === productId ? item.product : product;
				});
			}

			setCategories(updatedCategories);
			setCart(updatedCart);
		}
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
					return toast.id != id;
				});
			});
		}, 3000);
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
				adminLogged,
				setAdminLogged,
				toasts,
				showToast,
				checkout,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
}

export function useStore() {
	return useContext(StoreContext);
}

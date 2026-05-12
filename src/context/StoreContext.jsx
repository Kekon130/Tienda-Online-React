import { createContext, useContext, useState } from 'react';

const StoreContext = createContext();
export function StoreProvider({ children }) {
	const [categories, setCategories] = useState([]);
	const [cart, setCart] = useState([]);
	const [adminLogged, setAdminLogged] = useState(false);

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
				item.product.id === productId;
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
			item.product.id === productId;
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
			}}
		>
			{children}
		</StoreContext.Provider>
	);
}

export function useStore() {
	return useContext(StoreContext);
}

import { useStore } from '../context/StoreContext';
import ItemCard from './ItemCard';

export default function Cart() {
	const { cart, addToCart, removeFromCart, clearCart, checkout } = useStore();

	const total = cart.reduce((sum, item) => {
		return sum + item.product.price * item.quantity;
	}, 0);

	return (
		<div
			className="card shadow-sm position-sticky d-flex flex-column"
			style={{ top: '1rem', maxHeight: 'calc(100vh - 2rem)' }}
		>
				<div className="card-header border-bottom bg-body">
					<h5 className="fw-bold mb-0">Carrito</h5>
					<small className="text-muted">Productos seleccionados</small>
				</div>
				<div className="card-body d-flex flex-column overflow-hidden">
					{cart.length === 0 && (
						<div className="text-center py-5">
							<i className="bi bi-cart-x display-1 text-secondary"></i>
							<h4 className="mt-3">El carrito está vacío</h4>
							<p className="text-muted">Agrega productos para comenzar tu pedido</p>
						</div>
					)}
					<div className="flex-grow-1 overflow-auto">
						{cart.map((item) => (
							<ItemCard key={item.product.id} item={item} />
						))}
					</div>
					<div className="border-top pt-3 mt-3 flex-shrink-0">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h5 className="mb-0">Total</h5>
							<h4 className="text-success mb-0">{total.toFixed(2)}€</h4>
						</div>
						<button className="btn btn-success w-100 mb-2" onClick={checkout}>
							<i className="bi bi-bag-check me-2"></i>
							Realizar Pedido
						</button>
						<button
							className="btn btn-outline-danger w-100"
							onClick={clearCart}
							disabled={cart.length === 0}
						>
							<i className="bi bi-trash me-2"></i>
							Vaciar carrito
						</button>
					</div>
				</div>
			</div>
	);
}

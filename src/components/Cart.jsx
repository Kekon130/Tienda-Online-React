import { useStore } from '../context/StoreContext';
import ItemCard from './ItemCard';

export default function Cart() {
	const { cart, addToCart, removeFromCart, checkout } = useStore();

	const total = cart.reduce((sum, item) => {
		return sum + item.product.price * item.quantity;
	}, 0);

	return (
		<>
			<div className="offcanvas offcanvas-end" tabIndex="-1" id="cartOffcanvas">
				<div className="offcanvas-header border-bottom">
					<div>
						<h5 className="offcanvas-title fw-bold">Carrito</h5>
						<small className="text-muted">Productos seleccionados</small>
					</div>
					<button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
				</div>
				<div className="offcanvas-body d-flex flex-column">
					{cart.length === 0 && (
						<div className="text-center py-5">
							<i className="bi bi-cart-x display-1 text-secondary"></i>
							<h4 className="mt-3">El carrito está vacío</h4>
							<p className="text-muted">Agrega productos para comenzar tu pedido</p>
						</div>
					)}
					<div className="flex-grow-1">
						{cart.map((item) => (
							<ItemCard key={item.product.id} item={item} />
						))}
					</div>
					<div className="border-top pt-3 mt-3">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<h5 className="mb-0">Total</h5>
							<h4 className="text-success mb-0">{total.toFixed(2)}€</h4>
						</div>
						<button className="btn btn-success w-100" onClick={checkout}>
							<i className="bi bi-bag-check me-2"></i>
							Realizar Pedido
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

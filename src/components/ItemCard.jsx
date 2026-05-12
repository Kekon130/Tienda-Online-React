import { useStore } from '../context/StoreContext';

export default function ItemCard({ item }) {
	const { addToCart, removeFromCart } = useStore();
	const itemTotal = item.product.price * item.quantity;

	return (
		<div className="card mb-3 shadow-sm border-0">
			<div className="card-body">
				<div className="d-flex gap-3">
					<img
						src={item.product.image}
						className="rounded border"
						width="90"
						height="90"
						style={{ objectFit: 'cover' }}
						alt={item.product.name}
					/>
					<div className="flex-grow-1 d-flex flex-column">
						<div className="mb-2">
							<h6 className="fw-bold mb-1">{item.product.name}</h6>
							<small className="text-muted">{item.product.code || item.product.id}</small>
						</div>
						<p className="mb-1">
							Cantidad:
							<span className="fw-bold ms-1">{item.quantity}</span>
						</p>
						<h6 className="text-success fw-bold mb-3">{itemTotal.toFixed(2)}€</h6>
						<div className="d-flex gap-2 mt-auto">
							<button
								className="btn btn-outline-danger btn-sm"
								onClick={() => removeFromCart(item.product.id)}
							>
								<i className="bi bi-dash-lg"></i>
							</button>
							<button
								className="btn btn-outline-primary btn-sm"
								disabled={item.product.stock <= 0}
								onClick={() => addToCart(item.product.id)}
							>
								<i className="bi bi-plus-lg"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
	const { addToCart } = useStore();
	const outOfStock = product.stock <= 0;

	return (
		<div className="col-sm-6 col-xl-4">
			<div className={`card h-100 shadow-sm ${outOfStock ? 'opacity-50' : ''}`}>
				<div className="product-image-container">
					<img
						src={product.image}
						className="card-img-top product-image"
						alt={product.name}
						style={{
							height: '240px',
							objectFit: 'cover',
						}}
					/>
				</div>
				<div className="card-body d-flex flex-column">
					<div className="mb-2">
						<h5 className="card-title fw-bold">{product.name}</h5>
						<p className="card-text text-secondary">{product.description}</p>
					</div>
					<div className="mt-auto">
						<p className="small text-muted mb-2">Código: {product.code || product.id}</p>
						<h5 className="text-success fw-bold mb-3">{product.price.toFixed(2)}€</h5>
						<div className="mb-3">
							{outOfStock ? (
								<span className="badge bg-danger">Sin stock</span>
							) : (
								<span className="badge bg-primary">Stock: {product.stock}</span>
							)}
						</div>
						<button
							className={`btn ${outOfStock ? 'btn-secondary' : 'btn-primary'} w-100`}
							disabled={outOfStock}
							onClick={() => addToCart(product.id)}
						>
							<i className="bi bi-cart-plus me-2"></i>
							{outOfStock ? 'Producto agotado' : 'Agregar a la cesta'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

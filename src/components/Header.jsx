import { useStore } from '../context/StoreContext';

export default function Header() {
	const { cart } = useStore();
	const totalItems = cart.reduce((sum, item) => {
		return sum + item.quantity;
	}, 0);

	return (
		<nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
			<div className="container-fluid">
				{/* Logo */}
				<a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#">
					<i className="bi bi-shop fs-3 text-primary"></i>
					<div className="d-flex flex-column">
						<span>Tienda Online</span>
						<small className="text-muted fw-normal">React + Bootstrap</small>
					</div>
				</a>
				{/* Actions */}
				<div className="d-flex align-items-center gap-2">
					{/* Cart Button */}
					<button
						className="btn btn-outline-primary position-relative"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#cartOffcanvas"
					>
						<i className="bi bi-cart3"></i>

						<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
							{totalItems}
						</span>
					</button>
					{/* Admin */}
					<button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#adminModal">
						<i className="bi bi-shield-lock"></i>
					</button>
				</div>
			</div>
		</nav>
	);
}

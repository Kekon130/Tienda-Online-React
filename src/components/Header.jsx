import { useStore } from '../context/StoreContext';

export default function Header() {
	const { cart, theme, toggleTheme } = useStore();
	const totalItems = cart.reduce((sum, item) => {
		return sum + item.quantity;
	}, 0);

	return (
		<nav className="navbar navbar-expand-lg bg-body border-bottom sticky-top shadow-sm">
			<div className="container-fluid">
				<a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#">
					<i className="bi bi-shop fs-3 text-primary"></i>
					<div className="d-flex flex-column">
						<span>Tienda Online</span>
						<small className="text-muted fw-normal">React + Bootstrap</small>
					</div>
				</a>
				<div className="d-flex align-items-center gap-2">
					<span className="btn btn-outline-primary position-relative" role="status">
						<i className="bi bi-cart3"></i>
						<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
							{totalItems}
						</span>
					</span>
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={toggleTheme}
						title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
					>
						<i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
					</button>
					<button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#adminModal">
						<i className="bi bi-shield-lock"></i>
					</button>
				</div>
			</div>
		</nav>
	);
}

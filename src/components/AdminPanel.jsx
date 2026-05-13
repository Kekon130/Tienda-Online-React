import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function AdminPanel() {
	const { categories, setCategories, adminLogged, setAdminLogged, showToast } = useStore();
	const [password, setPassword] = useState('');
	const [category, setCategory] = useState({
		id: '',
		name: '',
	});
	const [product, setProduct] = useState({
		id: '',
		name: '',
		description: '',
		price: '',
		stock: '',
		image: '',
		categoryId: '',
	});

	function login() {
		if (password !== '123456') {
			alert('Contraseña incorrecta');
		} else {
			setAdminLogged(true);
		}
	}

	function createCategory() {
		const exists = categories.some((c) => c.id === category.id);
		if (exists) {
			showToast('La categoría ya existe', 'danger');
		} else {
			setCategories([
				...categories,
				{
					...category,
					products: [],
				},
			]);

			setCategory({
				id: '',
				name: '',
			});
			showToast('Categoria creada correctamente');
		}
	}

	function createProduct() {
		const exists = categories.some((category) =>
			category.products.some((p) => p.id === product.id),
		);

		if (exists) {
			showToast('El producto ya existe', 'danger');
		} else {
			const updatedCategories = categories.map((category) => {
				if (category.id !== product.categoryId) {
					return category;
				} else {
					return {
						...category,
						products: [
							...category.products,
							{
								id: product.id,
								name: product.name,
								description: product.description,
								price: Number(product.price),
								stock: Number(product.stock),
								image: product.image,
							},
						],
					};
				}
			});

			setCategories(updatedCategories);

			setProduct({
				id: '',
				name: '',
				description: '',
				price: '',
				stock: '',
				image: '',
				categoryId: '',
			});
		}
	}

	return (
		<div className="modal fade" id="adminModal" tabIndex="-1">
			<div className="modal-dialog modal-xl modal-dialog-scrollable">
				<div className="modal-content">
					{/* Header */}
					<div className="modal-header">
						<h4 className="modal-title fw-bold">Panel Administrador</h4>

						<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
					</div>

					{/* Body */}
					<div className="modal-body">
						{!adminLogged && (
							<div className="row justify-content-center">
								<div className="col-md-6">
									<div className="card shadow-sm">
										<div className="card-body">
											<h5 className="mb-4">Acceso administrador</h5>

											<div className="mb-3">
												<label className="form-label">Contraseña</label>

												<input
													type="password"
													className="form-control"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</div>

											<button className="btn btn-primary w-100" onClick={login}>
												Entrar
											</button>
										</div>
									</div>
								</div>
							</div>
						)}

						{adminLogged && (
							<>
								{/* Tabs */}
								<ul className="nav nav-tabs mb-4">
									<li className="nav-item">
										<button
											className="nav-link active"
											data-bs-toggle="tab"
											data-bs-target="#categories-tab"
										>
											Categorías
										</button>
									</li>

									<li className="nav-item">
										<button
											className="nav-link"
											data-bs-toggle="tab"
											data-bs-target="#products-tab"
										>
											Productos
										</button>
									</li>
								</ul>

								{/* Content */}
								<div className="tab-content">
									{/* Categories */}
									<div className="tab-pane fade show active" id="categories-tab">
										<div className="card shadow-sm">
											<div className="card-body">
												<h5 className="mb-4">Nueva categoría</h5>

												<div className="row g-3">
													<div className="col-md-6">
														<input
															type="text"
															className="form-control"
															placeholder="ID"
															value={category.id}
															onChange={(e) =>
																setCategory({
																	...category,
																	id: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-md-6">
														<input
															type="text"
															className="form-control"
															placeholder="Nombre"
															value={category.name}
															onChange={(e) =>
																setCategory({
																	...category,
																	name: e.target.value,
																})
															}
														/>
													</div>
												</div>

												<button className="btn btn-primary mt-4" onClick={createCategory}>
													Crear categoría
												</button>
											</div>
										</div>
									</div>

									{/* Products */}
									<div className="tab-pane fade" id="products-tab">
										<div className="card shadow-sm">
											<div className="card-body">
												<h5 className="mb-4">Nuevo producto</h5>

												<div className="row g-3">
													<div className="col-md-6">
														<input
															type="text"
															className="form-control"
															placeholder="ID"
															value={product.id}
															onChange={(e) =>
																setProduct({
																	...product,
																	id: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-md-6">
														<input
															type="text"
															className="form-control"
															placeholder="Nombre"
															value={product.name}
															onChange={(e) =>
																setProduct({
																	...product,
																	name: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-12">
														<textarea
															className="form-control"
															placeholder="Descripción"
															value={product.description}
															onChange={(e) =>
																setProduct({
																	...product,
																	description: e.target.value,
																})
															}
														></textarea>
													</div>

													<div className="col-md-4">
														<input
															type="number"
															className="form-control"
															placeholder="Precio"
															value={product.price}
															onChange={(e) =>
																setProduct({
																	...product,
																	price: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-md-4">
														<input
															type="number"
															className="form-control"
															placeholder="Stock"
															value={product.stock}
															onChange={(e) =>
																setProduct({
																	...product,
																	stock: e.target.value,
																})
															}
														/>
													</div>

													<div className="col-md-4">
														<select
															className="form-select"
															value={product.categoryId}
															onChange={(e) =>
																setProduct({
																	...product,
																	categoryId: e.target.value,
																})
															}
														>
															<option value="">Selecciona categoría</option>

															{categories.map((category) => (
																<option key={category.id} value={category.id}>
																	{category.name}
																</option>
															))}
														</select>
													</div>

													<div className="col-12">
														<input
															type="text"
															className="form-control"
															placeholder="URL imagen"
															value={product.image}
															onChange={(e) =>
																setProduct({
																	...product,
																	image: e.target.value,
																})
															}
														/>
													</div>
												</div>

												<button className="btn btn-success mt-4" onClick={createProduct}>
													Crear producto
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';

export default function Products() {
	const { categories } = useStore();

	return (
		<div className="accordion" id="categoriesAccordion">
			{categories.map((category, index) => (
				<div className="accordion-item mb-3" key={category.id}>
					<h2 className="accordion-header">
						<button
							className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target={`#cat-${category.id}`}
						>
							{category.name}
						</button>
					</h2>
					<div
						id={`cat-${category.id}`}
						className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
					>
						<div className="accordion-body">
							<div className="row g-4">
								{category.products.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

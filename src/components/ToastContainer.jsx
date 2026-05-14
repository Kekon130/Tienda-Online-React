import { useStore } from '../context/StoreContext';

export default function ToastContainer() {
	const { toasts } = useStore();

	return (
		<div className="toast-container position-fixed top-0 start-50 translate-middle-x pt-3" style={{ zIndex: 1100 }}>
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={`toast show text-bg-${toast.type} border-0 mb-2`}
					style={{ minWidth: '400px' }}
				>
					<div className="toast-body fs-5 fw-semibold text-center py-3">
						{toast.message}
					</div>
				</div>
			))}
		</div>
	);
}

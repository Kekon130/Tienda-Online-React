import { useStore } from '../context/StoreContext';

export default function ToastContainer() {
	const { toasts } = useStore();

	return (
		<div className="toast-container position-fixed bottom-0 end-0 p-3">
			{toasts.map((toast) => (
				<div key={toast.id} className={`toast show text-bg-${toast.type} border-0 mb-2`}>
					<div className="d-flex">
						<div className="toast-body">{toast.message}</div>
					</div>
				</div>
			))}
		</div>
	);
}

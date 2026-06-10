import { useEffect, useRef, useState } from 'react';

const CYCLE_MS = 800;

export default function ProductImage({ images = [], alt }) {
	const sources = images.length > 0 ? images : [''];
	const [index, setIndex] = useState(0);
	const intervalRef = useRef(null);

	useEffect(() => () => clearInterval(intervalRef.current), []);

	function startCycle() {
		if (sources.length <= 1) return;
		intervalRef.current = setInterval(() => {
			setIndex((prev) => (prev + 1) % sources.length);
		}, CYCLE_MS);
	}

	function stopCycle() {
		clearInterval(intervalRef.current);
		intervalRef.current = null;
		setIndex(0);
	}

	return (
		<img
			src={sources[index]}
			className="card-img-top product-image"
			alt={alt}
			style={{ height: '240px', objectFit: 'cover' }}
			onMouseEnter={startCycle}
			onMouseLeave={stopCycle}
		/>
	);
}

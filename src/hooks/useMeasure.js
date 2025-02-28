import { useCallback, useState } from 'react';

const useMeasure = () => {
	const [size, setSize] = useState({ width: 0, height: 0 });
	const ref = useCallback((node) => {
		if (!node) {
			return;
		}

		const resizeObserver = new ResizeObserver(([entry]) => {
			setSize({
				width: entry.contentRect.width,
				height: entry.contentRect.height,
			});
		});

		resizeObserver.observe(node);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return [ref, size];
};

export default useMeasure;

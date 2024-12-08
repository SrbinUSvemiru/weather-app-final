import { useEffect, useState } from 'react';

export const useInView = ({ target, options = {} }) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	console.log(options);
	useEffect(() => {
		if (!target) {
			return;
		}
		const callback = (entries) => {
			console.log(entries);
			setIsIntersecting(entries?.[0]?.isIntersecting || false);
		};

		const observer = new IntersectionObserver(callback, options);

		observer?.observe(target);

		return () => {
			observer?.disconnect();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target, options?.root, options?.rootMargin, options?.threshold]);

	return isIntersecting;
};

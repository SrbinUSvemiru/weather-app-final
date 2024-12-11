import { findIndex, map, set } from 'lodash';
import { useState } from 'react';

import { getAnimation } from '../utils/animations';

export const useAnimation = ({ api, animations }) => {
	const [animationsQueue, setAnimationQueue] = useState([]);

	const idx = findIndex(animationsQueue, (el) => el?.state === 'INITIAL');
	if (idx > -1) {
		const animationFunc = getAnimation()?.[animationsQueue?.[idx]?.animation];
		animationFunc({
			api,
			onRest: () =>
				setAnimationQueue(
					map(animationsQueue, (el, index) => ({ ...el, state: index === idx ? 'RESOLVED' : el?.state })),
				),
		});
	}

	console.log(animationsQueue);

	const triggerAnimation = () => {
		setAnimationQueue(() => {
			const state = [];
			for (let i = 0; i < animations?.length; i++) {
				const obj = {};
				set(obj, 'id', i);
				set(obj, 'state', 'INITIAL');
				set(obj, 'animation', animations[i]);
				state.push(obj);
			}
			return state;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};
	return triggerAnimation;
};

import { Box } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { useSpringRef, useTransition } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { getBackgroundUrls } from '../../utils/utils';

const AnimatedBox = animated(Box);

export const Background = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const { theme } = useContext(AppContext);
	const backgrounds = useMemo(() => getBackgroundUrls()[theme?.mode], [theme?.mode]);

	const springApi = useSpringRef();

	const transitions = useTransition(activeIndex, {
		ref: springApi,
		from: {
			opacity: 0,
			transform: 'scale(1)',
		},
		enter: {
			opacity: 1,
			transform: !open ? 'scale(1.2)' : 'scale(1)',
		},
		leave: {
			opacity: 0,
			transform: 'scale(1)',
		},

		config: {
			duration: 1000,
		},

		onRest: (_springs, _ctrl, item) => {
			if (activeIndex === item) {
				setActiveIndex(activeIndex === backgrounds.length - 1 ? 0 : activeIndex + 1);
			}
		},
	});
	useLayoutEffect(() => {
		springApi.start();

		const interval = setInterval(() => {
			springApi.start();
		}, 10000); // Change every 20 seconds

		return () => clearInterval(interval); // Cleanup interval on component unmount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backgrounds]);

	return transitions((style, item) => (
		<AnimatedBox
			style={{ ...style }}
			sx={{
				position: 'absolute',
				backgroundImage: `url(${backgrounds[item]})`,
				width: '100vw',
				height: '100vh',
				margin: '0 auto',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				top: 0,
			}}
		/>
	));
};

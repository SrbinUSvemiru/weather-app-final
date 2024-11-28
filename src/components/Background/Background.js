import { Box } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { useTransition } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { getBackgroundUrls } from '../../utils/utils';

const AnimatedBox = animated(Box);

export const Background = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const { theme } = useContext(AppContext);
	const backgrounds = useMemo(() => getBackgroundUrls()[theme?.mode], [theme?.mode]);

	const transitions = useTransition(activeIndex, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 0,
		},

		config: {
			duration: 1000,
		},
	});
	useLayoutEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
		}, 40000); // Change every 20 seconds

		return () => clearInterval(interval); // Cleanup interval on component unmount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme?.mode]);

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

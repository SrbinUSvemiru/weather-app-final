import { Box } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { useSpring, useSpringRef, useTransition } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { getBackgroundUrls } from '../../utils/utils';

const AnimatedBox = animated(Box);

const Background = ({ open }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const { theme } = useContext(AppContext);

	const backgrounds = useMemo(() => getBackgroundUrls()[theme?.mode], [theme?.mode]);

	const springApi = useSpringRef();

	const transitions = useTransition(activeIndex, {
		ref: springApi,
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
			duration: 1000, // Adjust this to control zoom speed
		},

		onRest: (_springs, _ctrl, item) => {
			if (activeIndex === item) {
				setActiveIndex(activeIndex === backgrounds.length - 1 ? 0 : activeIndex + 1);
			}
		},
	});

	const spring = useSpring({
		from: { scale: !open ? 1 : 1.5 },
		to: { scale: open ? 1 : 1.5 },
	});

	useLayoutEffect(() => {
		springApi.start();

		const interval = setInterval(() => {
			springApi.start();
		}, 30000);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backgrounds]);

	return transitions((style, item) => (
		<AnimatedBox
			style={{ ...style, ...spring }}
			sx={{
				position: 'absolute',
				top: '60px',
				left: 0,
				borderRadius: '1rem 1rem 0rem 0rem',
				right: 0,
				backgroundImage: `url(${backgrounds[item]})`,
				width: '50%',
				height: '100%',
				margin: '0 auto',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		/>
	));
};

export default Background;

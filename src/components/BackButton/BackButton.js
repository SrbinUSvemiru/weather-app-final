import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { Button } from '@mui/material';
import { animated } from '@react-spring/web';
import { useLayoutEffect } from 'react';
import { useSpring, useSpringRef } from 'react-spring';

const AnimatedButton = animated(Button);

export const BackButton = ({ onClick, inView }) => {
	const springRef = useSpringRef();

	const spring = useSpring({
		from: { scale: 0, opacity: 0 },
		immediate: true,
		ref: springRef,
	});

	useLayoutEffect(() => {
		springRef.start({
			to: {
				immediate: false,
				scale: inView ? 1 : 0,
				opacity: inView ? 1 : 0,
				x: 0,
			},
		});
	}, [springRef, inView]);

	return (
		<AnimatedButton
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			style={{ ...spring, transform: 'translateY(-50%)' }}
			sx={{
				position: 'fixed',
				bottom: '10%',
				left: '-10px',
				backgroundColor: 'background.default',
				padding: '0.5rem',
				zIndex: 100000,
				display: 'flex',
				borderRadius: '50%',
				boxShadow: '0px 5px 10px -4px rgba(0, 0, 0, 0.3)',
				minWidth: '40px',
				height: '40px',
				justifyContent: 'center',
				alignItems: 'center',
				color: 'text.primary',
			}}
		>
			<ArrowBackSharpIcon sx={{ display: 'flex' }} />
		</AnimatedButton>
	);
};

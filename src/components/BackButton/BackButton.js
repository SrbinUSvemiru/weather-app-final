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
		ref: springRef,
	});

	useLayoutEffect(() => {
		springRef.start({
			to: {
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
				backgroundColor: 'secondary.light',
				padding: '0.5rem',
				zIndex: 100000,
				display: 'flex',
				borderRadius: '50%',
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

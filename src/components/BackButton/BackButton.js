import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { Button } from '@mui/material';
import { animated } from '@react-spring/web';
import { useSpring } from 'react-spring';

const AnimatedButton = animated(Button);

export const BackButton = ({ onClick, inView }) => {
	const spring = useSpring({
		from: { scale: !inView ? 1 : 0, opacity: !inView ? 1 : 0 },
		to: { scale: inView ? 1 : 0, opacity: inView ? 1 : 0 },
		delay: !inView ? 0 : 300,
	});

	return (
		<AnimatedButton
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			style={{ ...spring, transform: 'translateY(-50%)' }}
			sx={{
				backgroundColor: 'background.shadeOne',
				padding: '0.5rem',
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

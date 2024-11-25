import { Grid2 as Grid, Typography } from '@mui/material';
import React from 'react';
import { useSpring } from 'react-spring';

import { useBreakpoint } from '../../hooks/useBreakpoint';
import { trans } from '../../utils/utils';
import { Window, Wrapper } from './styled-components';

const TemperatureWindow = ({ currentCity, activeWrapper: wrapper, animation, setActiveWrapper }) => {
	const { isLg, isXl } = useBreakpoint();

	const activeWrapper = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: wrapper === 'temperature' ? 0.7 : 0,
			scale: wrapper === 'temperature' ? '100%' : '0%',
			backgroundImage: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
		},
	});

	return (
		<Window
			key={1}
			onClick={() => setActiveWrapper('temperature')}
			style={{ ...animation, transform: animation?.xys.to(trans) }}
		>
			<Wrapper style={activeWrapper} />
			<Grid container spacing={1} sx={{ zIndex: 5 }}>
				<Grid size={{ xs: 6 }}>
					<div id="icon-container">
						<img
							alt="icon"
							id="main-svg"
							src={`../icons/${currentCity?.current?.weather?.[0]?.icon}.svg`}
						/>
					</div>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
					<Typography sx={{ fontWeight: 600, zIndex: 3 }} variant={isLg || isXl ? 'h1' : 'h2'}>
						{Math.round((currentCity?.current?.main?.temp * 2) / 2) || ''}
					</Typography>
					<Typography sx={{ fontWeight: 600 }} variant={isLg ? 'h2' : 'h3'}>
						&#176;C
					</Typography>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography sx={{ fontWeight: 600, zIndex: 3 }} variant="h6">
						{currentCity?.current?.weather?.[0]?.description || ''}
					</Typography>
				</Grid>
				<Grid size={{ xs: 6 }}>
					<Typography sx={{ color: 'text.secondary', zIndex: 3 }} variant="h6">
						Feels like {Math.round(currentCity?.current?.main?.feels_like * 10) / 10 || ''}
						&#176;C
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
};

export default TemperatureWindow;

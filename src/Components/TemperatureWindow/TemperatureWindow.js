import React, { useState, useEffect } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { Window, Wrapper } from './styled-components';
import { useSpring } from 'react-spring';
import { trans } from '../../Utils/utils';
import { Grid2 as Grid, Typography } from '@mui/material';
import { useBreakpoint } from '../../hooks/useBreakpoint';

function TemperatureWindow({ currentCity, activeWrapper: wrapper, animation, setActiveWrapper }) {
	const { isMd, isLg, isXl } = useBreakpoint();

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
			style={{ ...animation, transform: animation?.xys.to(trans) }}
			onClick={() => setActiveWrapper('temperature')}
			key={1}
		>
			<Wrapper style={activeWrapper} />
			<Grid container sx={{ zIndex: 5 }} spacing={1}>
				<Grid size={{ xs: 6 }}>
					<div id="icon-container">
						<img src={`../icons/${currentCity?.current?.weather?.[0]?.icon}.svg`} id="main-svg" />
					</div>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
					<Typography variant={isLg || isXl ? 'h1' : 'h2'} sx={{ fontWeight: 600, zIndex: 3 }}>
						{Math.round((currentCity?.current?.main?.temp * 2) / 2)}
					</Typography>
					<Typography variant={isLg ? 'h2' : 'h3'} sx={{ fontWeight: 600 }}>
						&#176;C
					</Typography>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography variant="h6" sx={{ fontWeight: 600, zIndex: 3 }}>
						{currentCity?.current?.weather?.[0]?.description}
					</Typography>
				</Grid>
				<Grid size={{ xs: 6 }}>
					<Typography variant="h6" sx={{ color: 'text.secondary', zIndex: 3 }}>
						Feels like {Math.round(currentCity?.current?.main?.feels_like * 10) / 10}
						&#176;C
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
}

export default TemperatureWindow;

import { Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useSpring } from 'react-spring';

import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Window, Wrapper } from '../../styled-components';
import { trans } from '../../utils/utils';

const TemperatureWindow = ({ selectedCity, activeWrapper: wrapper, animation, setActiveWrapper }) => {
	const { isLg, isXl } = useBreakpoint();

	const theme = useTheme();

	const activeWrapper = useSpring({
		config: { mass: 1, tension: 500, friction: 50 },
		from: { opacity: 0, transform: 'translateY(-50%) scale(0)' },
		to: [
			{
				opacity: wrapper === 'temperature' ? 1 : 0,
				transform: wrapper === 'temperature' ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(0)',
				backgroundImage: `linear-gradient(120deg, ${theme?.palette?.wrapper?.temperature?.light} 0%, ${theme?.palette?.wrapper?.temperature?.dark} 100%)`,
			},
			{ opacity: 0 },
		],
	});

	return (
		<Window
			bordercolor={wrapper === 'temperature' ? theme?.palette?.wrapper?.temperature?.light : ''}
			key={1}
			onClick={() => setActiveWrapper('temperature')}
			style={{ ...animation, transform: animation?.xys.to(trans) }}
		>
			<Wrapper style={activeWrapper} />

			<Grid container spacing={1}>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItmes: 'center', justifyContent: 'center' }}>
					<Icon
						sx={{
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItmes: 'center',
							justifyContent: 'center',
							'& > img': { width: '150px' },
						}}
					>
						<img
							alt="icon"
							id="main-svg"
							src={`../icons/${selectedCity?.current?.weather?.[0]?.icon}.svg`}
						/>
					</Icon>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
					<Typography sx={{ fontWeight: 600, zIndex: 3 }} variant={isLg || isXl ? 'h1' : 'h2'}>
						{Math.round((selectedCity?.current?.main?.temp * 2) / 2) || ''}
					</Typography>
					<Typography sx={{ fontWeight: 600 }} variant={isLg ? 'h2' : 'h3'}>
						&#176;C
					</Typography>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography sx={{ fontWeight: 600, zIndex: 3 }} variant="h6">
						{selectedCity?.current?.weather?.[0]?.description || ''}
					</Typography>
				</Grid>
				<Grid size={{ xs: 6 }}>
					<Typography sx={{ color: 'text.secondary', zIndex: 3 }} variant="h6">
						Feels like {Math.round(selectedCity?.current?.main?.feels_like * 10) / 10 || ''}
						&#176;C
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
};

export default TemperatureWindow;

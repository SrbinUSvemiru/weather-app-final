import AirIcon from '@mui/icons-material/Air';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import OpacityIcon from '@mui/icons-material/Opacity';
import { Grid2 as Grid, Icon, Typography } from '@mui/material';
import React from 'react';
import { useSpring } from 'react-spring';

import { trans } from '../../utils/utils';
import { Window, Wrapper } from './styled-components';

const CurrentInfoWindow = ({ currentCity, pop, activeWrapper, setActiveWrapper, animation, colors }) => {
	const activeWrapperPop = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: activeWrapper === 'precipitation' ? 0.5 : 0,
			scale: activeWrapper === 'precipitation' ? '100%' : '0%',
			background: `linear-gradient(to right,${colors?.[0]} 0%,${colors?.[1]} 100%)`,
		},
	});

	const activeWrapperWind = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: activeWrapper === 'wind' ? 0.5 : 0,
			scale: activeWrapper === 'wind' ? '100%' : '0%',
			background: `linear-gradient(to right,${colors?.[0]} 0%,${colors?.[1]} 100%)`,
			zIndex: -1,
		},
	});

	const activeWrapperVisibility = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%', zIndex: -1 },
		to: {
			opacity: activeWrapper === 'humidity' ? 0.5 : 0,
			scale: activeWrapper === 'humidity' ? '100%' : '0%',
			zIndex: -1,
			background: `linear-gradient(to right,${colors?.[0]} 0%,${colors?.[1]} 100%)`,
		},
	});

	return (
		<Grid container spacing={{ xs: 1, sm: 2 }} sx={{ height: '100%' }}>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					onClick={() => setActiveWrapper('wind')}
					style={{ ...animation, transform: animation?.xys.to(trans) }}
				>
					<Wrapper style={activeWrapperWind} />

					<Icon sx={{ zIndex: 2, mb: '0.2rem', width: '30px', color: 'text.secondary' }}>
						<AirIcon />
					</Icon>
					<Typography fontWeight={600} variant="subtitle1" zIndex={2}>
						{Math.round(currentCity?.current?.wind?.speed * 3.5)}
						km/h
					</Typography>
				</Window>
			</Grid>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					onClick={() => setActiveWrapper('precipitation')}
					style={{ ...animation, transform: animation?.xys.to(trans) }}
					value="precipitation"
				>
					<Wrapper style={activeWrapperPop} />

					<Icon sx={{ zIndex: 2, mb: '0.2rem', width: '30px', color: 'text.secondary' }}>
						<BeachAccessIcon />
					</Icon>
					<Typography fontWeight={600} variant="subtitle1" zIndex={2}>
						{Math.round(pop) * 100}%
					</Typography>
				</Window>
			</Grid>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					onClick={() => setActiveWrapper('humidity')}
					style={{ ...animation, transform: animation?.xys.to(trans) }}
					value="humidity"
				>
					<Wrapper style={activeWrapperVisibility} />
					<Icon sx={{ zIndex: 2, mb: '0.2rem', width: '30px', color: 'text.secondary' }}>
						<OpacityIcon />
					</Icon>
					<Typography fontWeight={600} variant="subtitle1" zIndex={2}>
						{' '}
						{currentCity?.current?.main?.humidity}%
					</Typography>
				</Window>
			</Grid>
		</Grid>
	);
};

export default CurrentInfoWindow;

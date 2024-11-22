import React from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { Window, Wrapper, Row } from './styled-components';
import { useSpring } from 'react-spring';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import OpacityIcon from '@mui/icons-material/Opacity';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AirIcon from '@mui/icons-material/Air';
import { Icon, Typography, Grid2 as Grid } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { trans } from '../../Utils/utils';

function CurrentInfoWindow({ currentCity, pop, activeWrapper, setActiveWrapper, animation, colors }) {
	const { isXs, isSm } = useBreakpoint();

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
			<Grid size={12}>
				<Window
					style={{ ...animation, transform: animation?.xys.to(trans) }}
					onClick={() => setActiveWrapper('wind')}
				>
					<Wrapper style={activeWrapperWind} />

					<Icon sx={{ zIndex: 2, mb: '0.2rem', width: '30px', color: 'text.secondary' }}>
						<AirIcon />
					</Icon>
					<Typography variant="subtitle1" zIndex={2} fontWeight={600}>
						{Math.round(currentCity?.current?.wind?.speed * 3.5)}
						km/h
					</Typography>
				</Window>
			</Grid>
			<Grid size={12}>
				<Window
					style={{ ...animation, transform: animation?.xys.to(trans) }}
					onClick={() => setActiveWrapper('precipitation')}
					value="precipitation"
				>
					<Wrapper style={activeWrapperPop} />

					<Icon sx={{ zIndex: 2, mb: '0.2rem', width: '30px', color: 'text.secondary' }}>
						<BeachAccessIcon />
					</Icon>
					<Typography variant="subtitle1" zIndex={2} fontWeight={600}>
						{Math.round(pop) * 100}%
					</Typography>
				</Window>
			</Grid>
			<Grid size={12}>
				<Window
					style={{ ...animation, transform: animation?.xys.to(trans) }}
					onClick={() => setActiveWrapper('humidity')}
					value="humidity"
				>
					<Wrapper style={activeWrapperVisibility} />
					<Icon sx={{ zIndex: 2, mb: '0.2rem', width: '30px', color: 'text.secondary' }}>
						<OpacityIcon />
					</Icon>
					<Typography variant="subtitle1" zIndex={2} fontWeight={600}>
						{' '}
						{currentCity?.current?.main?.humidity}%
					</Typography>
				</Window>
			</Grid>
		</Grid>
	);
}

export default CurrentInfoWindow;

import AirIcon from '@mui/icons-material/Air';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import OpacityIcon from '@mui/icons-material/Opacity';
import { Grid2 as Grid, Icon, Typography } from '@mui/material';
import React from 'react';
import { useSpring } from 'react-spring';

import { Window, Wrapper } from '../../styled-components';
import { trans } from '../../utils/utils';

const CurrentInfoWindow = ({ selectedCity, pop, activeWrapper, setActiveWrapper, animation, colors }) => {
	const activeWrapperPop = useSpring({
		config: { mass: 1, tension: 500, friction: 50 },
		from: { opacity: 0, transform: 'translateY(-50%) scale(0)' },
		to: [
			{
				opacity: activeWrapper === 'precipitation' ? 1 : 0,
				transform:
					activeWrapper === 'precipitation' ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(0)',
				background: `linear-gradient(to right,${colors?.[0]} 0%,${colors?.[1]} 100%)`,
			},

			{ opacity: 0 },
		],
	});

	const activeWrapperWind = useSpring({
		config: { mass: 1, tension: 500, friction: 50 },
		from: { opacity: 0, transform: 'translateY(-50%) scale(0)' },
		to: [
			{
				opacity: activeWrapper === 'wind' ? 1 : 0,
				transform: activeWrapper === 'wind' ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(0)',
				background: `linear-gradient(to right, ${colors?.[0]} 0%, ${colors?.[1]} 100%)`,
			},

			{ opacity: 0 },
		],
	});

	const activeWrapperVisibility = useSpring({
		config: { mass: 1, tension: 500, friction: 50 },
		from: { opacity: 0, transform: 'translateY(-50%) scale(0)', zIndex: -1 },
		to: [
			{
				opacity: activeWrapper === 'humidity' ? 1 : 0,
				transform: activeWrapper === 'humidity' ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(0)',
				background: `linear-gradient(to right,${colors?.[0]} 0%,${colors?.[1]} 100%)`,
			},
			{ opacity: 0 },
		],
	});

	return (
		<Grid container spacing={{ xs: 1, sm: 2 }} sx={{ height: '100%' }}>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					bordercolor={activeWrapper === 'wind' ? colors?.[1] : ''}
					onClick={() => setActiveWrapper('wind')}
					style={{ ...animation, transform: animation?.xys.to(trans), flexDirection: 'column' }}
				>
					<Wrapper style={activeWrapperWind} />

					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							width: '30px',
							color: activeWrapper === 'wind' ? colors?.[1] : 'text.secondary',
						}}
					>
						<AirIcon />
					</Icon>
					<Typography fontWeight={600} variant="subtitle1" zIndex={2}>
						{Math.round(selectedCity?.current?.wind?.speed * 3.5)}
						km/h
					</Typography>
				</Window>
			</Grid>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					bordercolor={activeWrapper === 'precipitation' ? colors?.[1] : ''}
					onClick={() => setActiveWrapper('precipitation')}
					style={{ ...animation, transform: animation?.xys.to(trans), flexDirection: 'column' }}
					value="precipitation"
				>
					<Wrapper style={activeWrapperPop} />

					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							width: '30px',
							color: activeWrapper === 'precipitation' ? colors?.[1] : 'text.secondary',
						}}
					>
						<BeachAccessIcon />
					</Icon>
					<Typography fontWeight={600} variant="subtitle1" zIndex={2}>
						{Math.round(pop) * 100}%
					</Typography>
				</Window>
			</Grid>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					bordercolor={activeWrapper === 'humidity' ? colors?.[0] : ''}
					onClick={() => setActiveWrapper('humidity')}
					style={{ ...animation, transform: animation?.xys.to(trans), flexDirection: 'column' }}
					value="humidity"
				>
					<Wrapper style={activeWrapperVisibility} />
					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							width: '30px',
							color: activeWrapper === 'humidity' ? colors?.[0] : 'text.secondary',
						}}
					>
						<OpacityIcon />
					</Icon>
					<Typography fontWeight={600} variant="subtitle1" zIndex={2}>
						{' '}
						{selectedCity?.current?.main?.humidity}%
					</Typography>
				</Window>
			</Grid>
		</Grid>
	);
};

export default CurrentInfoWindow;
import AirIcon from '@mui/icons-material/Air';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import OpacityIcon from '@mui/icons-material/Opacity';
import { Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { useSpring } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { Window, Wrapper } from '../../styled-components';
import { getUnits, trans } from '../../utils/utils';

const CurrentInfoWindow = ({ selectedCity, pop, activeWrapper, setActiveWrapper, animation }) => {
	const theme = useTheme();
	console.log(selectedCity);
	const { settings } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	const activeWrapperPop = useSpring({
		config: { mass: 1, tension: 500, friction: 50 },
		from: { opacity: 0, transform: 'translateY(-50%) scale(0)' },
		to: [
			{
				opacity: activeWrapper === 'precipitation' ? 1 : 0,
				transform:
					activeWrapper === 'precipitation' ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(0)',
				background: `linear-gradient(to right, ${theme?.palette?.wrapper?.precipitation?.light} 0%, ${theme?.palette?.wrapper?.precipitation?.dark} 100%)`,
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
				background: `linear-gradient(to right, ${theme?.palette?.wrapper?.wind?.light} 0%, ${theme?.palette?.wrapper?.wind?.dark} 100%)`,
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
				background: `linear-gradient(to right, ${theme?.palette?.wrapper?.humidity?.light} 0%, ${theme?.palette?.wrapper?.humidity?.dark} 100%)`,
			},
			{ opacity: 0 },
		],
	});

	return (
		<Grid container spacing={{ xs: 1, sm: 2 }} sx={{ height: '100%' }}>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					bordercolor={activeWrapper === 'wind' ? theme?.palette?.wrapper?.wind?.light : ''}
					onClick={() => setActiveWrapper('wind')}
					style={{ ...animation, transform: animation?.xys.to(trans), flexDirection: 'column' }}
				>
					<Wrapper style={activeWrapperWind} />

					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							width: '30px',
							color: activeWrapper === 'wind' ? theme?.palette?.wrapper?.wind?.light : 'text.secondary',
						}}
					>
						<AirIcon />
					</Icon>
					<Typography fontWeight={600} variant="subtitle1" zIndex={2}>
						{selectedCity?.current?.wind_speed?.[units]?.large}
						{getUnits()?.speed?.[units]?.large}
					</Typography>
				</Window>
			</Grid>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					bordercolor={activeWrapper === 'precipitation' ? theme?.palette?.wrapper?.precipitation?.light : ''}
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
							color:
								activeWrapper === 'precipitation'
									? theme?.palette?.wrapper?.precipitation?.light
									: 'text.secondary',
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
					bordercolor={activeWrapper === 'humidity' ? theme?.palette?.wrapper?.humidity?.light : ''}
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
							color:
								activeWrapper === 'humidity'
									? theme?.palette?.wrapper?.humidity?.light
									: 'text.secondary',
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

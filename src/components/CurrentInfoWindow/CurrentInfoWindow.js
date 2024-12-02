import AirIcon from '@mui/icons-material/Air';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import OpacityIcon from '@mui/icons-material/Opacity';
import { Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react';

import { AppContext } from '../../context/AppContext';
import { Window } from '../../styled-components';
import { getUnits, trans } from '../../utils/utils';

const CurrentInfoWindow = ({ pop, style }) => {
	const theme = useTheme();

	const { settings, selectedCity, activeWrapper, setActiveWrapper } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	return (
		<Grid container spacing={{ xs: 1, sm: 2 }} sx={{ height: '100%', width: '100%' }}>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					bordercolor={activeWrapper === 'wind' ? theme?.palette?.wrapper?.wind?.light : ''}
					onClick={() => setActiveWrapper('wind')}
					style={{
						...style,
						transform: style?.xys.to(trans),
						flexDirection: 'column',
						width: '100%',
						padding: '0.6rem',
					}}
				>
					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							width: '100%',
							color: activeWrapper === 'wind' ? theme?.palette?.wrapper?.wind?.light : 'text.secondary',
						}}
					>
						<AirIcon />
					</Icon>
					<Typography variant="subtitle1" zIndex={2}>
						{selectedCity?.current?.wind_speed?.[units]?.large}
						{getUnits()?.speed?.[units]?.large}
					</Typography>
				</Window>
			</Grid>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					bordercolor={activeWrapper === 'precipitation' ? theme?.palette?.wrapper?.precipitation?.light : ''}
					onClick={() => setActiveWrapper('precipitation')}
					style={{ ...style, transform: style?.xys.to(trans), flexDirection: 'column', padding: '0.6rem' }}
					value="precipitation"
				>
					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							width: '100%',
							color:
								activeWrapper === 'precipitation'
									? theme?.palette?.wrapper?.precipitation?.light
									: 'text.secondary',
						}}
					>
						<BeachAccessIcon />
					</Icon>
					<Typography variant="subtitle1" zIndex={2}>
						{Math.round(pop) * 100}%
					</Typography>
				</Window>
			</Grid>
			<Grid size={{ xs: 4, sm: 12 }}>
				<Window
					bordercolor={activeWrapper === 'humidity' ? theme?.palette?.wrapper?.humidity?.light : ''}
					onClick={() => setActiveWrapper('humidity')}
					style={{
						...style,
						transform: style?.xys.to(trans),
						flexDirection: 'column',
						padding: '0.6rem',
					}}
					value="humidity"
				>
					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							width: '100%',
							color:
								activeWrapper === 'humidity'
									? theme?.palette?.wrapper?.humidity?.light
									: 'text.secondary',
						}}
					>
						<OpacityIcon />
					</Icon>
					<Typography variant="subtitle1" zIndex={2}>
						{' '}
						{selectedCity?.current?.main?.humidity}%
					</Typography>
				</Window>
			</Grid>
		</Grid>
	);
};

export default CurrentInfoWindow;

import AirIcon from '@mui/icons-material/Air';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import OpacityIcon from '@mui/icons-material/Opacity';
import { Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { getUnits, trans } from '../../utils/utils';
import { Window } from '../Window/Window';

const CurrentInfoWindow = ({ pop, style, index, handleCloseCurrentWeather, api }) => {
	const theme = useTheme();
	const { isXs, isLg, isMd, isXl } = useBreakpoint();

	const { settings, selectedCity, activeWrapper } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	return (
		<Grid
			container
			spacing={{ xs: 1 }}
			sx={{ height: '100%', width: '100%', paddingTop: isXs ? '1rem' : '0rem', position: 'relative' }}
		>
			<Grid
				size={{ xs: 4, sm: 12 }}
				sx={{ display: 'flex', justifyContent: isXs ? 'center' : 'end', alignItems: 'center' }}
			>
				<Window
					api={api}
					id={'wind'}
					index={index}
					onButtonClick={handleCloseCurrentWeather}
					shouldSkip={isLg || isMd || isXl}
					style={{
						...style,
						transform: style?.xys.to(trans),
						flexDirection: 'column',
						width: '100%',
						padding: '0.6rem',
						maxWidth: '6rem',
						maxHeight: '6rem',
					}}
				>
					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							color: activeWrapper === 'wind' ? theme?.palette?.wrapper?.wind?.light : 'text.secondary',
						}}
					>
						<AirIcon sx={{ maxWidth: '20px' }} />
					</Icon>
					<Typography variant="subtitle1" zIndex={2}>
						{selectedCity?.current?.wind_speed?.[units]?.large}
						{getUnits({ selected: 'wind', units })}
					</Typography>
				</Window>
			</Grid>
			<Grid
				size={{ xs: 4, sm: 12 }}
				sx={{ display: 'flex', justifyContent: isXs ? 'center' : 'end', alignItems: 'center' }}
			>
				<Window
					api={api}
					id={'precipitation'}
					index={index}
					shadowcolor={activeWrapper === 'precipitation' ? theme?.palette?.wrapper?.precipitation?.light : ''}
					shouldSkip={true}
					style={{
						...style,
						transform: style?.xys.to(trans),
						flexDirection: 'column',
						padding: '0.6rem',
						maxWidth: '6rem',
						maxHeight: '6rem',
					}}
					value="precipitation"
				>
					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',

							color:
								activeWrapper === 'precipitation'
									? theme?.palette?.wrapper?.precipitation?.light
									: 'text.secondary',
						}}
					>
						<BeachAccessIcon sx={{ maxWidth: '20px' }} />
					</Icon>
					<Typography variant="subtitle1" zIndex={2}>
						{Math.round(pop) * 100}%
					</Typography>
				</Window>
			</Grid>
			<Grid
				size={{ xs: 4, sm: 12 }}
				sx={{ display: 'flex', justifyContent: isXs ? 'center' : 'end', alignItems: 'center' }}
			>
				<Window
					api={api}
					id={'humidity'}
					index={index}
					shadowcolor={activeWrapper === 'humidity' ? theme?.palette?.wrapper?.humidity?.light : ''}
					shouldSkip={true}
					style={{
						...style,
						transform: style?.xys.to(trans),
						flexDirection: 'column',
						padding: '0.6rem',
						maxWidth: '6rem',
						maxHeight: '6rem',
					}}
					value="humidity"
				>
					<Icon
						sx={{
							zIndex: 2,
							mb: '0.2rem',
							color:
								activeWrapper === 'humidity'
									? theme?.palette?.wrapper?.humidity?.light
									: 'text.secondary',
						}}
					>
						<OpacityIcon sx={{ maxWidth: '20px' }} />
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

import { Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useMemo } from 'react';
import { useSpring } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { getUnits, trans } from '../../utils/utils';
import { Window } from '../Window/Window';

const AnimatedTypography = animated(Typography);

const TemperatureWindow = ({ style, handleCloseCurrentWeather, api, index }) => {
	const { isLg, isXl, isMd, isXs } = useBreakpoint();
	const theme = useTheme();
	const { settings, selectedCity } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	const [props] = useSpring(
		() => ({
			from: {
				opacity: 0,
				transform: 'perspective(600px) rotateX(180deg)',
			},
			to: {
				transform: 'perspective(600px) rotateX(0deg)',
				opacity: 1,
			},
			reset: true,
		}),
		[units],
	);

	return (
		<Window
			api={api}
			id={'temperature'}
			index={index}
			onButtonClick={handleCloseCurrentWeather}
			shadowcolor={theme?.palette?.wrapper?.temperature?.light}
			shouldSkip={!isXs && !isMd && !isLg && !isXl}
			style={{ ...style, transform: style?.xys.to(trans) }}
		>
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
					<AnimatedTypography
						fontSize={isXl || isLg || isMd ? '5.5rem' : '4rem'}
						style={props}
						sx={{ fontWeight: 600, zIndex: 3 }}
						variant="h1"
					>
						{selectedCity?.current?.temp?.[units] || ''}
					</AnimatedTypography>
					<AnimatedTypography
						style={props}
						sx={{ fontWeight: 600 }}
						variant={isLg || isMd || isXs ? 'h2' : 'h3'}
					>
						&#176;{getUnits()?.temp?.[units]}
					</AnimatedTypography>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography sx={{ fontWeight: 600, zIndex: 3 }} variant="h6">
						{selectedCity?.current?.weather?.[0]?.description || ''}
					</Typography>
				</Grid>
				<Grid size={{ xs: 6 }}>
					<Typography sx={{ color: 'text.secondary', zIndex: 3 }} variant="h6">
						Feels like {selectedCity?.current?.feels_like?.[units] || ''}
						&#176;{getUnits()?.temp?.[units]}
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
};

export default TemperatureWindow;

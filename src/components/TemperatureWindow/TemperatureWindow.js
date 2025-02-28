import { Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useLayoutEffect, useMemo } from 'react';
import { useSpring } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { getUnits } from '../../utils/utils';
import { Window } from '../Window/Window';

const AnimatedTypography = animated(Typography);

const TemperatureWindow = ({ handleCloseCurrentWeather, api, index, selectedCity }) => {
	const { isLg, isXl, isMd, isXs } = useBreakpoint();
	const theme = useTheme();
	const { settings } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	const [props, propsApi] = useSpring(() => ({
		delay: 300,
		from: {
			opacity: 0,
			transform: 'perspective(600px) translateX(100%)',
		},
		to: {
			transform: 'perspective(600px) translateX(0)',
			opacity: 1,
		},
	}));

	useLayoutEffect(() => {
		propsApi.start({
			from: {
				opacity: 0,
				transform: 'perspective(600px) rotateX(180deg)',
			},
			to: {
				transform: 'perspective(600px) rotateX(0deg)',
				opacity: 1,
			},
		});
	}, [units, propsApi]);

	return (
		<Window
			api={api}
			id={'temperature'}
			index={index}
			onButtonClick={handleCloseCurrentWeather}
			shadowcolor={theme?.palette?.wrapper?.temperature?.light}
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
							filter: settings?.theme?.mode === 'light' ? 'brightness(0.95) saturate(2)' : '',
							'& > img': { width: '150px' },
						}}
					>
						<img alt="icon" id="main-svg" src={`../icons/${selectedCity?.weather?.[0]?.icon}.svg`} />
					</Icon>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
					<AnimatedTypography
						fontSize={isXl || isLg || isMd ? '5.5rem' : '4rem'}
						style={props}
						sx={{
							fontWeight: 600,
							zIndex: 3,
							background: `-webkit-linear-gradient(90deg, ${theme?.palette?.text?.primary} ,  ${theme?.palette?.temperature}  150%)`,
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
						variant="h1"
					>
						{selectedCity?.temp?.[units] || ''}
					</AnimatedTypography>
					<AnimatedTypography
						style={props}
						sx={{
							fontWeight: 600,
							background: `-webkit-linear-gradient(90deg, ${theme?.palette?.text?.primary} ,  ${theme?.palette?.temperature}  150%)`,
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
						variant={isLg || isMd || isXs ? 'h2' : 'h3'}
					>
						&#176;{getUnits({ selected: 'temperature', units })}
					</AnimatedTypography>
				</Grid>
				<Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography noWrap sx={{ fontWeight: 600, zIndex: 3 }} variant="h6">
						{selectedCity?.weather?.[0]?.description || ''}
					</Typography>
				</Grid>
				<Grid size={{ xs: 6 }}>
					<Typography sx={{ color: 'text.secondary', zIndex: 3 }} variant="h6">
						Feels like {selectedCity?.feels_like?.[units] || ''}
						&#176;{getUnits({ selected: 'temperature', units })}
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
};

export default TemperatureWindow;

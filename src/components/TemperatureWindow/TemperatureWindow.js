import { Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useMemo } from 'react';
import { useSpring } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Window, Wrapper } from '../../styled-components';
import { getUnits, trans } from '../../utils/utils';

const AnimatedTypography = animated(Typography);

const TemperatureWindow = ({ selectedCity, activeWrapper: wrapper, animation, setActiveWrapper }) => {
	const { isLg, isXl, isMd } = useBreakpoint();

	const theme = useTheme();

	const { settings } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	const [props] = useSpring(
		() => ({
			from: { transform: 'scaleY(0)', opacity: 0 },
			to: { transform: 'scaleY(1)', opacity: 1 },
			reset: true,
		}),
		[units],
	);

	console.log(props);

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
					<AnimatedTypography
						fontSize={isXl || isLg || isMd ? '5.5rem' : '4rem'}
						style={props}
						sx={{ fontWeight: 600, zIndex: 3 }}
						variant="h1"
					>
						{selectedCity?.current?.temp?.[units] || ''}
					</AnimatedTypography>
					<Typography sx={{ fontWeight: 600 }} variant={isLg ? 'h2' : 'h3'}>
						&#176;{getUnits()?.temp?.[units]}
					</Typography>
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

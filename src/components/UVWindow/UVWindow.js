import { Box, Grid2 as Grid, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSpring } from 'react-spring';

import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Wrapper } from '../../styled-components';
import { trans, uvIndex } from '../../utils/utils';
import { Window } from '../Window/Window';
import { Uvi } from './styled-components';

export const UVWindow = ({ airPollution, style, activeWrapper: wrapper, handleCloseCurrentWeather }) => {
	const [width, setWidth] = useState(0);
	const airPollutionRef = useRef();

	const { isSm, isXs } = useBreakpoint();

	const activeWrapper = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: wrapper === 'UV' ? 0.5 : 0,
			scale: wrapper === 'UV' ? '100%' : '0%',
		},
	});

	useEffect(() => {
		if (airPollutionRef.current) {
			const observer = new ResizeObserver((entries) => {
				for (let entry of entries) {
					setWidth(entry.contentRect.width);
				}
			});
			observer.observe(airPollutionRef.current);

			// Cleanup observer
			return () => observer.disconnect();
		}
	}, []);

	const uvIndexCalc = useMemo(() => {
		if (airPollution !== undefined) {
			return uvIndex(airPollution?.main?.aqi);
		}
	}, [airPollution]);

	return (
		<Window
			id={'air-polution'}
			isDisabled={true}
			onButtonClick={handleCloseCurrentWeather}
			shouldSkip={!isXs && !isSm}
			style={{ ...style, transform: style?.xys.to(trans) }}
		>
			<Wrapper style={activeWrapper} />
			<Grid container spacing={1} sx={{ height: '100%' }}>
				<Grid size={12} sx={{ display: 'flex' }}>
					<Box
						sx={{
							display: 'flex',

							mr: '1rem',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<Typography color="text.secondary" noWrap variant="h6" zIndex={2}>
							{' '}
							{uvIndexCalc?.description}
						</Typography>
						<Typography
							fontWeight={500}
							sx={{ whiteSpace: 'nowrap', wordWrap: 'normal' }}
							variant="h6"
							zIndex={2}
						>
							AQI {airPollution?.main?.aqi}
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography
							noWrap={true}
							sx={{
								overflow: 'hidden',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								textOverflow: 'ellipsis',
								whiteSpace: 'normal',
								WebkitLineClamp: 3,
							}}
							variant="subtitle1"
							zIndex={2}
						>
							{uvIndexCalc?.message}
						</Typography>
					</Box>
				</Grid>
				<Grid size={12} sx={{ display: 'flex', alignItems: 'center' }} zIndex={2}>
					<Uvi color={uvIndexCalc?.color} ref={airPollutionRef} uvi={airPollution?.main?.aqi} width={width}>
						<div id="background"></div>
					</Uvi>
				</Grid>
			</Grid>
		</Window>
	);
};

export default UVWindow;

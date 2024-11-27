import { Grid2 as Grid, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSpring } from 'react-spring';

import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Window, Wrapper } from '../../styled-components';
import { trans, uvIndex } from '../../utils/utils';
import { Uvi } from './styled-components';

export const UVWindow = ({ airPollution, animation, activeWrapper: wrapper }) => {
	const [width, setWidth] = useState(0);
	const airPollutionRef = useRef();

	const { isMd } = useBreakpoint();

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
		<Window onClick={() => {}} style={{ ...animation, transform: animation?.xys.to(trans) }}>
			<Wrapper style={activeWrapper} />
			<Grid container spacing={1} sx={{ height: '100%' }}>
				<Grid size={3} sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography color="text.secondary" noWrap variant="h6" zIndex={2}>
						{' '}
						{uvIndexCalc?.description}
					</Typography>
					<Typography fontWeight={600} variant="h6" zIndex={2}>
						AQI {airPollution?.main?.aqi}
					</Typography>
				</Grid>
				<Grid size={9} sx={{ display: 'flex', alignItems: 'end' }}>
					<Typography noWrap={isMd ? true : false} variant="h6" zIndex={2}>
						{uvIndexCalc?.message}
					</Typography>
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

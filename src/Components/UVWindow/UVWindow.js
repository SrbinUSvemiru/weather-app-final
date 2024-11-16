import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { Window, Uvi, Wrapper } from './styled-components';
import { uvIndex } from '../../Utils/utils';
import { useSpring } from 'react-spring';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Grid2 as Grid, Typography } from '@mui/material';
export const UVWindow = ({ airPollution, animation, activeWrapper: wrapper, setActiveWrapper }) => {
	const [width, setWidth] = useState(0);
	const airPollutionRef = useRef();

	const { isXs, isSm, isMd } = useBreakpoint();

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
		if (airPollution !== undefined) return uvIndex(airPollution?.main?.aqi);
	}, [airPollution]);
	return (
		<Window
			style={{
				...animation,
				transform: animation.x.to((x) => `scale(${x})`),
			}}
			onClick={() => setActiveWrapper('UV')}
		>
			<Wrapper style={activeWrapper} />
			<Grid container spacing={1}>
				<Grid size={3} sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="h6" zIndex={2} noWrap>
						{' '}
						{uvIndexCalc?.description}
					</Typography>
					<Typography variant="h6" fontWeight={600} zIndex={2}>
						AQI {airPollution?.main?.aqi}
					</Typography>
				</Grid>
				<Grid size={9} sx={{ display: 'flex', alignItems: 'end' }}>
					<Typography variant="subtitle1" zIndex={2} noWrap={isMd ? true : false}>
						{uvIndexCalc?.message}
					</Typography>
				</Grid>
				<Grid size={12} zIndex={2} sx={{ display: 'flex', alignItems: 'center' }}>
					<Uvi color={uvIndexCalc?.color} uvi={airPollution?.main?.aqi} width={width} ref={airPollutionRef}>
						<div id="background"></div>
					</Uvi>
				</Grid>
			</Grid>
		</Window>
	);
};

export default UVWindow;

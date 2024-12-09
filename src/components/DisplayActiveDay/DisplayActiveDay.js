import { Grid2 as Grid, Typography, useTheme } from '@mui/material';
import { animated } from '@react-spring/web';
import { map } from 'lodash';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSprings } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { getTime, getUnits, trans } from '../../utils/utils';
import { Window } from '../Window/Window';
import { Day } from './styled-components';

const AnimatedTypography = animated(Typography);

const DisplayActiveDay = ({ daysForecast, style, handleCloseCurrentWeather, index, api }) => {
	const theme = useTheme();
	const [activeDay, setActiveDay] = useState(0);
	const [dayData, setDayData] = useState([]);
	const { isXs } = useBreakpoint();
	const { settings, selectedCity } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	const formattData = useCallback(
		(data, units) => {
			setDayData([
				{ id: 0, label: '', value: data?.day },
				{ id: 1, label: 'Temp max', value: `${data?.max_temp?.[units]}°${getUnits()?.temp?.[units]}` },
				{ id: 2, label: 'Temp min', value: `${data?.min_temp?.[units]}°${getUnits()?.temp?.[units]}` },
				{
					id: 3,
					label: 'Sunrise',
					value: getTime({
						dt: selectedCity?.current?.sys?.sunrise,
						timezone: selectedCity?.current?.timezone,
						formatt: 'HH:mm',
					}),
				},
				{
					id: 4,
					label: 'Sunset',
					value: getTime({
						dt: selectedCity?.current?.sys?.sunset,
						timezone: selectedCity?.current?.timezone,
						formatt: 'HH:mm',
					}),
				},
				{
					id: 5,
					label: 'Wind',
					value: `${data?.wind_speed?.[units]?.large}${getUnits()?.speed?.[units]?.large}`,
				},
				{ id: 6, label: 'Pressure', value: `${data?.pressure}mb` },
				{
					id: 7,
					label: 'Visibility',
					value: `${data?.visibility?.[units]?.large}${getUnits()?.distance?.[units]?.large}`,
				},
				// Add more items as needed
			]);
		},
		[selectedCity],
	);

	useEffect(() => {
		formattData(daysForecast?.days?.[activeDay], units);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [springs, springsApi] = useSprings(dayData?.length, (i) => ({
		from: { opacity: 0, height: '0%', transform: 'translateY(-50px)' },
		immediate: true,
		to: { opacity: 1, height: '100%', transform: 'translateY(0)' },
		delay: (i + 1) * 50,
		config: {
			tension: 10,
			friction: 10,
			mass: 1,
		},
	}));
	// Create springs for each item with individual delays
	useLayoutEffect(() => {
		springsApi?.start((i) => ({
			immediate: false,
			clamp: true,
			delay: (i + 1) * 25,
			to: { opacity: 0, height: '0%', transform: 'translateY(-50%)' },
			onRest: () => formattData(daysForecast?.days?.[activeDay], units),
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [springsApi, activeDay, units, daysForecast]);

	useLayoutEffect(() => {
		springsApi?.start((i) => ({
			immediate: false,
			clamp: true,
			delay: (i + 1) * 25,
			to: { opacity: 1, height: '100%', transform: 'translateY(0)' },
		}));
	}, [springsApi, dayData]);

	return (
		<>
			<Grid size={12} spacing={1}>
				<Window
					id={'day-details'}
					isDisabled={true}
					onButtonClick={handleCloseCurrentWeather}
					shadowcolor={theme?.palette?.wrapper?.days?.light}
					shouldSkip={!isXs}
					style={{ ...style, transform: style?.xys.to(trans) }}
				>
					<Grid columnSpacing={4} container rowSpacing={1}>
						{map(springs, (style, i) => {
							if (i === 0) {
								return (
									<Grid
										key={dayData?.[i]?.id}
										size={12}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											paddingBottom: '0.5rem',
											marginBottom: '0.5rem',
											borderBottom: '2px solid',
											borderColor: 'border',
										}}
									>
										<AnimatedTypography style={{ ...style }} variant="h6">
											{dayData?.[i]?.value}
										</AnimatedTypography>
									</Grid>
								);
							} else {
								return (
									<Grid
										key={dayData?.[i]?.id}
										size={{ xs: 12, sm: 6 }}
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											overflow: 'hidden',
											position: 'relative',
										}}
									>
										<AnimatedTypography noWrap sx={{ color: 'text.secondary' }} variant="subtitle1">
											{dayData?.[i]?.label}
										</AnimatedTypography>
										<AnimatedTypography noWrap style={{ ...style }} variant="h6">
											{dayData?.[i]?.value}
										</AnimatedTypography>
									</Grid>
								);
							}
						})}
					</Grid>
				</Window>
			</Grid>
			<Grid container size={12} spacing={{ xs: 0.5, sm: 1 }}>
				{map(daysForecast?.days, (day, idx) => (
					<Grid key={idx} size={2}>
						<Window
							api={api}
							id={`${idx}-day`}
							index={index + idx + 1}
							onClick={() => setActiveDay(idx)}
							style={{ ...style, transform: style?.xys.to(trans), padding: '0.4rem 1rem' }}
						>
							<Day>
								<img alt="weather-icon" src={`../icons/${day?.weather?.icon}.svg`} />
								<Typography fontWeight={500} sx={{ color: 'text.secondary' }} variant="subtitle1">
									{day?.day?.slice(0, 3)}
								</Typography>
							</Day>
						</Window>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default DisplayActiveDay;

import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { Box, Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import { animated } from '@react-spring/web';
import { debounce, map } from 'lodash';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSprings } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { getTime, getUnits, trans } from '../../utils/utils';
import { Window } from '../Window/Window';
import { Day } from './styled-components';

const AnimatedTypography = animated(Typography);
const AnimatedBox = animated(Box);

const getIcon = (i) => {
	const obj = {
		1: <DeviceThermostatIcon sx={{ maxWidth: '20px' }} />,
		2: <DeviceThermostatIcon sx={{ maxWidth: '20px' }} />,
		3: <WbSunnyIcon sx={{ maxWidth: '20px' }} />,
		4: <WbTwilightIcon sx={{ maxWidth: '20px' }} />,
		5: <AirIcon sx={{ maxWidth: '20px' }} />,
		6: <CompressIcon sx={{ maxWidth: '20px' }} />,
		7: <VisibilityIcon sx={{ maxWidth: '20px' }} />,
	};
	return obj[i];
};

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
				{
					id: 1,
					label: 'Temp max',
					value: `${data?.max_temp?.[units]}°${getUnits({ selected: 'temperature', units })}`,
				},
				{
					id: 2,
					label: 'Temperature min',
					value: `${data?.min_temp?.[units]}°${getUnits({ selected: 'temperature', units })}`,
				},
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
					value: `${data?.wind_speed?.[units]?.large}${getUnits({ selected: 'wind', units })}`,
				},
				{ id: 6, label: 'Pressure', value: `${data?.pressure}mb` },
				{
					id: 7,
					label: 'Visibility',
					value: `${data?.visibility?.[units]?.large}${getUnits({ selected: 'distance', units })}`,
				},
				// Add more items as needed
			]);
		},
		[selectedCity],
	);

	useEffect(() => {
		const debouncedFormatData = debounce(formattData, 500);
		debouncedFormatData(daysForecast?.days?.[activeDay], units);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [springs, springsApi] = useSprings(dayData?.length, (i) => ({
		from: { opacity: 0, transform: i === 0 ? 'translateX(-50%)' : 'translateY(-50%)' },
		to: { opacity: 1, transform: i === 0 ? 'translateX(0)' : 'translateY(0)' },
		delay: () => (i + 1) * 25,
	}));

	useLayoutEffect(() => {
		springsApi?.start((i) => ({
			immediate: false,
			clamp: true,
			delay: () => (i + 1) * 25,
			to: { opacity: 0, transform: i === 0 ? 'translateX(-50%)' : 'translateY(-50%)' },
			onRest: () => formattData(daysForecast?.days?.[activeDay], units),
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [springsApi, activeDay, units, daysForecast]);

	useLayoutEffect(() => {
		springsApi?.start((i) => ({
			immediate: false,
			clamp: true,
			delay: () => (i + 1) * 25,
			to: { opacity: 1, transform: i === 0 ? 'translateX(0)' : 'translateY(0)' },
		}));
	}, [springsApi, dayData]);

	return (
		<AnimatedBox
			style={{
				...style,
				transform: style?.xys.to(trans),
				boxShadow: 'inset 0px 4px 10px -1px rgba(0, 0, 0, 0.3)',
			}}
			sx={{
				paddingBottom: '0.4rem',
				borderRadius: '1.4rem',
				width: '100%',
				height: '100%',
			}}
		>
			<Grid size={12} spacing={1}>
				<Window
					id={'day-details'}
					isDisabled={true}
					onButtonClick={handleCloseCurrentWeather}
					shadowcolor={theme?.palette?.wrapper?.days?.light}
					shouldSkip={!isXs}
					style={{ ...style, transform: style?.xys.to(trans), minHeight: '250px' }}
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
											borderBottom: '1px solid',
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
											padding: isXs ? '0rem 2rem' : '0rem',
											position: 'relative',
										}}
									>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<Icon
												sx={{
													zIndex: 2,
													mr: '0.5rem',
													color: 'text.secondary',
												}}
											>
												{getIcon(i)}
											</Icon>
											<AnimatedTypography
												noWrap
												sx={{ color: 'text.secondary' }}
												variant="subtitle1"
											>
												{dayData?.[i]?.label}
											</AnimatedTypography>
										</Box>
										<AnimatedTypography noWrap style={{ ...style }} variant="subtitle1">
											{dayData?.[i]?.value}
										</AnimatedTypography>
									</Grid>
								);
							}
						})}
					</Grid>
				</Window>
			</Grid>
			<Grid
				size={12}
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mt: '0.4rem',
					padding: '0 0.4rem',
				}}
			>
				{map(daysForecast?.days, (day, idx) => (
					<Window
						api={api}
						id={`${idx}-day`}
						index={index + idx + 1}
						onButtonClick={handleCloseCurrentWeather}
						onClick={() => setActiveDay(idx)}
						shouldSkip={idx !== 0}
						style={{
							...style,
							transform: style?.xys.to(trans),
							padding: isXs ? '0.4rem 0.2rem' : '0.4rem 0.6rem',
							width: 'fit-content',
						}}
					>
						<Day
							style={{
								filter: settings?.theme?.mode === 'light' ? 'brightness(0.95) saturate(2)' : '',
							}}
						>
							<img alt="weather-icon" src={`../icons/${day?.weather?.icon}.svg`} />
							<Typography fontWeight={500} sx={{ color: 'text.secondary' }} variant="subtitle1">
								{day?.day?.slice(0, 3)}
							</Typography>
						</Day>
					</Window>
				))}
			</Grid>
		</AnimatedBox>
	);
};

export default DisplayActiveDay;

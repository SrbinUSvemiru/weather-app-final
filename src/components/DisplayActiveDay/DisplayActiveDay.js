import { Grid2 as Grid, Typography, useTheme } from '@mui/material';
import { animated } from '@react-spring/web';
import { map } from 'lodash';
import React, { useContext, useMemo, useState } from 'react';
import { useTransition } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { Window } from '../../styled-components';
import { getUnits, trans } from '../../utils/utils';
import { Day } from './styled-components';

const AnimatedTypography = animated(Typography);

const DisplayActiveDay = ({ daysForecast, style }) => {
	const theme = useTheme();
	const [activeDay, setActiveDay] = useState(0);

	const { settings, selectedCity } = useContext(AppContext);

	const dayData = useMemo(() => daysForecast?.days?.[activeDay], [daysForecast, activeDay]);
	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	// Data keys for animation mapping
	const sunrise = useMemo(() => {
		const d = new Date(selectedCity?.current?.sys?.sunrise * 1000 + selectedCity?.current?.timezone * 1000);
		let hrs = d.getUTCHours();
		let mins = d.getUTCMinutes();
		return [hrs, mins];
	}, [selectedCity]);
	const sunset = useMemo(() => {
		const d = new Date(selectedCity?.current?.sys?.sunset * 1000 + selectedCity?.current?.timezone * 1000);
		let hrs = d.getUTCHours();
		let mins = d.getUTCMinutes();
		return [hrs, mins];
	}, [selectedCity]);
	const animatedData = useMemo(
		() => [
			{ id: 1, label: 'Temp max', value: `${dayData?.max_temp?.[units]}°${getUnits()?.temp?.[units]}` },
			{ id: 2, label: 'Temp min', value: `${dayData?.min_temp?.[units]}°${getUnits()?.temp?.[units]}` },
			{ id: 3, label: 'Sunrise', value: sunrise },
			{ id: 4, label: 'Sunset', value: sunset },
			{
				id: 5,
				label: 'Wind',
				value: `${dayData?.wind_speed?.[units]?.large}${getUnits()?.speed?.[units]?.large}`,
			},
			{ id: 6, label: 'Pressure', value: `${dayData?.pressure}mb` },
			{
				id: 7,
				label: 'Visibility',
				value: `${dayData?.visibility?.[units]?.large}${getUnits()?.distance?.[units]?.large}`,
			},
			// Add more items as needed
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dayData, units],
	);

	// Create springs for each item with individual delays
	const transitions = useTransition(animatedData, {
		from: { opacity: 0, height: '0%', transform: 'translateY(-5px)' },
		enter: { opacity: 1, height: '100%', transform: 'translateY(0)' },
		leave: { opacity: 0, height: '0%', transform: 'translateY(-5px)' },
		exitBeforeEnter: true, // Ensures leave happens before enter
	});

	return (
		<>
			<Grid size={12}>
				<Window
					bordercolor={theme?.palette?.wrapper?.days?.light}
					style={{ ...style, transform: style?.xys.to(trans) }}
				>
					<Grid columnSpacing={4} container rowSpacing={1}>
						{transitions((style, item) => (
							<Grid
								key={item.id}
								size={{ xs: 12, sm: 6 }}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									overflow: 'hidden',
									position: 'relative',
								}}
							>
								<AnimatedTypography noWrap sx={{ color: 'text.secondary' }} variant="h6">
									{item.label}
								</AnimatedTypography>
								<AnimatedTypography
									noWrap
									style={{ ...style }} // Animated style from useTransition
									variant="h6"
								>
									{item.value}
								</AnimatedTypography>
							</Grid>
						))}
					</Grid>
				</Window>
			</Grid>
			<Grid container size={12} spacing={{ xs: 0.5, sm: 2 }}>
				{map(daysForecast?.days, (day, index) => (
					<Grid key={index} size={2}>
						<Window
							bordercolor={activeDay === index ? theme?.palette?.wrapper?.days?.light : ''}
							onClick={() => setActiveDay(index)}
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

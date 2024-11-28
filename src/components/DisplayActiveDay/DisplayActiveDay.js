import { Grid2 as Grid, Typography, useTheme } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useMemo } from 'react';
import { useTransition } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { Window } from '../../styled-components';
import { getUnits, trans } from '../../utils/utils';

const AnimatedTypography = animated(Typography);

const DisplayActiveDay = ({ selectedCity, data, animation }) => {
	const theme = useTheme();

	const { settings } = useContext(AppContext);

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
			{ id: 1, label: 'Temp max', value: `${data?.max_temp?.[units]}°${getUnits()?.temp?.[units]}` },
			{ id: 2, label: 'Temp min', value: `${data?.min_temp?.[units]}°${getUnits()?.temp?.[units]}` },
			{ id: 3, label: 'Sunrise', value: sunrise },
			{ id: 4, label: 'Sunset', value: sunset },
			{ id: 5, label: 'Wind', value: `${data?.wind_speed?.[units]?.large}${getUnits()?.speed?.[units]?.large}` },
			{ id: 6, label: 'Pressure', value: `${data?.pressure}mb` },
			{
				id: 7,
				label: 'Visibility',
				value: `${data?.visibility?.[units]?.large}${getUnits()?.distance?.[units]?.large}`,
			},
			// Add more items as needed
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data, units],
	);

	// Create springs for each item with individual delays
	const transitions = useTransition(animatedData, {
		from: { opacity: 0, height: '0%', transform: 'translateY(-5px)' },
		enter: { opacity: 1, height: '100%', transform: 'translateY(0)' },
		leave: { opacity: 0, height: '0%', transform: 'translateY(-5px)' },
		exitBeforeEnter: true, // Ensures leave happens before enter
		delay: (item, index) => index * 300,
	});

	return (
		<Window
			bordercolor={theme?.palette?.wrapper?.days?.light}
			style={{ ...animation, transform: animation?.xys.to(trans) }}
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
	);
};

export default DisplayActiveDay;

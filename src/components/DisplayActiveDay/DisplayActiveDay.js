import { Grid2 as Grid, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

import { Window } from '../../styled-components';
import { trans } from '../../utils/utils';

const DisplayActiveDay = ({ selectedCity, activeDay, animation }) => {
	const theme = useTheme();

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

	return (
		<Window
			bordercolor={theme?.palette?.wrapper?.days?.light}
			style={{ ...animation, transform: animation?.xys.to(trans) }}
		>
			<Grid columnSpacing={4} container rowSpacing={1}>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography noWrap sx={{ color: 'text.secondary' }} variant="h6">
						Temp max
					</Typography>
					<Typography noWrap variant="h6">
						{Math.round(activeDay?.max_temp * 10) / 10}&#176;C
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography noWrap sx={{ color: 'text.secondary' }} variant="h6">
						Temp min
					</Typography>
					<Typography noWrap variant="h6">
						{Math.round(activeDay?.min_temp * 10) / 10}
						&#176;C
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography sx={{ color: 'text.secondary' }} variant="h6">
						Wind
					</Typography>
					<Typography variant="h6">{Math.round(activeDay?.wind_speed * 3.5)}km/h</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography sx={{ color: 'text.secondary' }} variant="h6">
						Pressure
					</Typography>
					<Typography variant="h6">{activeDay?.pressure}mb</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography noWrap sx={{ color: 'text.secondary' }} variant="h6">
						Sunrise
					</Typography>
					<Typography variant="h6">
						{sunrise?.[0] <= 9 ? '0' + sunrise?.[0] : sunrise?.[0]}:
						{sunrise?.[1] <= 9 ? '0' + sunrise?.[1] : sunrise?.[1]}h
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography noWrap sx={{ color: 'text.secondary' }} variant="h6">
						Sunset
					</Typography>
					<Typography variant="h6">
						{sunset?.[0] <= 9 ? '0' + sunset?.[0] : sunset?.[0]}:
						{sunset?.[1] <= 9 ? '0' + sunset?.[1] : sunset?.[1]}h
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography sx={{ color: 'text.secondary' }} variant="h6">
						Visibility
					</Typography>
					<Typography variant="h6">{activeDay?.visibility}m</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography sx={{ color: 'text.secondary' }} variant="h6">
						Highest UV
					</Typography>
					<Typography variant="h6">
						{activeDay?.uvi}
						uv
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
};

export default DisplayActiveDay;

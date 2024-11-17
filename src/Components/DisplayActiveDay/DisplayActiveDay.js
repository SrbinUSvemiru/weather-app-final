import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { MainWeather, Window } from './styled-components';
import { moonPhase } from '../../Utils/utils';

import { Grid2 as Grid, Typography, Icon } from '@mui/material';

function DisplayActiveDay({ currentCity, activeDay, animation }) {
	const sunrise = useMemo(() => {
		const d = new Date(currentCity?.current?.sys?.sunrise * 1000 + currentCity?.current?.timezone * 1000);
		let hrs = d.getUTCHours();
		let mins = d.getUTCMinutes();
		return [hrs, mins];
	}, [currentCity]);
	const sunset = useMemo(() => {
		const d = new Date(currentCity?.current?.sys?.sunset * 1000 + currentCity?.current?.timezone * 1000);
		let hrs = d.getUTCHours();
		let mins = d.getUTCMinutes();
		return [hrs, mins];
	}, [currentCity]);

	return (
		<Window
			style={{
				...animation,
			}}
		>
			<Grid container rowSpacing={1} columnSpacing={4}>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography variant="h6" noWrap sx={{ color: 'text.secondary' }}>
						temp max
					</Typography>
					<Typography variant="h6" noWrap>
						{Math.round(activeDay?.max_temp * 10) / 10}&#176;C
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography variant="h6" noWrap sx={{ color: 'text.secondary' }}>
						temp min
					</Typography>
					<Typography variant="h6" noWrap>
						{Math.round(activeDay?.min_temp * 10) / 10}
						&#176;C
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>
						wind
					</Typography>
					<Typography variant="h6">{Math.round(activeDay?.wind_speed * 3.5)} km/h</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>
						pressure
					</Typography>
					<Typography variant="h6">{activeDay?.pressure} mb</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography variant="h6" noWrap sx={{ color: 'text.secondary' }}>
						sunrise
					</Typography>
					<Typography variant="h6">
						{sunrise?.[0] <= 9 ? '0' + sunrise?.[0] : sunrise?.[0]}:
						{sunrise?.[1] <= 9 ? '0' + sunrise?.[1] : sunrise?.[1]} h
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography variant="h6" noWrap sx={{ color: 'text.secondary' }}>
						sunset
					</Typography>
					<Typography variant="h6">
						{sunset?.[0] <= 9 ? '0' + sunset?.[0] : sunset?.[0]}:
						{sunset?.[1] <= 9 ? '0' + sunset?.[1] : sunset?.[1]} h
					</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>
						visibility
					</Typography>
					<Typography variant="h6">{activeDay?.visibility} m</Typography>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 6 }}
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
				>
					<Typography variant="h6" sx={{ color: 'text.secondary' }}>
						highest UV
					</Typography>
					<Typography variant="h6">
						{activeDay?.uvi}
						uv
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
}

export default DisplayActiveDay;

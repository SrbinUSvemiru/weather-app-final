import React, { useMemo, useEffect, useState } from 'react';
import { Window } from './styled-components';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { returnDate, offsetDate } from '../../Utils/utils';
import { Box, Typography } from '@mui/material';

function DateAndLocationWindow({ currentCity, animation }) {
	const [hours, setHours] = useState();
	const [minutes, setMinutes] = useState();
	const [seconds, setSeconds] = useState();

	useEffect(() => {
		if (currentCity) {
			const interval = setInterval(() => {
				const time = offsetDate(currentCity?.current?.timezone);
				setHours(time[0]);
				setMinutes(time[1]);
				setSeconds(time[2]);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [currentCity]);
	const date = useMemo(() => {
		if (currentCity !== undefined) return returnDate(currentCity?.current?.timezone);
	}, [currentCity]);

	return (
		<Window
			style={{
				...animation,
			}}
		>
			<Box sx={{ padding: 0, display: 'flex', width: '100%', justifyContent: 'center' }}>
				<Typography variant="h6" sx={{ fontWeight: 500 }}>
					{date[3]} {date[2]}/{date[1]}/{date[0]}
				</Typography>
			</Box>
			<Box sx={{ padding: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
				<Typography variant="h5" sx={{ fontWeight: 700 }}>
					{currentCity?.name}&nbsp;
				</Typography>
				<Typography variant="h5" sx={{ fontWeight: 700, color: 'text.secondary' }}>
					{currentCity?.country}
				</Typography>
			</Box>

			<Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary' }}>
				{hours <= 9 ? '0' + hours : hours}:{minutes <= 9 ? '0' + minutes : minutes}:
				{seconds <= 9 ? '0' + seconds : seconds}
			</Typography>
		</Window>
	);
}

export default DateAndLocationWindow;

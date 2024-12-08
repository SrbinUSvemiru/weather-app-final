import { Grid2 as Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { offsetDate, returnDate, trans } from '../../utils/utils';
import { Window } from '../Window/Window';

const DateAndLocationWindow = ({ style, handleCloseCurrentWeather }) => {
	const [hours, setHours] = useState();
	const [minutes, setMinutes] = useState();
	const [seconds, setSeconds] = useState();

	const { selectedCity } = useContext(AppContext);

	useEffect(() => {
		if (selectedCity) {
			const interval = setInterval(() => {
				const time = offsetDate(selectedCity?.current?.timezone);
				setHours(time[0]);
				setMinutes(time[1]);
				setSeconds(time[2]);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [selectedCity]);
	const date = useMemo(() => {
		if (selectedCity !== undefined) {
			return returnDate(selectedCity?.current?.timezone);
		}
	}, [selectedCity]);

	return (
		<Window
			id={'date-and-location'}
			isDisabled={true}
			onButtonClick={handleCloseCurrentWeather}
			style={{ ...style, transform: style?.xys.to(trans) }}
		>
			<Grid container spacing={0.5} sx={{ padding: 0, width: '100%' }}>
				<Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography
						sx={{
							fontWeight: 500,
							color: 'text.secondary',
						}}
						variant="h6"
					>
						{date?.[3]} {date?.[2]}/{date?.[1]}/{date?.[0]}
					</Typography>
				</Grid>

				<Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography sx={{ fontWeight: 500 }} variant="h5">
						{selectedCity?.name}&nbsp;
					</Typography>
					<Typography sx={{ fontWeight: 600, color: 'text.secondary' }} variant="h5">
						{selectedCity?.country}
					</Typography>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<Typography
						sx={{
							fontWeight: 500,
							color: 'text.secondary',
							display: 'flex',
							justifyContent: 'center',
						}}
						variant="h6"
					>
						{hours <= 9 ? '0' + hours : hours}:{minutes <= 9 ? '0' + minutes : minutes}:
						{seconds <= 9 ? '0' + seconds : seconds}
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
};

export default DateAndLocationWindow;

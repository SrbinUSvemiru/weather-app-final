import { Box, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { Window } from '../../styled-components';
import { offsetDate, returnDate, trans } from '../../utils/utils';

const DateAndLocationWindow = ({ selectedCity, animation }) => {
	const [hours, setHours] = useState();
	const [minutes, setMinutes] = useState();
	const [seconds, setSeconds] = useState();

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
		<Window style={{ ...animation, transform: animation?.xys.to(trans) }}>
			<Box sx={{ padding: 0, width: '100%', display: 'flex-column', alignItems: 'center' }}>
				<Box sx={{ padding: 0, display: 'flex', width: '100%', justifyContent: 'center' }}>
					<Typography sx={{ fontWeight: 500 }} variant="h6">
						{date[3]} {date[2]}/{date[1]}/{date[0]}
					</Typography>
				</Box>
				<Box sx={{ padding: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
					<Typography sx={{ fontWeight: 700 }} variant="h5">
						{selectedCity?.name}&nbsp;
					</Typography>
					<Typography sx={{ fontWeight: 700, color: 'text.secondary' }} variant="h5">
						{selectedCity?.country}
					</Typography>
				</Box>

				<Typography
					sx={{ fontWeight: 700, color: 'text.secondary', display: 'flex', justifyContent: 'center' }}
					variant="h6"
				>
					{hours <= 9 ? '0' + hours : hours}:{minutes <= 9 ? '0' + minutes : minutes}:
					{seconds <= 9 ? '0' + seconds : seconds}
				</Typography>
			</Box>
		</Window>
	);
};

export default DateAndLocationWindow;

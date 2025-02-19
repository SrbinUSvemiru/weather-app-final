import { Grid2 as Grid, Skeleton, Tooltip, Typography } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { getDate, getTime, trans } from '../../utils/utils';
import { Window } from '../Window/Window';

const DateAndLocationWindow = ({ style, handleCloseCurrentWeather }) => {
	const [time, setTime] = useState('');

	const { selectedCity } = useContext(AppContext);

	const date = useMemo(
		() =>
			getDate({
				timezone: selectedCity?.current?.timezone,
			}),
		[selectedCity],
	);

	useEffect(() => {
		if (selectedCity) {
			const interval = setInterval(() => {
				const time = getTime({
					timezone: selectedCity?.current?.timezone,
				});
				setTime(time);
			}, 1000);

			return () => clearInterval(interval);
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
					<Tooltip title={date}>
						<Typography
							sx={{
								fontWeight: 500,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								color: 'text.secondary',
								whiteSpace: 'nowrap',
								wordWrap: 'normal',
							}}
							variant="h6"
						>
							{date}
						</Typography>
					</Tooltip>
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
						{!time ? <Skeleton sx={{ minWidth: '70px', borderRadius: '5px' }} /> : time}
					</Typography>
				</Grid>
			</Grid>
		</Window>
	);
};

export default DateAndLocationWindow;

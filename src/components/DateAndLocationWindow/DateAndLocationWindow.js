import { Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import React, { useContext, useMemo } from 'react';

import { AppContext } from '../../context/AppContext';
import { getDate } from '../../utils/utils';
import Clock from '../Clock/Clock';
import { Window } from '../Window/Window';

const DateAndLocationWindow = ({ handleCloseCurrentWeather, selectedCity }) => {
	const { selectedCity: city } = useContext(AppContext);
	const date = useMemo(
		() =>
			getDate({
				timezone: selectedCity?.timezone,
			}),
		[selectedCity],
	);

	return (
		<Window id={'date-and-location'} isDisabled={true} onButtonClick={handleCloseCurrentWeather}>
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
						{city?.name}&nbsp;
					</Typography>
					<Typography sx={{ fontWeight: 600, color: 'text.secondary' }} variant="h5">
						{city?.country}
					</Typography>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<Clock formatt="HH:mm:ss" offset={selectedCity?.timezone} />
				</Grid>
			</Grid>
		</Window>
	);
};

export default DateAndLocationWindow;

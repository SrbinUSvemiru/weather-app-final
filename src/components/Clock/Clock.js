import { Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { getTime } from '../../utils/utils';

const Clock = ({ offset = 0, formatt = 'HH:mm', local = false }) => {
	const [time, setTime] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			const time = getTime({
				timezone: offset,
				formatt: formatt,
				local: local,
			});
			setTime(time);
		}, 1000);

		return () => clearInterval(interval);
	}, [offset, formatt, local]);

	return (
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
	);
};

export default Clock;

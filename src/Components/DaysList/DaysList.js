import { Typography } from '@mui/material';
import React from 'react';
import { useSpring } from 'react-spring';

import { trans } from '../../utils/utils';
import { Day, Window, Wrapper } from './styled-components';

const DaysList = ({ data, activeDay, index, animation, setActiveDay }) => {
	const activeWrapper = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: activeDay === index ? 0.5 : 0,
			scale: activeDay === index ? '100%' : '0%',
		},
	});

	return (
		<Window onClick={() => setActiveDay(index)} style={{ ...animation, transform: animation?.xys.to(trans) }}>
			<Wrapper style={activeWrapper} />
			<Day>
				<img alt="weather-icon" src={`../icons/${data?.weather?.icon}.svg`} />
				<Typography fontWeight={600} sx={{ color: 'text.secondary' }} variant="subtitle1">
					{data?.day?.slice(0, 3)}
				</Typography>
			</Day>
		</Window>
	);
};

export default DaysList;

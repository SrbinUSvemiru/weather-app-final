import { Typography } from '@mui/material';
import React from 'react';
import { useSpring } from 'react-spring';

import { Window, Wrapper } from '../../styled-components';
import { trans } from '../../utils/utils';
import { Day } from './styled-components';

const DaysList = ({ data, activeDay, index, animation, setActiveDay }) => {
	const activeWrapper = useSpring({
		config: { mass: 1, tension: 500, friction: 50 },
		from: { opacity: 0, transform: 'translateY(-50%) scale(0)' },
		to: [
			{
				opacity: activeDay === index ? 1 : 0,
				transform: activeDay === index ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(0)',
				backgroundImage: 'linear-gradient(180deg, #c779d0, #4bc0c8)',
			},
			{ opacity: 0 },
		],
	});

	return (
		<Window
			bordercolor={activeDay === index ? '#c779d0' : ''}
			onClick={() => setActiveDay(index)}
			style={{ ...animation, transform: animation?.xys.to(trans), padding: '0.4rem 1rem' }}
		>
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

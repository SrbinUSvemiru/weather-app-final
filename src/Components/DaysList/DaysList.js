import React, { useState, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { Wrapper, Window, Day } from './styled-components';
import { animated, useSpring } from 'react-spring';
import { returnDay } from '../../Utils/utils';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

function DaysList({ data, activeDay, index, offset, animation, setActiveDay }) {
	const activeWrapper = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: activeDay === index ? 0.5 : 0,
			scale: activeDay === index ? '100%' : '0%',
		},
	});

	return (
		<Window
			style={{
				...animation,
			}}
			onClick={() => setActiveDay(index)}
		>
			<Wrapper style={activeWrapper} />
			<Day>
				<img src={`../icons/${data?.weather?.icon}.svg`} />
				<Typography variant="subtitle1" fontWeight={600} sx={{ color: 'text.secondary' }}>
					{data?.day?.slice(0, 3)}
				</Typography>
			</Day>
		</Window>
	);
}

export default DaysList;

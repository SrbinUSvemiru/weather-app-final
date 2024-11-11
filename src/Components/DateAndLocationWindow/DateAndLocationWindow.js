import React, { useMemo, useEffect, useState } from 'react';
import { Window } from './styled-components';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { returnDate, offsetDate } from '../../Utils/utils';

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
				animation,
				transform: animation.x.to((x) => `scale(${x})`),
			}}
		>
			<div className="row ">
				{date ? (
					<div id="date">
						<p id="day">{date[3]}</p>
						<p>{date[2]}/</p>
						<p>{date[1]}/</p>
						<p>{date[0]}</p>
					</div>
				) : (
					''
				)}
			</div>
			<div className="row">
				<p id="city-name">
					{currentCity?.name}&nbsp;
					<span>{currentCity?.country}</span>
				</p>
			</div>
			<div className="row-clock">
				<div id="expanded-clock">
					<p>{hours <= 9 ? '0' + hours : hours}:</p>
					<p>{minutes <= 9 ? '0' + minutes : minutes}:</p>
					<p>{seconds <= 9 ? '0' + seconds : seconds}</p>
				</div>
			</div>
		</Window>
	);
}

export default DateAndLocationWindow;

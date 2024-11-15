import React, { useEffect, useState } from 'react';
import { useSpring, config, animated } from 'react-spring';
import { RemoveButton, Tile, Spinner } from './styled-components';
import { offsetDate } from '../../Utils/utils';
import { useCurrentWeatherQuery } from '../../Queries/useCurrentWeatherQuery';
import { useQueryClient } from 'react-query';

function City({ city, setCurrentCity, setCities, cities }) {
	const [hours, setHours] = useState('');
	const [minutes, setMinutes] = useState('');
	const [seconds, setSeconds] = useState('');

	const { isLoading, data, isError, error } = useCurrentWeatherQuery({ city });

	useEffect(() => {
		if (data) {
			const interval = setInterval(() => {
				const time = offsetDate(data.timezone);
				setHours(time[0]);
				setMinutes(time[1]);
				setSeconds(time[2]);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isLoading]);

	const removeCity = (e) => {
		e.stopPropagation();
		let array = cities.filter((el, index) => {
			return el?.id !== city?.id;
		});
		setCities(array);
		localStorage.setItem('cities', JSON.stringify(array.map((element) => element)));
	};

	if (isLoading) {
		return (
			<Spinner>
				<img src="../loading-spinners.svg" />
			</Spinner>
		);
	}

	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<>
			<Tile onClick={() => setCurrentCity({ ...city, current: data })}>
				<div id="container">
					<h3>{city?.name}</h3>
					<p>{Math.round(data?.main?.temp * 2) / 2} &#176;C</p>
					<RemoveButton onClick={(e) => removeCity(e)}>
						<img src="./close-icon.png" />
					</RemoveButton>
				</div>
				<div className="icon">
					<img src={`../icons/${data?.weather?.[0].icon}.svg`} />
				</div>
				<div className="clock">
					<p>{hours <= 9 ? '0' + hours : hours}:</p>
					<p>{minutes <= 9 ? '0' + minutes : minutes}</p>
				</div>
			</Tile>
		</>
	);
}

export default City;

import React, { useEffect, useState } from 'react';
import { useSpring, config, animated } from 'react-spring';
import { RemoveButton, Tile, Spinner, EmptyCell } from './styled-components';
import { offsetDate } from '../../Utils/utils';
import { useCurrentWeatherQuery } from '../../Queries/useCurrentWeatherQuery';
import { useQueryClient } from 'react-query';
import { Grid2 as Grid, Typography } from '@mui/material';

function City({ city, setCurrentCity, setCities, cities }) {
	const [hours, setHours] = useState('');
	const [minutes, setMinutes] = useState('');
	const [seconds, setSeconds] = useState('');

	const { isLoading, data, isError, error } = useCurrentWeatherQuery({ city, options: { enabled: !!city?.id } });

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
		let array = cities?.filter((el, index) => {
			return el?.id !== city?.id;
		});

		setCities([...array, { id: '' }]);
		localStorage.setItem('cities', JSON.stringify([...array, { id: '' }]));
	};

	if (isError) {
		return <div>{error.message}</div>;
	}

	return city?.id ? (
		<Tile onClick={() => setCurrentCity({ ...city, current: data })}>
			{isLoading ? (
				<Spinner>
					<img src="../loading-spinners.svg" />
				</Spinner>
			) : (
				<Grid container>
					<Grid size={11}>
						<Typography variant="h6" noWrap fontWeight={700}>
							{city?.name}
						</Typography>
					</Grid>
					<Grid size={1}>
						<RemoveButton onClick={(e) => removeCity(e)}>
							<img src="./close-icon.png" />
						</RemoveButton>
					</Grid>
					<Grid size={6}>
						<div className="temperature">
							<img src={`../icons/${data?.weather?.[0].icon}.svg`} />
						</div>
					</Grid>
					<Grid size={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
						<Typography variant="h3">{Math.round(data?.main?.temp)}</Typography>
						<Typography variant="h5">&#176;C</Typography>
					</Grid>
					<Grid size={12} display={'flex'} justifyContent={'center'}>
						<Typography variant="h6">
							{hours <= 9 ? '0' + hours : hours}:{minutes <= 9 ? '0' + minutes : minutes}
						</Typography>
					</Grid>
				</Grid>
			)}
		</Tile>
	) : (
		<EmptyCell />
	);
}

export default City;

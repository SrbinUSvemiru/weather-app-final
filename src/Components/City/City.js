import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Grid2 as Grid, Icon, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';
import { useCurrentWeatherQuery } from '../../queries/useCurrentWeatherQuery';
import { offsetDate } from '../../utils/utils';
import { EmptyCell, Spinner, Tile } from './styled-components';

const City = ({ city, setCurrentCity }) => {
	const [hovered, setHovered] = useState(false);
	const [hours, setHours] = useState('');
	const [minutes, setMinutes] = useState('');
	const [, setSeconds] = useState('');

	const { cities, setCities } = useContext(AppContext);

	const { isLoading, data, isError, error } = useCurrentWeatherQuery({
		city,
		options: { enabled: !!city?.lat && !!city?.lon },
	});

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	const removeCity = (e) => {
		e.stopPropagation();
		let array = cities?.filter((el) => el?.id !== city?.id);

		setCities([...array, { id: uuid(), lat: '', lon: '' }]);
	};

	if (isError) {
		return <div>{error.message}</div>;
	}

	return city?.lon && city?.lat ? (
		<Tile
			hovered={hovered ? 'hovered' : 'not-hovered'}
			onClick={() => setCurrentCity({ ...city, current: data })}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{isLoading ? (
				<Spinner>
					<img alt="loading" src="../loading-spinners.svg" />
				</Spinner>
			) : (
				<Grid container sx={{ width: '100%' }}>
					<Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Typography fontWeight={700} noWrap variant="h6">
							{city?.name}
						</Typography>

						<Icon
							onClick={(e) => removeCity(e)}
							sx={{
								'&:hover': {
									color: 'secondary.main',
								},
							}}
						>
							<CloseOutlinedIcon />
						</Icon>
					</Grid>
					{/* <Grid size={6}>
						<div className="temperature">
							<img src={`../icons/${data?.weather?.[0].icon}.svg`} />
						</div>
					</Grid> */}
					<Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
						<Typography variant="h3">{Math.round(data?.main?.temp)}</Typography>
						<Typography variant="h5">&#176;C</Typography>
					</Grid>
					<Grid display={'flex'} justifyContent={'center'} size={12}>
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
};

export default City;

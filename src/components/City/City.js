import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Grid2 as Grid, Icon, Typography, useTheme } from '@mui/material';
import { findIndex } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useCurrentWeatherQuery } from '../../queries/useCurrentWeatherQuery';
import { offsetDate } from '../../utils/utils';
import { EmptyCell, Spinner, Tile } from './styled-components';

const City = ({ city, setCityToReplace, setIsDrawerOpen }) => {
	const [hovered, setHovered] = useState(false);
	const [hours, setHours] = useState('');
	const [minutes, setMinutes] = useState('');
	const [, setSeconds] = useState('');

	const { isXs } = useBreakpoint();

	const theme = useTheme();

	const { cities, setCities, setSelectedCity } = useContext(AppContext);

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
		const updatedCities = cities?.length ? [...cities] : [];
		const idx = findIndex(updatedCities, (el) => el?.id === city?.id);

		if (idx > -1) {
			updatedCities[idx] = { id: uuid(), lat: '', lon: '', weight: updatedCities[idx]?.weight };
		}

		setCities(updatedCities);
	};

	const handleAddCity = (e) => {
		e.stopPropagation();
		if (isXs) {
			setIsDrawerOpen(true);
		}
		setCityToReplace(city?.id);
	};

	if (isError) {
		return <div>{error.message}</div>;
	}

	return city?.lon && city?.lat ? (
		<Tile
			hovered={hovered ? 'hovered' : 'not-hovered'}
			onClick={() => setSelectedCity({ ...city, current: data })}
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
									scale: 1.2,
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
		<EmptyCell
			backgroundcolor={theme?.palette?.primary?.main}
			bordercolor={theme?.palette?.primary?.light}
			bordercolorhovered={theme?.palette?.primary?.highlight}
		>
			<Icon
				onClick={(e) => handleAddCity(e)}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '100%',
					cursor: 'pointer',
					color: 'primary.highlight',
				}}
			>
				<AddCircleOutlineOutlinedIcon sx={{ fontSize: '2rem', width: '100%' }} />
			</Icon>
		</EmptyCell>
	);
};

export default City;
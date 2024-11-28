import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Grid2 as Grid, Icon, Typography } from '@mui/material';
import { animated } from '@react-spring/web';
import { findIndex } from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useCurrentWeatherQuery } from '../../queries/useCurrentWeatherQuery';
import { getUnits, offsetDate } from '../../utils/utils';
import { EmptyCell, Spinner, Tile } from './styled-components';

const AnimatedGrid = animated(Grid);

const City = ({ city, setCityToReplace, setIsDrawerOpen }) => {
	const [hovered, setHovered] = useState(false);
	const [hours, setHours] = useState('');
	const [minutes, setMinutes] = useState('');
	const [, setSeconds] = useState('');

	const { isXs } = useBreakpoint();

	const { cities, settings, setCities, setSelectedCity } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	const [props] = useSpring(
		() => ({
			from: { transform: 'scaleY(0)', opacity: 0 },
			to: { transform: 'scaleY(1)', opacity: 1 },
			reset: true,
		}),
		[units],
	);

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
						<Typography
							fontWeight={700}
							noWrap
							sx={{ color: hovered ? 'secondary.main' : 'text.primary' }}
							variant="h6"
						>
							{city?.name}
						</Typography>

						<Icon
							onClick={(e) => removeCity(e)}
							sx={{
								color: 'text.primary',
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
					<AnimatedGrid
						size={12}
						style={props}
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
					>
						<Typography sx={{ color: 'text.primary', fontWeight: 500 }} variant="h3">
							{data?.temp?.[units]}
						</Typography>
						<Typography sx={{ color: 'text.primary' }} variant="h4">
							&#176;{getUnits()?.temp?.[units]}
						</Typography>
					</AnimatedGrid>
					<Grid display={'flex'} justifyContent={'center'} size={12}>
						<Typography sx={{ color: 'text.primary' }} variant="h6">
							{hours <= 9 ? '0' + hours : hours}:{minutes <= 9 ? '0' + minutes : minutes}
						</Typography>
					</Grid>
				</Grid>
			)}
		</Tile>
	) : (
		<EmptyCell>
			<Icon
				onClick={(e) => handleAddCity(e)}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '100%',
					cursor: 'pointer',
					color: 'text.secondary',
				}}
			>
				<AddCircleOutlineOutlinedIcon sx={{ fontSize: '2rem', width: '100%' }} />
			</Icon>
		</EmptyCell>
	);
};

export default City;

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Grid2 as Grid, Icon, Skeleton, Typography } from '@mui/material';
import { animated } from '@react-spring/web';
import { findIndex } from 'lodash';
import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';
import { useCurrentWeatherQuery } from '../../queries/useCurrentWeatherQuery';
import { getTime, getUnits, trans } from '../../utils/utils';
import { EmptyCell, Tile } from './styled-components';

const AnimatedTypography = animated(Typography);

const City = ({ city, setCityToReplace, index, setIsDrawerOpen, style, handleOpenCurrentWeather }) => {
	const [hovered, setHovered] = useState(false);

	const [time, setTime] = useState('');

	const isEmpty = useMemo(() => !city?.lon || !city?.lat, [city]);

	const { cities, settings, setCities, setSelectedCity } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	const { isLoading, data, isError, error } = useCurrentWeatherQuery({
		city,
		options: { enabled: !!city?.lat && !!city?.lon },
	});

	useEffect(() => {
		if (data) {
			const interval = setInterval(() => {
				const dateTime = getTime({
					timezone: data?.timezone,
					formatt: 'HH:mm',
				});
				setTime(dateTime);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [data]);

	const [props, api] = useSpring(() => ({
		x: 0,
		opacity: 0,
		immediate: true,
	}));

	useLayoutEffect(() => {
		if (!isLoading && time) {
			api?.start({
				from: { x: -20, opacity: 0 },
				to: { x: 0, opacity: 1 },
				immediate: false,
			});
		}
	}, [isLoading, time, api]);

	useLayoutEffect(() => {
		api?.start({
			from: {
				opacity: 0,
				transform: 'perspective(600px) rotateX(180deg)',
			},
			to: {
				transform: 'perspective(600px) rotateX(0deg)',
				opacity: 1,
			},
			immediate: false,
		});
	}, [units, api]);

	const handleRemoveCity = (e) => {
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
		setIsDrawerOpen(true);
		setCityToReplace(city?.id);
	};

	const handleTileClick = (e) => {
		e.stopPropagation();
		handleOpenCurrentWeather(e, index);
		setSelectedCity({ ...city, current: data });
	};

	if (isError) {
		return <div>{error?.message}</div>;
	}

	return (
		<Tile
			hovered={hovered && !isEmpty ? 'hovered' : 'not-hovered'}
			onClick={(e) => handleTileClick(e)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{ ...style, transform: style?.xys.to(trans), padding: isEmpty ? '0rem' : '1rem' }}
		>
			{isEmpty ? (
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
			) : (
				<Grid container sx={{ width: '100%' }}>
					<Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Typography
							fontWeight={700}
							noWrap
							sx={{ color: hovered ? 'secondary.light' : 'text.primary' }}
							variant="h6"
						>
							{isLoading || !time ? (
								<Skeleton sx={{ minWidth: '10rem', borderRadius: '5px' }} />
							) : (
								city?.name
							)}
						</Typography>

						<Icon
							onClick={(e) => handleRemoveCity(e)}
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
					<Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
						<AnimatedTypography style={props} sx={{ color: 'text.primary', fontWeight: 500 }} variant="h3">
							{isLoading || !time ? (
								<Skeleton sx={{ minWidth: '7rem', borderRadius: '5px' }} />
							) : (
								data?.temp?.[units]
							)}
						</AnimatedTypography>
						{isLoading || !time ? null : (
							<AnimatedTypography style={props} sx={{ color: 'text.primary' }} variant="h4">
								&#176;{getUnits()?.temp?.[units]}
							</AnimatedTypography>
						)}
					</Grid>
					<Grid display={'flex'} justifyContent={'center'} size={12}>
						<Typography
							sx={{
								color: 'text.primary',
							}}
							variant="h6"
						>
							{!time ? <Skeleton sx={{ minWidth: '70px', borderRadius: '5px' }} /> : time}
						</Typography>
					</Grid>
				</Grid>
			)}
		</Tile>
	);
};

export default City;

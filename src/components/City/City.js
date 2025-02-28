import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Grid2 as Grid, Icon, Skeleton, Typography, useTheme } from '@mui/material';
import { animated } from '@react-spring/web';
import { findIndex } from 'lodash';
import React, { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { v4 as uuid } from 'uuid';

import { AppContext } from '../../context/AppContext/provider';
import { useCurrentWeatherQuery } from '../../queries/useCurrentWeatherQuery';
import { getUnits } from '../../utils/utils';
import Clock from '../Clock/Clock';
import { EmptyCell, Tile } from './styled-components';

const AnimatedTypography = animated(Typography);

const City = ({ city, id, setCityToReplace, index, setHeaderClickedIcon, handleOpenCurrentWeather }) => {
	const [hovered, setHovered] = useState(false);

	const { cities, settings, setCities, setSelectedCity } = useContext(AppContext);

	const isEmpty = useMemo(() => !city?.lon || !city?.lat, [city]);
	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);
	const muiTheme = useTheme();

	const { isLoading, data, isError, error } = useCurrentWeatherQuery({
		city,
		options: { enabled: !!city?.lat && !!city?.lon },
	});

	const [props, api] = useSpring(() => ({
		x: 0,
		opacity: 0,
		immediate: true,
	}));

	useLayoutEffect(() => {
		if (!isLoading) {
			api?.start({
				from: { x: -20, opacity: 0 },
				to: { x: 0, opacity: 1 },
				immediate: false,
			});
		}
	}, [isLoading, api]);

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
		setHeaderClickedIcon('search');
		setCityToReplace(city?.id);
	};

	const handleTileClick = (e) => {
		e.stopPropagation();
		handleOpenCurrentWeather(e, index);
		setSelectedCity(city);
	};

	if (isError) {
		return <div>{error?.message}</div>;
	}

	return (
		<Tile
			hovered={hovered && !isEmpty ? 'hovered' : 'not-hovered'}
			id={id}
			isEmpty={isEmpty}
			onClick={(e) => handleTileClick(e)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			// style={{ ...style, transform: style?.xys.to(trans), padding: isEmpty ? '0rem' : '1rem' }}
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
				<Grid container spacing={0.5} sx={{ width: '100%' }}>
					<Grid size={12} sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
						<Typography
							fontWeight={700}
							noWrap
							sx={{
								color: 'text.primary',
							}}
							variant="h5"
						>
							{city?.name}
						</Typography>

						<Icon
							onClick={(e) => handleRemoveCity(e)}
							sx={{
								color: 'text.primary',
								display: 'flex',
								alignItems: 'start',
								'&:hover': {
									color: 'secondary.main',
									scale: 1.2,
								},
							}}
						>
							<CloseOutlinedIcon />
						</Icon>
					</Grid>
					<Grid size={6}>
						<Box
							sx={{
								maxWidth: '70px',
								filter: settings?.theme?.mode === 'light' ? 'brightness(0.95) saturate(2)' : '',
							}}
						>
							<img alt="weather-icon" src={`../icons/${data?.weather?.[0].icon}.svg`} />
						</Box>
					</Grid>
					<Grid size={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
						<AnimatedTypography
							style={props}
							sx={{
								background: `-webkit-linear-gradient(90deg, ${muiTheme?.palette?.text?.primary} ,  ${muiTheme?.palette?.temperature}  150%)`,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								fontWeight: 500,
							}}
							variant="h3"
						>
							{isLoading || !units ? (
								<Skeleton sx={{ minWidth: '7rem', borderRadius: '5px' }} />
							) : (
								data?.temp?.[units]
							)}
						</AnimatedTypography>
						{isLoading || !units ? null : (
							<AnimatedTypography
								style={props}
								sx={{
									background: `-webkit-linear-gradient(90deg, ${muiTheme?.palette?.text?.primary} ,  ${muiTheme?.palette?.temperature}  150%)`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}
								variant="h4"
							>
								&#176;{getUnits({ selected: 'temperature', units })}
							</AnimatedTypography>
						)}
					</Grid>
					<Grid display={'flex'} justifyContent={'center'} size={12}>
						<Clock formatt={'HH:mm'} offset={data?.timezone} />
					</Grid>
				</Grid>
			)}
		</Tile>
	);
};

export default City;

import { Grid2 as Grid } from '@mui/material';
import { animated } from '@react-spring/web';
import { compact, map } from 'lodash';
import React, { useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { useSprings } from 'react-spring';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useCurrentAirPolutionQuery } from '../../queries/useCurrentAirPolutionQuery';
import { useMultipleDaysForecastQuery } from '../../queries/useMultipleDaysForecastQuery';
import AlertMessageWindow from '../AlertMessageWindow/AlertMessageWindow';
import City from '../City/City';
import CurrentInfoWindow from '../CurrentInfoWindow/CurrentInfoWindow';
import DateAndLocationWindow from '../DateAndLocationWindow/DateAndLocationWindow';
import DisplayActiveDay from '../DisplayActiveDay/DisplayActiveDay';
import GraphWindow from '../GraphWindow/GraphWindow';
import TemperatureWindow from '../TemperatureWindow/TemperatureWindow';
import UVWindow from '../UVWindow/UVWindow';

const AnimatedGrid = animated(Grid);

const getGridItems = ({ isXs, airPollution, daysForecast, activeWrapper, handleCloseCurrentWeather }) =>
	compact([
		{
			size: { xs: 12, sm: 6, md: 4 },
			component: (props) => (
				<DateAndLocationWindow handleCloseCurrentWeather={handleCloseCurrentWeather} {...props} />
			),
		},
		isXs
			? {
					size: { xs: 12, sm: 6, md: 5 },
					component: (props) => (
						<TemperatureWindow {...props} handleCloseCurrentWeather={handleCloseCurrentWeather} />
					),
				}
			: null,
		{
			size: { xs: 12, sm: 6, md: 3 },
			component: (props) => (
				<AlertMessageWindow {...props} handleCloseCurrentWeather={handleCloseCurrentWeather} />
			),
		},
		{
			size: { xs: 12, sm: 6, md: 5 },
			component: (props) => (
				<UVWindow
					airPollution={airPollution?.list?.[0]}
					{...props}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
				/>
			),
		},
		!isXs
			? {
					size: { xs: 12, sm: 6, md: 5 },
					component: (props) => (
						<TemperatureWindow {...props} handleCloseCurrentWeather={handleCloseCurrentWeather} />
					),
				}
			: null,
		{
			size: { xs: 12, sm: 2, md: 1 },
			component: (props) => (
				<CurrentInfoWindow
					pop={daysForecast?.days?.[0]?.pop}
					{...props}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
				/>
			),
		},
		{
			size: { xs: 12, sm: 10, md: 6 },
			spacing: { xs: 1 },

			component: (props) => (
				<DisplayActiveDay
					daysForecast={daysForecast}
					{...props}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
				/>
			),
		},
		{
			size: 12,
			component: (props) => (
				<GraphWindow
					activeWrapper={activeWrapper}
					daysForecast={daysForecast}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
					id="graph-window"
					{...props}
				/>
			),
		},
	]);

const Expanded = ({ open, setOpen, isDrawerOpen, setIsDrawerOpen, setCityToReplace }) => {
	const { cities, selectedCity } = useContext(AppContext);

	const { isXs, isSm, isMd, isLg } = useBreakpoint();

	const { data: daysForecast } = useMultipleDaysForecastQuery({
		city: selectedCity,
		options: { enabled: !open },
	});
	const { data: airPollution } = useCurrentAirPolutionQuery({
		city: selectedCity,
		options: { enabled: !open },
	});

	const [springs, api] = useSprings(open ? 9 : 7, (i) => ({
		from: { opacity: 0, xys: [0, 0, 0, 50], backdropFilter: 'blur(0px)' },
		to: { opacity: 1, xys: [0, 0, 1, 0], backdropFilter: 'blur(7.5px)' },
		delay: i * 50,
		config: {
			tension: 500,
			friction: 50,
			mass: 3,
		},
	}));

	const handleOpenCurrentWeather = useCallback(
		(e, index) => {
			e?.preventDefault();
			if (!cities[index]?.lat || !cities[index]?.lon) {
				return;
			}

			api.start((i) => ({
				delay: () => i * 50,
				to: {
					opacity: 0,
					xys: [0, 0, 0, -50],
					backdropFilter: 'blur(0px)',
				},
				onRest: () => {
					setOpen(false);
				},
			}));
		},
		[cities, setOpen, api],
	);

	const handleCloseCurrentWeather = useCallback(() => {
		api.start((i) => ({
			delay: () => i * 50,
			to: {
				opacity: 0,
				xys: [0, 0, 0, -50],
			},
			onRest: () => {
				setOpen(true);
			},
		}));
	}, [setOpen, api]);

	const transitionComponents = useMemo(
		() => getGridItems({ isXs, isSm, isMd, isLg, handleCloseCurrentWeather, airPollution, daysForecast }),

		[airPollution, daysForecast, handleCloseCurrentWeather, isXs, isSm, isMd, isLg],
	);

	const citiesComponents = useMemo(
		() =>
			map(cities, (el, index) => ({
				size: { xs: 12, sm: 6, md: 4 },
				component: (props) => (
					<City
						{...props}
						city={el}
						handleOpenCurrentWeather={handleOpenCurrentWeather}
						index={index}
						isDrawerOpen={isDrawerOpen}
						setCityToReplace={setCityToReplace}
						setIsDrawerOpen={setIsDrawerOpen}
					/>
				),
			})),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[cities],
	);

	useLayoutEffect(() => {
		const client = document.getElementById('scrollable-container');
		api.start((i) => ({
			from: { opacity: 0, xys: [0, 0, 0, 50], backdropFilter: 'blur(0px)' },
			to: { opacity: 1, xys: [0, 0, 1, 0], backdropFilter: 'blur(7.5px)' },
			delay: () => i * 50,
			onRest: () =>
				client?.scrollTo({
					top: 0,
					behavior: 'smooth',
				}),
		}));
	}, [open, api]);

	return (
		<Grid
			container
			size={12}
			spacing={{ xs: 1 }}
			sx={{
				padding: 0,
				width: '100%',
				maxWidth: isXs ? '500px' : '1200px',
			}}
		>
			{map(springs, (style, index) => {
				const item = open ? citiesComponents?.[index] : transitionComponents?.[index];
				const Page = item?.component;

				return (
					<AnimatedGrid
						container={item?.spacing ? true : false}
						size={item?.size}
						spacing={item?.spacing || ''}
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
					>
						{Page ? <Page api={api} index={index} style={style} /> : <div>Invalid Component</div>}
					</AnimatedGrid>
				);
			})}
		</Grid>
	);
};

export default Expanded;

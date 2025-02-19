import { Grid2 as Grid } from '@mui/material';
import { animated } from '@react-spring/web';
import { compact, map } from 'lodash';
import React, { useCallback, useContext, useLayoutEffect, useMemo } from 'react';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useCurrentAirPolutionQuery } from '../../queries/useCurrentAirPolutionQuery';
import { useMultipleDaysForecastQuery } from '../../queries/useMultipleDaysForecastQuery';
import { getCloseAnimation, getOpenAnimation } from '../../utils/animations';
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
			size: { xs: 12, sm: 10, md: 7 },
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
			size: { xs: 12, sm: 12, md: 11 },
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

const Expanded = ({ isDrawerOpen, setIsDrawerOpen, setHeaderClickedIcon, setCityToReplace, api, springs }) => {
	const { cities, selectedCity, animation, setIsGridOpen, isGridOpen } = useContext(AppContext);

	const { isXs, isSm, isMd, isLg } = useBreakpoint();

	const { data: daysForecast } = useMultipleDaysForecastQuery({
		city: selectedCity,
		options: { enabled: !isGridOpen },
	});
	const { data: airPollution } = useCurrentAirPolutionQuery({
		city: selectedCity,
		options: { enabled: !isGridOpen },
	});

	const handleOpenCurrentWeather = useCallback(
		(e, index) => {
			e?.preventDefault();
			if (!cities[index]?.lat || !cities[index]?.lon) {
				return;
			}
			const client = document.getElementById('scrollable-container');

			const closeAnimation = getCloseAnimation({
				api,
				onRest: () => {
					setIsGridOpen(false);
				},
			});

			const openAnimation = () =>
				getOpenAnimation({
					api,
					onRest: () => {
						client?.scrollTo({
							top: 0,
							behavior: 'smooth',
						});
					},
				});

			closeAnimation.then(openAnimation).catch((error) => console.error('Animation error:', error));
		},
		[cities, setIsGridOpen, api],
	);

	const handleCloseCurrentWeather = useCallback(() => {
		const client = document.getElementById('scrollable-container');
		const closeAnimation = getCloseAnimation({
			api,
			onRest: () => {
				setIsGridOpen(true);
			},
		});

		const openAnimation = () =>
			getOpenAnimation({
				api,
				onRest: () => {
					client?.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
				},
			});

		closeAnimation.then(openAnimation).catch((error) => console.error('Animation error:', error));
	}, [setIsGridOpen, api]);

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
						openApi={api}
						setCityToReplace={setCityToReplace}
						setHeaderClickedIcon={setHeaderClickedIcon}
						setIsDrawerOpen={setIsDrawerOpen}
					/>
				),
			})),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[cities],
	);

	useLayoutEffect(() => {
		if (animation) {
			animation()
				.then(() => {
					console.log('Animation complete');
				})
				.catch((error) => console.error('Animation error in App:', error));
		}
	}, [animation]);

	return (
		<Grid
			container
			size={12}
			spacing={{ xs: 2 }}
			sx={{
				padding: 0,
				width: '100%',
				maxWidth: '1440px',
				position: 'relative',
			}}
		>
			{map(springs, (style, index) => {
				const item = isGridOpen ? citiesComponents?.[index] : transitionComponents?.[index];
				const Page = item?.component;

				return Page ? (
					<AnimatedGrid
						container={item?.spacing ? true : false}
						id={isGridOpen ? cities?.[index]?.id : ''}
						key={index}
						size={item?.size}
						spacing={item?.spacing || ''}
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
					>
						<Page api={api} index={index} style={style} />
					</AnimatedGrid>
				) : null;
			})}
		</Grid>
	);
};

export default Expanded;

import { Box, Grid2 as Grid } from '@mui/material';
import { animated, easings, useChain, useSpringRef, useTransition } from '@react-spring/web';
import { compact, map } from 'lodash';
import React, { useCallback, useContext, useLayoutEffect, useMemo } from 'react';

import { AppContext } from '../../context/AppContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import useMeasure from '../../hooks/useMeasure';
import { useCurrentAirPolutionQuery } from '../../queries/useCurrentAirPolutionQuery';
import { useCurrentWeatherQuery } from '../../queries/useCurrentWeatherQuery';
import { useMultipleDaysForecastQuery } from '../../queries/useMultipleDaysForecastQuery';
// import { useNewWeatherQuery } from '../../queries/useNewWeather';
import AlertMessageWindow from '../AlertMessageWindow/AlertMessageWindow';
import { BackButton } from '../BackButton/BackButton';
import City from '../City/City';
import CurrentInfoWindow from '../CurrentInfoWindow/CurrentInfoWindow';
import DateAndLocationWindow from '../DateAndLocationWindow/DateAndLocationWindow';
import DisplayActiveDay from '../DisplayActiveDay/DisplayActiveDay';
import GraphWindow from '../GraphWindow/GraphWindow';
import TemperatureWindow from '../TemperatureWindow/TemperatureWindow';
import UVWindow from '../UVWindow/UVWindow';

const AnimatedGrid = animated(Grid);

const getGridItems = ({ isXs, airPollution, daysForecast, activeWrapper, handleCloseCurrentWeather, data }) =>
	compact([
		{
			size: { xs: 12, sm: 6, md: 4 },
			id: 'date-window',
			component: (props) => (
				<DateAndLocationWindow
					handleCloseCurrentWeather={handleCloseCurrentWeather}
					selectedCity={data}
					{...props}
				/>
			),
		},
		isXs
			? {
					size: { xs: 12, sm: 6, md: 5 },
					id: 'temperature-window',
					component: (props) => (
						<TemperatureWindow
							selectedCity={data}
							{...props}
							handleCloseCurrentWeather={handleCloseCurrentWeather}
						/>
					),
				}
			: null,
		{
			size: { xs: 12, sm: 6, md: 3 },
			id: 'alert-message-window',
			component: (props) => (
				<AlertMessageWindow
					selectedCity={data}
					{...props}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
				/>
			),
		},
		{
			size: { xs: 12, sm: 6, md: 5 },
			id: 'uv-window',
			component: (props) => (
				<UVWindow
					airPollution={airPollution?.list?.[0]}
					selectedCity={data}
					{...props}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
				/>
			),
		},
		!isXs
			? {
					size: { xs: 12, sm: 6, md: 5 },
					id: 'temperature-window',
					component: (props) => (
						<TemperatureWindow
							selectedCity={data}
							{...props}
							handleCloseCurrentWeather={handleCloseCurrentWeather}
						/>
					),
				}
			: null,

		{
			size: { xs: 12, sm: 10, md: 7 },
			spacing: { xs: 1 },
			id: 'active-day-window',
			component: (props) => (
				<DisplayActiveDay
					daysForecast={daysForecast}
					selectedCity={data}
					{...props}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
				/>
			),
		},
		{
			size: { xs: 12, sm: 2, md: 1 },
			id: 'current-info-window',
			component: (props) => (
				<CurrentInfoWindow
					pop={daysForecast?.days?.[0]?.pop}
					selectedCity={data}
					{...props}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
				/>
			),
		},
		{
			size: { xs: 12, sm: 12, md: 11 },
			id: 'graph-window',
			component: (props) => (
				<GraphWindow
					activeWrapper={activeWrapper}
					daysForecast={daysForecast}
					handleCloseCurrentWeather={handleCloseCurrentWeather}
					selectedCity={data}
					{...props}
				/>
			),
		},
	]);

const Expanded = ({ setHeaderClickedIcon, setCityToReplace }) => {
	const { cities, selectedCity, setIsGridOpen, isGridOpen } = useContext(AppContext);

	const [ref, { width }] = useMeasure();

	const { isXs, isSm, isMd } = useBreakpoint();
	const columns = useMemo(() => (isXs ? 1 : isSm ? 2 : isMd ? 3 : 3), [isXs, isSm, isMd]);

	const [heights, gridItems] = useMemo(() => {
		let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
		let gridItems = map(cities, (child) => {
			const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
			const columnWidth = 260;
			const totalGridWidth = columns * columnWidth + (columns - 1) * 16; // Including spacing (16px)

			// Calculate the starting x position for each column
			let x;
			if (columns === 1) {
				x = (width - columnWidth) / 2; // Center single column
			} else if (columns === 2) {
				x = column === 0 ? (width - totalGridWidth) / 2 : (width + totalGridWidth) / 2 - columnWidth; // Space-between with centering
			} else if (columns === 3) {
				// Center columns with more emphasis on the middle one
				if (column === 0) {
					x = (width - totalGridWidth) / 2; // Left column gravitating towards the center
				} else if (column === 1) {
					x = (width - columnWidth) / 2; // Middle column centered
				} else {
					x = (width + totalGridWidth) / 2 - columnWidth; // Right column gravitating towards the center
				}
			} else {
				// More than 3 columns, distribute columns evenly but with a gravitation to the center
				const gap = (width - totalGridWidth) / (columns - 1); // Dynamic spacing between columns
				const startPosition = (width - totalGridWidth) / 2; // Starting offset to center the columns
				x = startPosition + column * (columnWidth + gap); // Apply the calculated starting position and distribute columns
			}

			const y = heights[column] + 16; // y = it's just the height of the current column
			heights[column] += 196.52; // Update the height of the column with the new item's height

			return { ...child, x, y };
		});

		return [heights, gridItems];
	}, [columns, cities, width]);

	const handleOpenCurrentWeather = useCallback(
		(e, index) => {
			e?.preventDefault();
			if (!cities[index]?.lat || !cities[index]?.lon) {
				return;
			}
			setIsGridOpen(false);
		},
		[cities, setIsGridOpen],
	);

	const handleCloseCurrentWeather = useCallback(() => {
		setIsGridOpen(true);
	}, [setIsGridOpen]);

	const { data } = useCurrentWeatherQuery({
		city: selectedCity,
		options: { enabled: !isGridOpen },
	});

	const { data: daysForecast } = useMultipleDaysForecastQuery({
		city: { ...selectedCity, timezone: data?.timezone },
		options: { enabled: !isGridOpen && !!data },
	});

	const { data: airPollution } = useCurrentAirPolutionQuery({
		city: selectedCity,
		options: { enabled: !isGridOpen },
	});

	const transitionComponents = useMemo(
		() => getGridItems({ isXs, isSm, isMd, handleCloseCurrentWeather, airPollution, daysForecast, data }),

		[airPollution, daysForecast, data, handleCloseCurrentWeather, isXs, isSm, isMd],
	);

	const transApi = useSpringRef();

	const transitions = useTransition(isGridOpen ? gridItems : [], {
		ref: transApi,
		key: (item) => item.id,
		from: ({ x, y }) => ({ x, y, opacity: 0, scale: 0.1 }),
		enter: ({ x, y }) => ({ x, y, opacity: 1, scale: 1 }),
		update: ({ x, y }) => ({ x, y, scale: 1 }),
		leave: { opacity: 0, scale: 0.1 },
		config: { easing: easings?.easeInOutBack, duration: 700 },
		trail: 200 / gridItems?.length,
	});

	const transTwoApi = useSpringRef();
	const transitionsTwo = useTransition(!isGridOpen ? transitionComponents : [], {
		ref: transTwoApi,
		enabled: !!transitionComponents,
		key: (item) => item.id,
		from: ({ x, y }) => ({ x, y, opacity: 0, scale: 0.1 }),
		enter: ({ x, y }) => ({ x, y, opacity: 1, scale: 1 }),
		update: ({ x, y }) => ({ x, y, scale: 1 }),
		leave: { opacity: 0, scale: 0.1 },
		config: { easing: easings?.easeInOutBack, duration: 500 },
		trail: 200 / transitionComponents?.length,
	});

	useLayoutEffect(() => {
		const client = document.getElementById('scrollable-container');

		client?.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, [isGridOpen]);

	useChain(isGridOpen ? [transTwoApi, transApi] : [transApi, transTwoApi], [0, isGridOpen ? 0.1 : 0.4]);

	return (
		<Grid
			container
			ref={ref}
			size={12}
			spacing={2}
			style={{ height: isGridOpen ? Math.max(...heights) : 'fit-content' }}
			sx={{
				padding: 0,
				width: '100%',
				maxWidth: '1440px',
				position: 'relative',
			}}
		>
			<Box
				sx={{
					padding: 0,
					position: 'fixed',
					left: '15px',
					top: '50%',
					transform: 'translateY(-50%)',
					zIndex: 1000,
				}}
			>
				<BackButton inView={!isGridOpen} onClick={() => setIsGridOpen(true)} />
			</Box>
			{transitions((style, item, _, index) => (
				<AnimatedGrid
					id={cities?.[index]?.id}
					key={index}
					style={{ ...style, transform: style.transform?.to((t) => `${t} translateZ(${style.z}px)`) }}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						height: '182.52px',
					}}
				>
					<City
						city={item}
						handleOpenCurrentWeather={handleOpenCurrentWeather}
						index={index}
						setCityToReplace={setCityToReplace}
						setHeaderClickedIcon={setHeaderClickedIcon}
					/>
				</AnimatedGrid>
			))}
			{transitionsTwo((style, item, _, index) => {
				const Page = item?.component;

				return Page ? (
					<AnimatedGrid
						container={item?.spacing ? true : false}
						key={index}
						size={item?.size}
						spacing={item?.spacing || ''}
						style={{ ...style }}
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
					>
						<Page index={index} />
					</AnimatedGrid>
				) : null;
			})}
		</Grid>
	);
};

export default Expanded;

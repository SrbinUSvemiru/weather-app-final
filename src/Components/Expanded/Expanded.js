import React, { useState, useEffect } from 'react';

import {
	LeftSideContainer,
	RightSideContainer,
	Container,
	Window,
	TopContainer,
	Visibility,
	Moon,
	DaysRow,
	ArrowBack,
	MoonWindow,
} from './styled-components';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import GraphWindow from '../GraphWindow/GraphWindow';

import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { useCurrentAirPolutionQuery } from '../../Queries/useCurrentAirPolutionQuery';
import DaysList from '../DaysList/DaysList';
import { animated } from '@react-spring/web';
import DisplayActiveDay from '../DisplayActiveDay/DisplayActiveDay';
import TemperatureWindow from '../TemperatureWindow/TemperatureWindow';
import UVWindow from '../UVWindow/UVWindow';
import CurrentInfoWindow from '../CurrentInfoWindow/CurrentInfoWindow';
import DateAndLocationWindow from '../DateAndLocationWindow/DateAndLocationWindow';
import AlertMessageWindow from '../AlertMessageWindow/AlertMessageWindow';
import { useMultipleDaysForecastQuery } from '../../Queries/useMultipleDaysForecastQuery';
import { Grid2 as Grid, Button } from '@mui/material';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { moonPhase, trans } from '../../Utils/utils';

const AnimatedGrid = animated(Grid);

const colors = () => ({
	temperature: ['#f7e199', '#f7c2b2'],
	humidity: ['#4facfe', '#00f2fe'],
	precipitation: ['#e0c3fc', '#8ec5fc'],
	wind: ['#abecd6', '#fbed96'],
});

function Expanded({ currentCity, open, handleCloseCurrentWeather, animation }) {
	const [activeDay, setActiveDay] = useState(0);
	const [activeWrapper, setActiveWrapper] = useState('temperature');
	const { isXs, isSm, isMd } = useBreakpoint();

	const { data: daysForecast, isLoading: isLoadingForecast } = useMultipleDaysForecastQuery({
		city: currentCity,
		options: { enabled: !open },
	});
	const { data: airPollution, isLoading: isLoadingAirPollution } = useCurrentAirPolutionQuery({
		city: currentCity,
		options: { enabled: !open },
	});

	return !isLoadingAirPollution && !isLoadingForecast ? (
		<Grid
			container
			size={12}
			spacing={{ xs: 1, sm: 2 }}
			sx={{
				position: 'absolute',
				padding: isXs ? '0.5rem' : '2rem',
				paddingTop: 0,
				width: '100%',
				paddingBottom: '3rem',
				top: isXs ? 90 : 150,
				zIndex: !open ? 100 : -100,
				maxWidth: isXs ? '500px' : '1200px',
			}}
		>
			<Grid size={{ xs: 12, sm: 6, md: 4 }}>
				<DateAndLocationWindow currentCity={currentCity} animation={animation[0]} />
			</Grid>

			{isXs ? (
				<Grid size={{ xs: 12, sm: 6, md: 5 }}>
					<TemperatureWindow
						currentCity={currentCity}
						animation={animation[3]}
						setActiveWrapper={setActiveWrapper}
						activeWrapper={activeWrapper}
						colors={colors()[activeWrapper]}
					/>
				</Grid>
			) : null}
			<Grid size={{ xs: 12, sm: 6, md: 3 }}>
				<AlertMessageWindow currentCity={currentCity} animation={animation[1]} />
			</Grid>
			<Grid size={{ xs: 12, sm: 6, md: 5 }}>
				<UVWindow
					airPollution={airPollution?.list?.[0]}
					animation={animation[2]}
					setActiveWrapper={setActiveWrapper}
					activeWrapper={activeWrapper}
					colors={colors()[activeWrapper]}
				/>
			</Grid>
			{!isXs ? (
				<Grid size={{ xs: 12, sm: 6, md: 5 }}>
					<TemperatureWindow
						currentCity={currentCity}
						animation={animation[3]}
						setActiveWrapper={setActiveWrapper}
						activeWrapper={activeWrapper}
						colors={colors()[activeWrapper]}
					/>
				</Grid>
			) : null}

			<Grid size={{ xs: 12, sm: 2, md: 1 }}>
				<CurrentInfoWindow
					currentCity={{ ...currentCity }}
					pop={daysForecast?.days?.[0]?.pop}
					animation={animation[4]}
					setActiveWrapper={setActiveWrapper}
					activeWrapper={activeWrapper}
					colors={colors()[activeWrapper]}
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 10, md: 6 }} container spacing={{ xs: 1, sm: 2 }}>
				<DisplayActiveDay
					activeDay={daysForecast?.days?.[activeDay]}
					currentCity={currentCity}
					animation={animation[5]}
				/>
				<AnimatedGrid
					container
					spacing={{ xs: 0.5, sm: 2 }}
					size={12}
					style={{ ...animation?.[6], transform: animation?.[6]?.xys.to(trans) }}
				>
					{daysForecast?.days?.map((day, index) => (
						<Grid size={2} key={index}>
							<DaysList
								data={day}
								index={index}
								activeDay={activeDay}
								currentCity={currentCity}
								activeWrapper={activeWrapper}
								animation={animation[6]}
								setActiveDay={setActiveDay}
							/>
						</Grid>
					))}
				</AnimatedGrid>
			</Grid>

			<Grid size={12}>
				<GraphWindow
					currentCity={currentCity}
					animation={animation[7]}
					daysForecast={daysForecast}
					activeWrapper={activeWrapper}
					colors={colors()[activeWrapper]}
				/>
			</Grid>
		</Grid>
	) : null;
}

export default Expanded;

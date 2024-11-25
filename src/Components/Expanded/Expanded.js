import { Grid2 as Grid } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useState } from 'react';

import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useCurrentAirPolutionQuery } from '../../queries/useCurrentAirPolutionQuery';
import { useMultipleDaysForecastQuery } from '../../queries/useMultipleDaysForecastQuery';
import { trans } from '../../utils/utils';
import AlertMessageWindow from '../AlertMessageWindow/AlertMessageWindow';
import CurrentInfoWindow from '../CurrentInfoWindow/CurrentInfoWindow';
import DateAndLocationWindow from '../DateAndLocationWindow/DateAndLocationWindow';
import DaysList from '../DaysList/DaysList';
import DisplayActiveDay from '../DisplayActiveDay/DisplayActiveDay';
import GraphWindow from '../GraphWindow/GraphWindow';
import TemperatureWindow from '../TemperatureWindow/TemperatureWindow';
import UVWindow from '../UVWindow/UVWindow';

const AnimatedGrid = animated(Grid);

const colors = () => ({
	temperature: ['#f7e199', '#f7c2b2'],
	humidity: ['#4facfe', '#00f2fe'],
	precipitation: ['#e0c3fc', '#8ec5fc'],
	wind: ['#abecd6', '#fbed96'],
});

const Expanded = ({ currentCity, open, animation }) => {
	const [activeDay, setActiveDay] = useState(0);
	const [activeWrapper, setActiveWrapper] = useState('temperature');
	const { isXs } = useBreakpoint();

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
				<DateAndLocationWindow animation={animation[0]} currentCity={currentCity} />
			</Grid>

			{isXs ? (
				<Grid size={{ xs: 12, sm: 6, md: 5 }}>
					<TemperatureWindow
						activeWrapper={activeWrapper}
						animation={animation[3]}
						colors={colors()[activeWrapper]}
						currentCity={currentCity}
						setActiveWrapper={setActiveWrapper}
					/>
				</Grid>
			) : null}
			<Grid size={{ xs: 12, sm: 6, md: 3 }}>
				<AlertMessageWindow animation={animation[1]} currentCity={currentCity} />
			</Grid>
			<Grid size={{ xs: 12, sm: 6, md: 5 }}>
				<UVWindow
					activeWrapper={activeWrapper}
					airPollution={airPollution?.list?.[0]}
					animation={animation[2]}
					colors={colors()[activeWrapper]}
					setActiveWrapper={setActiveWrapper}
				/>
			</Grid>
			{!isXs ? (
				<Grid size={{ xs: 12, sm: 6, md: 5 }}>
					<TemperatureWindow
						activeWrapper={activeWrapper}
						animation={animation[3]}
						colors={colors()[activeWrapper]}
						currentCity={currentCity}
						setActiveWrapper={setActiveWrapper}
					/>
				</Grid>
			) : null}

			<Grid size={{ xs: 12, sm: 2, md: 1 }}>
				<CurrentInfoWindow
					activeWrapper={activeWrapper}
					animation={animation[4]}
					colors={colors()[activeWrapper]}
					currentCity={{ ...currentCity }}
					pop={daysForecast?.days?.[0]?.pop}
					setActiveWrapper={setActiveWrapper}
				/>
			</Grid>

			<Grid container size={{ xs: 12, sm: 10, md: 6 }} spacing={{ xs: 1, sm: 2 }}>
				<DisplayActiveDay
					activeDay={daysForecast?.days?.[activeDay]}
					animation={animation[5]}
					currentCity={currentCity}
				/>
				<AnimatedGrid
					container
					size={12}
					spacing={{ xs: 0.5, sm: 2 }}
					style={{ ...animation?.[6], transform: animation?.[6]?.xys.to(trans) }}
				>
					{daysForecast?.days?.map((day, index) => (
						<Grid key={index} size={2}>
							<DaysList
								activeDay={activeDay}
								activeWrapper={activeWrapper}
								animation={animation[6]}
								currentCity={currentCity}
								data={day}
								index={index}
								setActiveDay={setActiveDay}
							/>
						</Grid>
					))}
				</AnimatedGrid>
			</Grid>

			<Grid size={12}>
				<GraphWindow
					activeWrapper={activeWrapper}
					animation={animation[7]}
					colors={colors()[activeWrapper]}
					currentCity={currentCity}
					daysForecast={daysForecast}
				/>
			</Grid>
		</Grid>
	) : null;
};

export default Expanded;

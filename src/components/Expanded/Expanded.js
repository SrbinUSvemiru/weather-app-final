import { Grid2 as Grid } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useState } from 'react';

import { AppContext } from '../../context/AppContext';
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

const Expanded = ({ open, animation }) => {
	const [activeDay, setActiveDay] = useState(0);
	const [activeWrapper, setActiveWrapper] = useState('temperature');
	const { isXs } = useBreakpoint();

	const { selectedCity } = useContext(AppContext);

	const { data: daysForecast, isLoading: isLoadingForecast } = useMultipleDaysForecastQuery({
		city: selectedCity,
		options: { enabled: !open },
	});
	const { data: airPollution, isLoading: isLoadingAirPollution } = useCurrentAirPolutionQuery({
		city: selectedCity,
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
				<DateAndLocationWindow animation={animation[0]} selectedCity={selectedCity} />
			</Grid>

			{isXs ? (
				<Grid size={{ xs: 12, sm: 6, md: 5 }}>
					<TemperatureWindow
						activeWrapper={activeWrapper}
						animation={animation[3]}
						selectedCity={selectedCity}
						setActiveWrapper={setActiveWrapper}
					/>
				</Grid>
			) : null}
			<Grid size={{ xs: 12, sm: 6, md: 3 }}>
				<AlertMessageWindow animation={animation[1]} selectedCity={selectedCity} />
			</Grid>
			<Grid size={{ xs: 12, sm: 6, md: 5 }}>
				<UVWindow
					activeWrapper={activeWrapper}
					airPollution={airPollution?.list?.[0]}
					animation={animation[2]}
					setActiveWrapper={setActiveWrapper}
				/>
			</Grid>
			{!isXs ? (
				<Grid size={{ xs: 12, sm: 6, md: 5 }}>
					<TemperatureWindow
						activeWrapper={activeWrapper}
						animation={animation[3]}
						selectedCity={selectedCity}
						setActiveWrapper={setActiveWrapper}
					/>
				</Grid>
			) : null}

			<Grid size={{ xs: 12, sm: 2, md: 1 }}>
				<CurrentInfoWindow
					activeWrapper={activeWrapper}
					animation={animation[4]}
					pop={daysForecast?.days?.[0]?.pop}
					selectedCity={selectedCity}
					setActiveWrapper={setActiveWrapper}
				/>
			</Grid>

			<Grid container size={{ xs: 12, sm: 10, md: 6 }} spacing={{ xs: 1, sm: 2 }}>
				<Grid size={12}>
					<DisplayActiveDay
						animation={animation[5]}
						data={daysForecast?.days?.[activeDay]}
						selectedCity={selectedCity}
					/>
				</Grid>
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
					daysForecast={daysForecast}
					selectedCity={selectedCity}
				/>
			</Grid>
		</Grid>
	) : null;
};

export default Expanded;

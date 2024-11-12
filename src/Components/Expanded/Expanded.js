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
	MoonWindow,
} from './styled-components';

import GraphWindow from '../GraphWindow/GraphWindow';

import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import DaysList from '../DaysList/DaysList';
import DisplayActiveDay from '../DisplayActiveDay/DisplayActiveDay';
import TemperatureWindow from '../TemperatureWindow/TemperatureWindow';
import UVWindow from '../UVWindow/UVWindow';
import CurrentInfoWindow from '../CurrentInfoWindow/CurrentInfoWindow';
import DateAndLocationWindow from '../DateAndLocationWindow/DateAndLocationWindow';
import AlertMessageWindow from '../AlertMessageWindow/AlertMessageWindow';
import { useMultipleDaysForecastQuery } from '../../Queries/useMultipleDaysForecastQuery';
import { moonPhase } from '../../Utils/utils';

function Expanded({ currentCity, open, setOpen, animation }) {
	const [activeDay, setActiveDay] = useState(0);
	const [activeWrapper, setActiveWrapper] = useState('temperature');
	const [moon, setMoon] = useState();

	const { data: daysForecast } = useMultipleDaysForecastQuery({ city: currentCity });

	console.log(currentCity);

	const handleBackClick = () => {
		setActiveDay(0);
		setActiveWrapper('temperature');
		setOpen(!open);
	};

	return (
		<Container>
			<div id="back-arrow-container">
				<Window
					onClick={() => handleBackClick()}
					style={{
						...animation,
						transform: animation.x.to((x) => `scale(${x})`),
					}}
				>
					<img src="../back-arrow.png" />
				</Window>
			</div>

			<TopContainer>
				<LeftSideContainer>
					<div className="row">
						<TemperatureWindow
							currentCity={currentCity}
							animation={animation}
							setActiveWrapper={setActiveWrapper}
							activeWrapper={activeWrapper}
						/>
					</div>
					<div className="row">
						<UVWindow
							currentCity={currentCity}
							animation={animation}
							setActiveWrapper={setActiveWrapper}
							activeWrapper={activeWrapper}
						/>
					</div>
					<div className="row">
						<CurrentInfoWindow
							currentCity={{ ...currentCity }}
							pop={daysForecast?.days?.[0]?.pop}
							animation={animation}
							setActiveWrapper={setActiveWrapper}
							activeWrapper={activeWrapper}
						/>
					</div>
				</LeftSideContainer>
				<RightSideContainer>
					<div className="row">
						<AlertMessageWindow currentCity={currentCity} animation={animation} />

						<DateAndLocationWindow currentCity={currentCity} animation={animation} />
					</div>
					<div className="row">
						<DisplayActiveDay
							activeDay={daysForecast?.days?.[activeDay]}
							currentCity={currentCity}
							animation={animation}
						/>
					</div>
					<DaysRow>
						{daysForecast?.days?.map((day, index) => (
							<DaysList
								data={day}
								index={index}
								activeDay={activeDay}
								currentCity={currentCity}
								activeWrapper={activeWrapper}
								animation={animation}
								setActiveDay={setActiveDay}
							/>
						))}
					</DaysRow>
				</RightSideContainer>
			</TopContainer>
			<div className="row detailed">
				<GraphWindow
					currentCity={currentCity}
					animation={animation}
					daysForecast={daysForecast}
					activeWrapper={activeWrapper}
				/>
			</div>
		</Container>
	);
}

export default Expanded;

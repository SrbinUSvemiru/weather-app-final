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

	const data = useGetFetchedQuery(currentCity);
	const { data: daysForecast } = useMultipleDaysForecastQuery({ city: currentCity });
	console.log(daysForecast);

	useEffect(() => {
		if (data) setMoon(moonPhase(data?.daily?.[0]?.moon_phase));
	}, [data]);

	const handleBackClick = () => {
		setActiveDay(0);
		setActiveWrapper('temperature');
		setOpen(!open);
	};

	if (data)
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
								pop={daysForecast?.[0]?.pop}
								animation={animation}
								setActiveWrapper={setActiveWrapper}
								activeWrapper={activeWrapper}
							/>
						</div>
					</LeftSideContainer>
					<RightSideContainer>
						<div className="row">
							<MoonWindow
								style={{
									...animation,
									transform: animation.x.to((x) => `scale(${x})`),
								}}
							>
								<Moon>
									<div id="moon-img" title={moon?.name}>
										<img src={`./moon-icons/${moon?.src}`} />
									</div>
								</Moon>
							</MoonWindow>
							<AlertMessageWindow currentCity={currentCity} animation={animation} />

							<DateAndLocationWindow currentCity={currentCity} animation={animation} />
						</div>
						<div className="row">
							<DisplayActiveDay
								activeDay={daysForecast?.[activeDay]}
								currentCity={currentCity}
								animation={animation}
							/>
						</div>
						<DaysRow>
							{daysForecast?.map((day, index) => (
								<DaysList
									data={day}
									index={index}
									offset={data.timezone_offset}
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

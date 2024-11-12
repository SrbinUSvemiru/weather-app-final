import React, { useEffect, useState, useMemo } from 'react';
import { SvgContainer, TimeList, Container, ButtonHourly, ButtonDaily, Window } from './styled-components';
import { nextFourtyEightHours, returnDays } from '../../Utils/utils';
import { set, slice } from 'lodash';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import TemperatureSvg from '../TemperatureSvg/TemperatureSvg';
import WindSvg from '../WindSvg/WindSvg';
import UVSvg from '../UVSvg/UVSvg';
import PrecipitationSvg from '../PrecipitationSvg/PrecipitationSvg';
import VisibilitySvg from '../VisibilitySvg/VisibilitySvg';

function GraphWindow({ daysForecast, currentCity, activeWrapper, animation }) {
	const [clicked, setClicked] = useState('hourly');
	const [hoursList, setHoursList] = useState();

	const [graphData, setGraphData] = useState();

	console.log(daysForecast);

	useEffect(() => {
		if (daysForecast) {
			const data = {
				temperature: { daily: [], hourly: [] },
				wind: { daily: [], hourly: [] },
				humidity: { daily: [], hourly: [] },
				precipitation: { daily: [], hourly: [] },
			};
			const daily = daysForecast?.days;
			const hourly = slice(daysForecast?.hours, 0, 16);

			for (let i = 0; i < daily?.length; i++) {
				set(data, 'temperature.daily', [...data.temperature.daily, daily[i].temp]);
				set(data, 'wind.daily', [...data.wind.daily, { value: daily[i].wind_speed, deg: daily[i].wind_deg }]);
				set(data, 'humidity.daily', [...data.humidity.daily, daily[i].humidity]);
				set(data, 'precipitation.daily', [...data.precipitation.daily, daily[i].pop]);
			}
			for (let i = 0; i < hourly?.length; i++) {
				set(data, 'temperature.hourly', [...data.temperature.hourly, hourly[i].main.temp]);
				set(data, 'wind.hourly', [
					...data.wind.hourly,
					{ value: hourly[i].wind.speed, deg: hourly[i].wind.deg },
				]);
				set(data, 'humidity.hourly', [...data.humidity.hourly, hourly[i].main.humidity]);
				set(data, 'precipitation.hourly', [...data.precipitation.hourly, hourly[i].pop]);
			}

			setGraphData(data);
		}
	}, [daysForecast]);

	useEffect(() => {
		setHoursList(() => {
			return nextFourtyEightHours(currentCity?.current?.timezone).map((hour) => {
				return hour < 10 ? `0${hour}:00` : `${hour}:00`;
			});
		});

		setClicked('hourly');
	}, [currentCity]);

	return (
		<Window
			style={{
				...animation,
				transform: animation.x.to((x) => `scale(${x})`),
			}}
		>
			<Container>
				<div id="buttons-container">
					<ButtonHourly onClick={() => setClicked('hourly')} value={clicked}>
						48 hours
					</ButtonHourly>
					<ButtonDaily onClick={() => setClicked('daily')} value={clicked}>
						7 days
					</ButtonDaily>
				</div>
				{graphData ? (
					<SvgContainer>
						{activeWrapper === 'temperature' && (
							<TemperatureSvg
								graphData={graphData}
								clicked={clicked}
								hoursList={hoursList}
								activeWrapper={activeWrapper}
							/>
						)}
						{activeWrapper === 'wind' && (
							<WindSvg
								graphData={graphData}
								clicked={clicked}
								hoursList={hoursList}
								activeWrapper={activeWrapper}
							/>
						)}
						{activeWrapper === 'precipitation' || activeWrapper === 'humidity' ? (
							<PrecipitationSvg
								graphData={graphData}
								clicked={clicked}
								hoursList={hoursList}
								activeWrapper={activeWrapper}
							/>
						) : null}
						{activeWrapper === 'humidity' ? (
							<VisibilitySvg
								graphData={graphData}
								clicked={clicked}
								hoursList={hoursList}
								activeWrapper={activeWrapper}
							/>
						) : null}
					</SvgContainer>
				) : null}
				<TimeList>
					{clicked === 'hourly'
						? hoursList?.map((hour) => <div>{hour}</div>)
						: daysForecast?.days?.map((day) => <div>{day?.day}</div>)}
				</TimeList>
			</Container>
		</Window>
	);
}

export default GraphWindow;

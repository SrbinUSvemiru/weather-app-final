import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { MainWeather, Window } from './styled-components';
import { moonPhase } from '../../Utils/utils';

function DisplayActiveDay({ currentCity, activeDay, animation }) {
	const sunrise = useMemo(() => {
		const d = new Date(currentCity?.current?.sys?.sunrise * 1000 + currentCity?.current?.timezone * 1000);
		let hrs = d.getUTCHours();
		let mins = d.getUTCMinutes();
		return [hrs, mins];
	}, [currentCity]);
	const sunset = useMemo(() => {
		const d = new Date(currentCity?.current?.sys?.sunset * 1000 + currentCity?.current?.timezone * 1000);
		let hrs = d.getUTCHours();
		let mins = d.getUTCMinutes();
		return [hrs, mins];
	}, [currentCity]);

	return (
		<Window
			style={{
				...animation,
				transform: animation.x.to((x) => `scale(${x})`),
			}}
		>
			<MainWeather>
				<div id="whole">
					<div id="side">
						<div className="row">
							<div id="container">
								<h4>Temperature</h4>
								<p>
									{Math.round(activeDay?.max_temp * 10) / 10}&#176;C /{' '}
									{Math.round(activeDay?.min_temp * 10) / 10}
									&#176;C
								</p>
							</div>
						</div>
						<div className="row">
							<div id="container">
								<h4>Wind</h4>
								<p>{Math.round(activeDay?.wind_speed * 3.5)}km/h</p>
							</div>
						</div>
						<div className="row">
							<div id="container">
								<h4>Pressure</h4>
								<p>{activeDay?.pressure}mb</p>
							</div>
						</div>
					</div>
					<div id="side">
						<div className="row">
							<div id="container">
								<div id="sun">
									<img src="./sunrise.png" />
									<p id="time">
										{`${sunrise?.[0] <= 9 ? '0' + sunrise?.[0] : sunrise?.[0]}:${
											sunrise?.[1] <= 9 ? '0' + sunrise?.[1] : sunrise?.[1]
										}h`}
									</p>
								</div>
								<div id="sun">
									<img src="./sunset.png" />
									<p id="time">
										{`${sunset?.[0] <= 9 ? '0' + sunset?.[0] : sunset?.[0]}:${
											sunset?.[1] <= 9 ? '0' + sunset?.[1] : sunset?.[1]
										}h`}
									</p>
								</div>
							</div>
						</div>
						<div className="row">
							<div id="container">
								<h4>Cloud cover</h4>
								<p>{activeDay?.clouds}%</p>
							</div>
						</div>
						<div className="row">
							<div id="container">
								<h4>Highest UV</h4>
								<p>
									{activeDay?.uvi}
									uv
								</p>
							</div>
						</div>
					</div>
				</div>
			</MainWeather>
		</Window>
	);
}

export default DisplayActiveDay;

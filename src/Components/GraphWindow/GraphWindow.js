import React, { useEffect, useState, useMemo, useRef } from 'react';
import { SvgContainer, TimeList, Container, ButtonHourly, ButtonDaily, Window } from './styled-components';
import { nextFourtyEightHours, returnDays } from '../../Utils/utils';
import { set, slice } from 'lodash';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import TemperatureSvg from '../TemperatureSvg/TemperatureSvg';
import WindSvg from '../WindSvg/WindSvg';
import UVSvg from '../UVSvg/UVSvg';
import PrecipitationSvg from '../PrecipitationSvg/PrecipitationSvg';
import VisibilitySvg from '../VisibilitySvg/VisibilitySvg';
import { Typography, Grid2 as Grid, Button } from '@mui/material';

function GraphWindow({ daysForecast, currentCity, activeWrapper, animation, colors }) {
	const [clicked, setClicked] = useState('hourly');
	const [hoursList, setHoursList] = useState();

	const [width, setWidth] = useState(0);

	const [graphData, setGraphData] = useState();

	const graphRef = useRef();

	useEffect(() => {
		if (graphRef.current) {
			const observer = new ResizeObserver((entries) => {
				for (let entry of entries) {
					setWidth(() => (entry.contentRect.width > 800 ? entry.contentRect.width : 800));
				}
			});
			observer.observe(graphRef.current);

			// Cleanup observer
			return () => observer.disconnect();
		}
	}, []);

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
				return hour < 10 ? `0${hour}` : `${hour}`;
			});
		});

		setClicked('hourly');
	}, [currentCity]);

	return (
		<Window
			style={{
				...animation,
			}}
		>
			<Container ref={graphRef}>
				<Grid container spacing={3}>
					<Grid size={12}>
						<Button
							size="small"
							variant={clicked === 'hourly' ? 'contained' : 'outlined'}
							disableElevation
							name="hourly"
							sx={{
								color: 'white',
								backgroundImage:
									clicked === 'hourly'
										? `linear-gradient(to right,${colors?.[0]} 0%,${colors?.[1]} 100%)`
										: 'transparent',
							}}
							onClick={() => setClicked('hourly')}
						>
							<Typography variant="subtitle1" fontWeight={700} fontSize={'0.8rem'}>
								48h
							</Typography>
						</Button>
						<Button
							size="small"
							variant={clicked === 'daily' ? 'contained' : 'outlined'}
							disableElevation
							sx={{
								ml: '1rem',
								color: 'white',
								backgroundImage:
									clicked === 'daily'
										? `linear-gradient(to right,${colors?.[0]} 0%,${colors?.[1]} 100%)`
										: 'transparent',
							}}
							name="hourly"
							onClick={() => setClicked('daily')}
						>
							<Typography fontSize={'0.8rem'} variant="subtitle1" fontWeight={700}>
								days
							</Typography>
						</Button>
					</Grid>
					{graphData ? (
						<Grid size={12}>
							<SvgContainer width={width}>
								{activeWrapper === 'temperature' && (
									<TemperatureSvg
										graphData={graphData}
										clicked={clicked}
										hoursList={hoursList}
										activeWrapper={activeWrapper}
										width={width}
										colors={colors}
									/>
								)}
								{activeWrapper === 'wind' && (
									<WindSvg
										graphData={graphData}
										clicked={clicked}
										hoursList={hoursList}
										width={width}
										activeWrapper={activeWrapper}
										colors={colors}
									/>
								)}
								{activeWrapper === 'precipitation' ? (
									<PrecipitationSvg
										graphData={graphData}
										clicked={clicked}
										width={width}
										hoursList={hoursList}
										activeWrapper={activeWrapper}
										colors={colors}
									/>
								) : null}
								{activeWrapper === 'humidity' ? (
									<VisibilitySvg
										graphData={graphData}
										clicked={clicked}
										width={width}
										hoursList={hoursList}
										activeWrapper={activeWrapper}
										colors={colors}
									/>
								) : null}
								<TimeList width={width}>
									{clicked === 'hourly'
										? hoursList?.map((hour) => (
												<Typography variant="subtitle2" fontWeight={600}>
													{' '}
													{hour}h
												</Typography>
											))
										: daysForecast?.days?.map((day) => (
												<Typography variant="subtitle2" fontWeight={600}>
													{day?.day}
												</Typography>
											))}
								</TimeList>
							</SvgContainer>
						</Grid>
					) : null}
				</Grid>
			</Container>
		</Window>
	);
}

export default GraphWindow;

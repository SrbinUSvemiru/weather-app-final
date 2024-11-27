import { Button, Grid2 as Grid, Typography, useTheme } from '@mui/material';
import { set, slice } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { nextFourtyEightHours, trans } from '../../utils/utils';
import PrecipitationSvg from '../PrecipitationSvg/PrecipitationSvg';
import TemperatureSvg from '../TemperatureSvg/TemperatureSvg';
import VisibilitySvg from '../VisibilitySvg/VisibilitySvg';
import WindSvg from '../WindSvg/WindSvg';
import { Container, SvgContainer, TimeList, Window } from './styled-components';

const GraphWindow = ({ daysForecast, selectedCity, activeWrapper, animation, colors }) => {
	const [clicked, setClicked] = useState('hourly');
	const [hoursList, setHoursList] = useState();

	const theme = useTheme();

	const [width, setWidth] = useState(0);

	const [graphData, setGraphData] = useState({
		temperature: { daily: [], hourly: [] },
		wind: { daily: [], hourly: [] },
		humidity: { daily: [], hourly: [] },
		precipitation: { daily: [], hourly: [] },
	});

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
		setHoursList(() =>
			nextFourtyEightHours(selectedCity?.current?.timezone).map((hour) => (hour < 10 ? `0${hour}` : `${hour}`)),
		);

		setClicked('hourly');
	}, [selectedCity]);

	return (
		<Window
			bordercolor={theme?.palette?.wrapper?.[activeWrapper]?.light}
			style={{ ...animation, transform: animation?.xys.to(trans) }}
		>
			<Container ref={graphRef}>
				<Grid container spacing={3}>
					<Grid size={12}>
						<Button
							disableElevation
							name="hourly"
							onClick={() => setClicked('hourly')}
							size="small"
							sx={{
								color: 'text.primary',
								backgroundImage:
									clicked === 'hourly'
										? `linear-gradient(to right,${theme?.palette?.wrapper?.[activeWrapper]?.light} 0%,${theme?.palette?.wrapper?.[activeWrapper]?.dark} 100%)`
										: 'transparent',
								borderColor: theme?.palette?.wrapper?.[activeWrapper]?.light,
							}}
							variant={clicked === 'hourly' ? 'contained' : 'outlined'}
						>
							<Typography fontSize={'0.8rem'} fontWeight={700} variant="subtitle1">
								48h
							</Typography>
						</Button>
						<Button
							disableElevation
							name="hourly"
							onClick={() => setClicked('daily')}
							size="small"
							sx={{
								ml: '1rem',

								backgroundImage:
									clicked === 'daily'
										? `linear-gradient(to right,${theme?.palette?.wrapper?.[activeWrapper]?.light} 0%,${theme?.palette?.wrapper?.[activeWrapper]?.dark} 100%)`
										: 'transparent',
								borderColor: theme?.palette?.wrapper?.[activeWrapper]?.light,
							}}
							variant={clicked === 'daily' ? 'contained' : 'outlined'}
						>
							<Typography
								fontSize={'0.8rem'}
								fontWeight={700}
								sx={{ color: 'text.primary' }}
								variant="subtitle1"
							>
								days
							</Typography>
						</Button>
					</Grid>
					{graphData ? (
						<Grid size={12}>
							<SvgContainer width={width}>
								{activeWrapper === 'temperature' && (
									<TemperatureSvg
										activeWrapper={activeWrapper}
										clicked={clicked}
										colors={colors}
										graphData={graphData}
										hoursList={hoursList}
										width={width}
									/>
								)}
								{activeWrapper === 'wind' && (
									<WindSvg
										activeWrapper={activeWrapper}
										clicked={clicked}
										colors={colors}
										graphData={graphData}
										hoursList={hoursList}
										width={width}
									/>
								)}
								{activeWrapper === 'precipitation' ? (
									<PrecipitationSvg
										activeWrapper={activeWrapper}
										clicked={clicked}
										colors={colors}
										graphData={graphData}
										hoursList={hoursList}
										width={width}
									/>
								) : null}
								{activeWrapper === 'humidity' ? (
									<VisibilitySvg
										activeWrapper={activeWrapper}
										clicked={clicked}
										colors={colors}
										graphData={graphData}
										hoursList={hoursList}
										width={width}
									/>
								) : null}
								<TimeList width={width}>
									{clicked === 'hourly'
										? hoursList?.map((hour, index) => (
												<Typography
													fontWeight={500}
													key={index}
													sx={{ color: 'text.secondary' }}
													variant="subtitle1"
												>
													{' '}
													{hour}h
												</Typography>
											))
										: daysForecast?.days?.map((day, index) => (
												<Typography
													fontWeight={500}
													key={index}
													sx={{ color: 'text.secondary' }}
													variant="subtitle1"
												>
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
};

export default GraphWindow;

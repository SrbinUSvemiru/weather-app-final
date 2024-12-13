import {
	FormControl,
	Grid2 as Grid,
	InputLabel,
	MenuItem,
	Select,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { set, slice } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { AppContext } from '../../context/AppContext';
import { getUnits, nextFourtyEightHours, trans } from '../../utils/utils';
import PrecipitationSvg from '../PrecipitationSvg/PrecipitationSvg';
import TemperatureSvg from '../TemperatureSvg/TemperatureSvg';
import VisibilitySvg from '../VisibilitySvg/VisibilitySvg';
import { Window } from '../Window/Window';
import WindSvg from '../WindSvg/WindSvg';
import { Container, SvgContainer, TimeList } from './styled-components';

const GraphWindow = ({ daysForecast, style, colors, id, handleCloseCurrentWeather }) => {
	const [selectedTimeframe, setSelectedTimeframe] = useState('hourly');
	const [hoursList, setHoursList] = useState();

	const { selectedCity, activeWrapper, setActiveWrapper, settings } = useContext(AppContext);

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
				set(data, 'temperature.hourly', [...data.temperature.hourly, hourly[i].temp]);
				set(data, 'wind.hourly', [
					...data.wind.hourly,
					{ value: hourly[i].wind_speed, deg: hourly[i].wind.deg },
				]);
				set(data, 'humidity.hourly', [...data.humidity.hourly, hourly[i].main.humidity]);
				set(data, 'precipitation.hourly', [...data.precipitation.hourly, hourly[i].pop]);
			}

			setGraphData(data);
		}
	}, [daysForecast]);

	const units = useMemo(
		() =>
			getUnits({
				selected: activeWrapper,
				units: settings?.preferences?.units,
			}),
		[activeWrapper, settings?.preferences?.units],
	);

	const handleToggle = useCallback((e, newAlignment) => {
		if (newAlignment !== null) {
			setSelectedTimeframe(newAlignment);
		}
	}, []);

	useEffect(() => {
		setHoursList(() =>
			nextFourtyEightHours(selectedCity?.current?.timezone).map((hour) => (hour < 10 ? `0${hour}` : `${hour}`)),
		);

		setSelectedTimeframe('hourly');
	}, [selectedCity]);

	return (
		<Window
			id={id}
			isDisabled={true}
			onButtonClick={handleCloseCurrentWeather}
			shouldSkip={false}
			style={{ ...style, transform: style?.xys.to(trans), display: 'block' }}
		>
			<Container ref={graphRef}>
				<Grid container spacing={3}>
					<Grid size={12} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'start' }}>
						<ToggleButtonGroup
							exclusive
							onChange={handleToggle}
							sx={{ borderRadius: '16px' }}
							value={selectedTimeframe}
						>
							<ToggleButton
								exclusive
								sx={{ padding: '0.2rem 0.7rem', borderRadius: '16px 0px 0px 16px' }}
								value="hourly"
								variant="subtitle1"
							>
								<Typography noWrap sx={{ fontSize: '0.7rem' }} variant="subtitle1">
									Hours
								</Typography>
							</ToggleButton>
							<ToggleButton
								sx={{ padding: '0.2rem 0.7rem', borderRadius: '0px 16px 16px 0px' }}
								value="daily"
								variant="subtitle1"
							>
								<Typography noWrap sx={{ fontSize: '0.7rem' }} variant="subtitle1">
									Days
								</Typography>
							</ToggleButton>
						</ToggleButtonGroup>

						<FormControl size="small" sx={{ minWidth: 80, ml: '1rem' }} variant="standard">
							<InputLabel>Selected</InputLabel>
							<Select
								IconComponent={() => null}
								disableUnderline
								label="Selected"
								labelId="demo-select-small-label"
								onChange={(e) => setActiveWrapper(e?.target?.value)}
								sx={{
									borderRadius: '1rem',
									backgroundColor: 'background.light',
									padding: '0.2rem 0.7rem',
									'& .MuiSelect-select': {
										padding: 0,
										paddingRight: '0px !important',
										minWidth: '0px !important',
									},
								}}
								value={activeWrapper}
							>
								<MenuItem value={'temperature'}>Temperature</MenuItem>
								<MenuItem value={'precipitation'}>Precipitation</MenuItem>
								<MenuItem value={'wind'}>Wind</MenuItem>
								<MenuItem value={'humidity'}>Humidity</MenuItem>
							</Select>
						</FormControl>
						<Typography sx={{ ml: '1rem', color: 'text.primary' }} variant="subtitle1">
							{`Units: ${units}`}
						</Typography>
					</Grid>

					<Grid size={12}>
						<SvgContainer width={width}>
							{activeWrapper === 'temperature' && (
								<TemperatureSvg
									activeWrapper={activeWrapper}
									clicked={selectedTimeframe}
									colors={colors}
									graphData={graphData}
									hoursList={hoursList}
									width={width}
								/>
							)}
							{activeWrapper === 'wind' && (
								<WindSvg
									activeWrapper={activeWrapper}
									clicked={selectedTimeframe}
									colors={colors}
									graphData={graphData}
									hoursList={hoursList}
									width={width}
								/>
							)}
							{activeWrapper === 'precipitation' ? (
								<PrecipitationSvg
									activeWrapper={activeWrapper}
									clicked={selectedTimeframe}
									colors={colors}
									graphData={graphData}
									hoursList={hoursList}
									width={width}
								/>
							) : null}
							{activeWrapper === 'humidity' ? (
								<VisibilitySvg
									activeWrapper={activeWrapper}
									clicked={selectedTimeframe}
									colors={colors}
									graphData={graphData}
									hoursList={hoursList}
									width={width}
								/>
							) : null}
							<TimeList width={width}>
								{selectedTimeframe === 'hourly'
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
				</Grid>
			</Container>
		</Window>
	);
};

export default GraphWindow;

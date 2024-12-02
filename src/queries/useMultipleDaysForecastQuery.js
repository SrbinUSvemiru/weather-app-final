import { find, map } from 'lodash';
import { useQuery } from 'react-query';

import { QUERY_KEYS } from '../constants/queryKeys';
import { CURRENT_WEATHER_URL } from '../constants/server';
import fetchFromServer from '../utils/fetchFromServer';
import { getMinMax, returnDay } from '../utils/utils';

export const useMultipleDaysForecastQuery = ({ city, options }) =>
	useQuery(
		QUERY_KEYS.CityWeatherMultipleDays(city),
		async () => {
			try {
				const response = await fetchFromServer(
					CURRENT_WEATHER_URL +
						`forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
				);

				const res = map(response.list, (el) => ({
					...el,

					temp: {
						metric: Math.round((el?.main?.temp * 2) / 2),
						imperial: Math.round((((el?.main?.temp * 9) / 5 + 32) * 2) / 2),
					},

					wind_speed: {
						metric: {
							small: Math.round((el?.wind?.speed * 2) / 2),
							large: Math.round((el?.wind?.speed * 3.6 * 2) / 2),
						},
						imperial: {
							small: Math.round((el?.wind?.speed * 3.28 * 2) / 2),
							large: Math.round((el?.wind?.speed * 2.23 * 2) / 2),
						},
					},
					day: returnDay(el?.dt, city?.current?.timezone),
				}));

				const groupedData = res.reduce((acc, item) => {
					const key = item.day;

					if (!acc[key]) {
						acc[key] = [];
					}
					acc[key].push(item);

					return acc;
				}, {});

				const result = Object.keys(groupedData).map((day) => {
					const dayData = groupedData[day];

					const feelsLike = getMinMax(dayData, 'main.feels_like', 'max');
					const visibility = getMinMax(dayData, 'visibility', 'max');
					const minTemp = getMinMax(dayData, 'main.temp_min', 'min');
					const maxTemp = getMinMax(dayData, 'main.temp_max', 'max');
					const windSpeed = getMinMax(dayData, 'wind.speed', 'max');
					const windDeg = dayData[0].wind.deg;
					const pop = getMinMax(dayData, 'pop', 'max');
					const clouds = getMinMax(dayData, 'clouds.all', 'max');
					const temp = getMinMax(dayData, 'main.temp', 'max');
					const humidity = getMinMax(dayData, 'main.humidity', 'max');
					const pressure = getMinMax(dayData, 'main.pressure', 'max');
					const weather =
						find(dayData, (el) => el?.sys?.pod === 'd')?.weather?.[0] || dayData[0]?.weather?.[0];

					return {
						day,
						feels_like: {
							metric: Math.round((feelsLike * 2) / 2),
							imperial: Math.round((((feelsLike * 9) / 5 + 32) * 2) / 2),
						},
						visibility: {
							metric: { small: visibility, large: Math.round(((visibility / 1000) * 2) / 2) },
							imperial: {
								small: Math.round((visibility * 3.28 * 2) / 2),
								large: Math.round(((visibility / 1609) * 2) / 2),
							},
						},
						min_temp: {
							metric: Math.round((minTemp * 2) / 2),
							imperial: Math.round((((minTemp * 9) / 5 + 32) * 2) / 2),
						},
						max_temp: {
							metric: Math.round((maxTemp * 2) / 2),
							imperial: Math.round((((maxTemp * 9) / 5 + 32) * 2) / 2),
						},
						wind_speed: {
							metric: {
								small: Math.round((windSpeed * 2) / 2),
								large: Math.round((windSpeed * 3.6 * 2) / 2),
							},
							imperial: {
								small: Math.round((windSpeed * 3.28 * 2) / 2),
								large: Math.round((windSpeed * 2.23 * 2) / 2),
							},
						},
						wind_deg: windDeg,
						pop,
						clouds,
						temp: {
							metric: Math.round((temp * 2) / 2),
							imperial: Math.round((((temp * 9) / 5 + 32) * 2) / 2),
						},
						humidity,
						pressure,
						weather,
					};
				});

				return { days: result, hours: res } || null;
			} catch (e) {
				console.error(e);
				return null;
			}
		},
		{ ...options, staleTime: Infinity },
	);

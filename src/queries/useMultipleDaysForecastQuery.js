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

				const res = response.list?.map((el) => ({ ...el, day: returnDay(el?.dt, city?.current?.timezone) }));

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

					return {
						day,
						feels_like: getMinMax(dayData, 'main.feels_like', 'max'),
						visibility: getMinMax(dayData, 'visibility', 'max'),
						min_temp: getMinMax(dayData, 'main.temp_min', 'min'),
						max_temp: getMinMax(dayData, 'main.temp_max', 'max'),
						wind_speed: getMinMax(dayData, 'wind.speed', 'max'),
						wind_deg: dayData[0].wind.deg,
						pop: getMinMax(dayData, 'pop', 'max'),
						temp: getMinMax(dayData, 'main.temp', 'max'),
						humidity: getMinMax(dayData, 'main.humidity', 'max'),
						pressure: getMinMax(dayData, 'main.pressure', 'max'),
						weather: dayData[0]?.weather?.[0],
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
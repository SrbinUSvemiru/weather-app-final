import { useQuery } from 'react-query';

import { QUERY_KEYS } from '../constants/queryKeys';
import { CURRENT_WEATHER_URL } from '../constants/server';
import fetchFromServer from '../utils/fetchFromServer';

export const useCurrentWeatherQuery = ({ city, options }) =>
	useQuery(
		QUERY_KEYS.CityWeather(city),
		async () => {
			try {
				const response = await fetchFromServer(
					CURRENT_WEATHER_URL +
						`weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
				);

				const obj = {
					feels_like: {
						metric: Math.round((response?.main?.feels_like * 2) / 2),
						imperial: Math.round((((response?.main?.feels_like * 9) / 5 + 32) * 2) / 2),
					},
					visibility: {
						metric: {
							small: response?.visibility,
							large: Math.round(((response?.visibility / 1000) * 2) / 2),
						},
						imperial: {
							small: Math.round((response?.visibility * 3.28 * 2) / 2),
							large: Math.round(((response?.visibility / 1609) * 2) / 2),
						},
					},
					temp: {
						metric: Math.round((response?.main?.temp * 2) / 2),
						imperial: Math.round((((response?.main?.temp * 9) / 5 + 32) * 2) / 2),
					},

					wind_speed: {
						metric: {
							small: Math.round((response?.wind?.speed * 2) / 2),
							large: Math.round((response?.wind?.speed * 3.6 * 2) / 2),
						},
						imperial: {
							small: Math.round((response?.wind?.speed * 3.28 * 2) / 2),
							large: Math.round((response?.wind?.speed * 2.23 * 2) / 2),
						},
					},
				};

				return { ...response, ...obj } || null;
			} catch (e) {
				console.error(e);
				return null;
			}
		},
		{ ...options, staleTime: Infinity },
	);

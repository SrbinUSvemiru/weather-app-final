import { useQuery } from 'react-query';

import { QUERY_KEYS } from '../constants/queryKeys';
import fetchFromServer from '../utils/fetchFromServer';

export const useNewWeatherQuery = ({ city, options }) =>
	useQuery(
		QUERY_KEYS.NewCity(city),
		async () => {
			try {
				const response = await fetchFromServer(
					`https://api.open-meteo.com/v1/forecast?latitude=${city?.lat}&longitude=${city?.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,uv_index,sunshine_duration&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timeformat=unixtime&timezone=GMT&forecast_hours=48`,
				);

				return { ...response } || null;
			} catch (e) {
				console.error(e);
				return null;
			}
		},
		{ ...options, staleTime: Infinity },
	);

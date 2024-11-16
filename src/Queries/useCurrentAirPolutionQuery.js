import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import fetchFromServer from '../Utils/fetchFromServer';
import { CURRENT_WEATHER_URL } from '../constants/server';

export const useCurrentAirPolutionQuery = ({ city, options }) => {
	return useQuery(
		QUERY_KEYS.CityAirPolution(city),
		async () => {
			try {
				const response = await fetchFromServer(
					CURRENT_WEATHER_URL +
						`air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}`,
				);

				return response || null;
			} catch (e) {
				console.error(e);
				return null;
			}
		},
		{ ...options, staleTime: Infinity },
	);
};

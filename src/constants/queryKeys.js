export const QUERY_KEYS = {
	CityWeather: (city) => [city.name, city.lat, city.lon, city.units],
	CityAirPolution: (city) => [city.name, city.lat, city.lon, 'polution'],
	CityWeatherMultipleDays: (city) => [city.name, city.lat, city.lon, city.units, 'multiple_days'],
	SearchCities: (name) => ['search', name],
};

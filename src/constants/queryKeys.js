export const QUERY_KEYS = {
	NewCity: (city) => [city?.lat, city?.lon],
	CityWeather: (city) => [city?.name, city?.lat, city?.lon, city?.units],
	CityAirPolution: (city) => [city?.name, city?.lat, city?.lon, 'polution'],
	CityWeatherMultipleDays: (city) => [city?.name, city?.lat, city?.lon, city?.units, 'multiple_days'],
	SearchCities: (name) => ['search', name],
};

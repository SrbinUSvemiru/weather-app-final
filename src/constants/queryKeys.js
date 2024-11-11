export const QUERY_KEYS = {
	CityWeather: (city) => [city.name, city.lat, city.lon, city.units],
	CityWeatherMultipleDays: (city) => [city.name, city.lat, city.lon, city.units, 'multiple_days'],
	SearchCities: (name) => ['search', name],
};

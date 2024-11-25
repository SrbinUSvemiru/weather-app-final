import { defaultCities } from './defaultCities';

export const DEFAULT_SETTINGS = {
	preferences: { units: 'metric' },
	theme: { variant: 'default', mode: 'dark' },
	cities: [...defaultCities()],
};

import { createContext, useEffect, useState } from 'react';

import { defaultCities } from '../../constants/defaultCities';
import { DEFAULT_SETTINGS } from '../../constants/settings';
import { getStorageItem, setStorageItem } from '../../utils/localStorage';

export const AppContext = createContext({
	settings: DEFAULT_SETTINGS,
	setSettings: () => undefined,
	currentSelectedCity: {},
	setCurrentSelectedCity: () => undefined,
});

export const AppContextProvider = (props) => {
	const [activeWrapper, setActiveWrapper] = useState('temperature');
	const [settings, setSettings] = useState(getStorageItem('weather-app-settings', DEFAULT_SETTINGS));
	const [theme, setTheme] = useState(settings?.theme || { mode: 'dark', variant: 'default' });
	const [cities, setCities] = useState(getStorageItem('weather-app-settings')?.cities || defaultCities());
	const [selectedCity, setSelectedCity] = useState({});
	const [animation, setAnimation] = useState(null);

	useEffect(() => {
		setStorageItem('weather-app-settings', { theme, cities, preferences: { units: settings?.preferences?.units } });
	}, [cities, settings, theme]);

	return (
		<AppContext.Provider
			value={{
				settings,
				setSettings,
				activeWrapper,
				setActiveWrapper,
				cities,
				setCities,
				theme,
				animation,
				setAnimation,
				setTheme,
				setSelectedCity,
				selectedCity,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};

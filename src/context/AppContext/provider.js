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
	const [isGridOpen, setIsGridOpen] = useState(true);
	const [animation, setAnimation] = useState(null);
	const [location, setLocation] = useState(null);

	const handleGetLocation = () => {
		if (!navigator.geolocation) {
			setLocation({ ...location, error: 'Geolocation is not supported by your browser.' });
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					error: null,
				});
			},
			(error) => {
				setLocation({ ...location, error: error.message });
			},
		);
	};

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
				handleGetLocation,
				location,
				theme,
				animation,
				isGridOpen,
				setIsGridOpen,
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

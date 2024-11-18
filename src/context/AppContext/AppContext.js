import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';

import { DEFAULT_SETTINGS } from '../../constants/settings';
import { getStorageItem, setStorageItem } from '../../Utils/localStorage';
import { defaultCities } from '../../constants/defaultCities';

export const AppContext = createContext({
	settings: DEFAULT_SETTINGS,
	setSettings: () => undefined,
	currentSelectedCity: {},
	setCurrentSelectedCity: () => undefined,
});

export const AppContextProvider = (props) => {
	const [settings, setSettings] = useState(DEFAULT_SETTINGS);

	const [cities, setCities] = useState(getStorageItem('cities', defaultCities()));
	useEffect(() => {
		setStorageItem('cities', cities);
	}, [cities]);

	return (
		<AppContext.Provider value={{ settings, setSettings, cities, setCities }}>{props.children}</AppContext.Provider>
	);
};

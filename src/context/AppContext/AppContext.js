import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';

import { DEFAULT_SETTINGS } from '../../constants/settings';

export const AppContext = createContext({
	settings: DEFAULT_SETTINGS,
	setSettings: () => undefined,
	currentSelectedCity: {},
	setCurrentSelectedCity: () => undefined,
});

export const AppContextProvider = (props) => {
	const [settings, setSettings] = useState(DEFAULT_SETTINGS);

	const [currentSelectedCity, setCurrentSelectedCity] = useState({});

	return (
		<AppContext.Provider value={{ settings, setSettings, currentSelectedCity, setCurrentSelectedCity }}>
			{props.children}
		</AppContext.Provider>
	);
};

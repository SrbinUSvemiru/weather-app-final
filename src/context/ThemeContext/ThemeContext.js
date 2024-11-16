import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';

import { AppContext } from '../AppContext/AppContext';

export function AppThemeProvider(props) {
	// const settings = getStorageItem<SettingsType>(SETTINGS_KEY, DEFAULT_SETTINGS);
	const { settings } = useContext(AppContext);
	const selectedTheme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: settings.theme.mode,
				},
			}),
		[settings.theme.mode],
	);

	console.log(selectedTheme);

	return (
		<ThemeProvider theme={selectedTheme}>
			<CssBaseline />
			{props.children}
		</ThemeProvider>
	);
}

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useContext, useMemo } from 'react';

import { AppContext } from '../AppContext/provider';
import { getPaletteForTheme } from './utils';

export const AppThemeProvider = (props) => {
	const { settings } = useContext(AppContext);

	const selectedTheme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: settings?.theme?.mode,
					...getPaletteForTheme(settings?.theme),
				},
			}),
		[settings?.theme],
	);

	return (
		<ThemeProvider theme={selectedTheme}>
			<CssBaseline />
			{props.children}
		</ThemeProvider>
	);
};

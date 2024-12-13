import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useContext, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { AppContext } from '../AppContext/provider';
import { getPaletteForTheme } from './utils';

export const AppThemeProvider = (props) => {
	const { theme } = useContext(AppContext);

	const selectedTheme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: theme?.mode,
					...getPaletteForTheme(theme),
				},
				typography: {
					fontFamily: `"Helvetica Neue", "Arial", sans-serif`,
				},
			}),
		[theme],
	);

	return (
		<ThemeProvider theme={selectedTheme}>
			<CssBaseline />
			<StyledThemeProvider theme={selectedTheme}>{props.children}</StyledThemeProvider>
		</ThemeProvider>
	);
};

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
				components: {
					MuiCssBaseline: {
						styleOverrides: {
							body: {
								'&::-webkit-scrollbar': {
									width: '8px', // Scrollbar width
								},
								'&::-webkit-scrollbar-track': {
									backgroundColor: '#2b2e3b', // Track color
								},
								'&::-webkit-scrollbar-thumb': {
									backgroundColor: '#888',
									borderRadius: '10px',
								},
								'&::-webkit-scrollbar-thumb:hover': {
									backgroundColor: '#555',
								},
							},
						},
					},
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

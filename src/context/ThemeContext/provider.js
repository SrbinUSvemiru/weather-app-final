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
					fontFamily: `"Raleway", "Arial", sans-serif`,
				},
				components: {
					MuiFormLabel: {
						styleOverrides: {
							root: ({ theme }) => ({
								border: 'none',
								'&.Mui-focused': {
									color: theme?.palette?.primary?.highlight, // Change label color when focused
								},
							}),
						},
					},
					MuiOutlinedInput: {
						styleOverrides: {
							root: () => ({
								border: 'none',
								borderRadius: '16px', // Adds rounded corners for the entire input field
								'&.Mui-focused': {
									border: 'none',
								},
							}),

							input: ({ theme }) => ({
								border: 'none',
								backgroundColor: 'transparent', // Sets background color of the input
								borderRadius: '16px', // Adds rounded corners
								padding: '0.2rem 0.5rem', // Adjusts padding // Removes padding around the actual input
								'&:focus': {
									backgroundColor: theme?.palette?.primary?.light, // Change background when focused
								},
							}),
						},
					},
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

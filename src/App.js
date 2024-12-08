import './App.css';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
	Box,
	Container,
	Grid2 as Grid,
	IconButton,
	Stack,
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { animated } from '@react-spring/web';
import React, { useContext, useRef, useState } from 'react';
import { useSpring } from 'react-spring';

import { Background } from './components/Background/Background';
import Expanded from './components/Expanded/Expanded';
import SearchBar from './components/SearchBar/SearchBar';
import { AppContext } from './context/AppContext';
import { useBreakpoint } from './hooks/useBreakpoint';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 50,
	height: 32,
	padding: 7,

	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,

		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(25px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#fff',
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme?.palette?.primary?.highlight,
				...theme.applyStyles('dark', {
					backgroundColor: '#8796A5',
				}),
			},
		},
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme?.palette?.primary?.highlight,
		width: 23,
		transform: 'translateY(3px)',
		height: 23,
		'&::before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				'#fff',
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
		...theme.applyStyles('dark', {
			backgroundColor: '#003892',
		}),
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: '#aab4be',
		borderRadius: 20 / 2,
		...theme.applyStyles('dark', {
			backgroundColor: '#8796A5',
		}),
	},
}));

const AnimatedBox = animated(Box);

const App = () => {
	const [open, setOpen] = useState(true);
	const containerRef = useRef(null);
	const [headerClickedIcon, setHeaderClickedIcon] = useState('search');
	const { isXs } = useBreakpoint();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { theme, setSettings, settings, setTheme } = useContext(AppContext);
	const [cityToReplace, setCityToReplace] = useState('');

	const muiTheme = useTheme();

	const handleCloseCurrentWeather = () => {
		setOpen(true);
	};

	const handleToggleUnits = (event, newAlignment) => {
		if (newAlignment !== null) {
			setSettings((prev) => ({ ...prev, preferences: { ...prev?.preferences, units: newAlignment } }));
		}
	};

	const appBar = useSpring({
		from: { height: isDrawerOpen ? '40px' : '400px' },
		to: { height: !isDrawerOpen ? '40px' : '400px' },
	});

	const toggleDrawer = (value) => setIsDrawerOpen(value);

	return (
		<>
			<Container
				sx={{
					padding: '0 !important',
					height: '100vh',
					minWidth: '100vw',
					backgroundColor: 'background.default',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Background />

				<AnimatedBox
					onMouseLeave={() => setIsDrawerOpen(false)}
					style={appBar}
					sx={{
						position: 'fixed',
						zIndex: muiTheme?.zIndex?.appBar,
						width: '100%',
						backgroundColor: muiTheme?.palette?.background?.header,
						overflow: 'hidden',
						boxShadow: '0px 5px 10px -4px rgba(0, 0, 0, 0.2)',
						display: 'flex',
						alignItems: 'start',
						padding: isXs ? '0 2rem' : '0 4rem',
					}}
				>
					<Grid container spacing={{ xs: 1, sm: 3 }} sx={{ width: '100%' }}>
						<Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></Grid>
						<Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></Grid>

						<Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<IconButton
								aria-label="search"
								onClick={() => {
									setHeaderClickedIcon('search');
									toggleDrawer(true);
								}}
								sx={{ color: 'text.secondary', marginRight: '1rem' }}
							>
								<SearchIcon />
							</IconButton>
							{isXs ? (
								<IconButton>
									<MenuIcon
										onClick={() => {
											setHeaderClickedIcon('menu');
											toggleDrawer((prev) => !prev);
										}}
										sx={{ color: 'text.secondary' }}
									/>
								</IconButton>
							) : (
								<Stack direction="row" spacing={4}>
									<ToggleButtonGroup
										exclusive
										onChange={handleToggleUnits}
										sx={{ borderRadius: '16px' }}
										value={settings?.preferences?.units}
									>
										<ToggleButton
											sx={{ padding: '0.2rem 0.7rem', borderRadius: '16px 0px 0px 16px' }}
											value="metric"
										>
											<Typography sx={{ fontSize: '0.7rem' }} variant="subtitle1">
												{' '}
												&#176;C{' '}
											</Typography>
										</ToggleButton>
										<ToggleButton
											sx={{ padding: '0.2rem 0.7rem', borderRadius: '0px 16px 16px 0px' }}
											value="imperial"
											variant="subtitle1"
										>
											<Typography sx={{ fontSize: '0.7rem' }} variant="subtitle1">
												{' '}
												&#176;F{' '}
											</Typography>
										</ToggleButton>
									</ToggleButtonGroup>
									<MaterialUISwitch
										checked={theme?.mode === 'dark'}
										onClick={() =>
											setTheme((prev) => ({
												variant: prev?.variant,
												mode: prev?.mode === 'dark' ? 'light' : 'dark',
											}))
										}
									/>
								</Stack>
							)}
						</Grid>

						<Grid size={12}>
							{isDrawerOpen && headerClickedIcon === 'search' ? (
								<SearchBar
									cityToReplace={cityToReplace}
									handleCloseCurrentWeather={handleCloseCurrentWeather}
									isDrawerOpen={isDrawerOpen}
									setCityToReplace={setCityToReplace}
									setIsDrawerOpen={toggleDrawer}
								/>
							) : null}
						</Grid>
						{isDrawerOpen && headerClickedIcon === 'menu' ? (
							<Grid container size={3} spacing={2}>
								<Grid size={12}>
									<ToggleButtonGroup
										exclusive
										onChange={handleToggleUnits}
										sx={{ borderRadius: '16px' }}
										value={settings?.preferences?.units}
									>
										<ToggleButton
											sx={{ padding: '0.2rem 0.7rem', borderRadius: '16px 0px 0px 16px' }}
											value="metric"
										>
											<Typography sx={{ fontSize: '0.7rem' }} variant="subtitle1">
												{' '}
												&#176;C{' '}
											</Typography>
										</ToggleButton>
										<ToggleButton
											sx={{ padding: '0.2rem 0.7rem', borderRadius: '0px 16px 16px 0px' }}
											value="imperial"
											variant="subtitle1"
										>
											<Typography sx={{ fontSize: '0.7rem' }} variant="subtitle1">
												{' '}
												&#176;F{' '}
											</Typography>
										</ToggleButton>
									</ToggleButtonGroup>
								</Grid>
								<Grid size={12}>
									<MaterialUISwitch
										checked={theme?.mode === 'dark'}
										onClick={() =>
											setTheme((prev) => ({
												variant: prev?.variant,
												mode: prev?.mode === 'dark' ? 'light' : 'dark',
											}))
										}
									/>
								</Grid>
							</Grid>
						) : null}
					</Grid>
				</AnimatedBox>

				<Box
					id="scrollable-container"
					sx={{
						marginTop: '40px',
						padding: isXs ? '1rem 1rem 4rem 1rem' : '2rem 2rem 4rem 2rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
						alignItems: 'center',
						width: '100%',
						height: '100%',
						overflowY: 'scroll',
						overflowX: 'hidden',
						zIndex: 2,
						position: 'relative',
					}}
				>
					<Expanded
						containerRef={containerRef}
						handleCloseCurrentWeather={handleCloseCurrentWeather}
						open={open}
						setCityToReplace={setCityToReplace}
						setIsDrawerOpen={setIsDrawerOpen}
						setOpen={setOpen}
					/>
				</Box>
			</Container>
		</>
	);
};

export default App;

import './App.css';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import MenuIcon from '@mui/icons-material/Menu';
import {
	Box,
	Button,
	Container,
	Drawer,
	Grid2 as Grid,
	Stack,
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { animated } from '@react-spring/web';
import React, { useContext, useState } from 'react';
import { useSprings } from 'react-spring';

import City from './components/City/City';
import Expanded from './components/Expanded/Expanded';
import SearchBar from './components/SearchBar/SearchBar';
import { AppContext } from './context/AppContext';
import { useBreakpoint } from './hooks/useBreakpoint';

const AnimatedGrid = animated(Grid);

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(22px)',
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
		width: 32,
		height: 32,
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

const trans = (x, y, s, z) => `perspective(600px) translateZ(${z}px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
const App = () => {
	const [open, setOpen] = useState(true);

	const { isXs, isSm } = useBreakpoint();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { cities, theme, setSettings, settings, setTheme } = useContext(AppContext);
	const [cityToReplace, setCityToReplace] = useState('');

	const muiTheme = useTheme();

	const [detailsStyle, detailsApi] = useSprings(
		9,
		(i) => ({
			delay: () => i * 100,

			config: {
				tension: 500,
				friction: 50,
				mass: 3,
			},
			from: {
				opacity: 0,
				xys: [0, 0, 1, -(i + 3) * 50],
			},
		}),
		[],
	);

	const [springs, api] = useSprings(cities?.length, (i) => ({
		delay: () => i * 100,
		config: {
			tension: 200,
			friction: 50,
			mass: 1,
		},
		from: {
			opacity: 0,
			xys: [0, 0, 0, (i + 10) * 20],
		},
		to: { opacity: 1, xys: [0, 0, 1, 0] },
	}));

	const handleOpenCurrentWeather = (index) => {
		if (!cities[index]?.lat || !cities[index]?.lon) {
			return;
		}

		setOpen(false);
		api?.start((i) => ({
			delay: () => i * 50,
			to: {
				opacity: 0,
				xys: [0, 0, 0, -(i + 10) * 20],
			},
		}));
		detailsApi?.start((i) => ({
			delay: () => i * 50 + 150,
			from: {
				opacity: 0,
				xys: [0, 0, 0, (i + 10) * 10],
			},
			to: {
				opacity: 1,
				xys: [0, 0, 1, 0],
			},
		}));
	};

	const handleCloseCurrentWeather = () => {
		setOpen(true);
		detailsApi?.start((i) => ({
			delay: () => i * 50,
			to: {
				opacity: 0,
				xys: [0, 0, 0, -(i + 10) * 10],
			},
		}));
		api?.start((i) => ({
			delay: () => i * 50 + 100,
			from: {
				opacity: 0,
				xys: [0, 0, 0, (i + 10) * 20],
			},
			to: {
				opacity: 1,
				xys: [0, 0, 1, 0],
			},
		}));
	};

	const handleToggleUnits = (event, newAlignment) => {
		if (newAlignment !== null) {
			setSettings((prev) => ({ ...prev, preferences: { ...prev?.preferences, units: newAlignment } }));
		}
	};

	const toggleDrawer = (value) => setIsDrawerOpen(value);

	return (
		<>
			<Container
				sx={{
					padding: '0 !important',
					margin: 0,
					height: '100vh',
					minWidth: '100vw',
					backgroundColor: 'background.default',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Drawer anchor="left" onClose={() => toggleDrawer(false)} open={isDrawerOpen}>
					<Box
						sx={{
							width: '100vw',
							height: '100%',
							backgroundColor: muiTheme?.palette?.mode === 'dark' ? 'primary.main' : 'white',
							padding: '0.5rem 2rem',
						}}
					>
						<Grid container spacing={3}>
							<Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<Button
									onClick={() => toggleDrawer(false)}
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										fontWeight: 800,
										fontSize: '1rem',

										'&:hover': {
											color: 'secondary.main',
										},
									}}
									variant="filled"
								>
									<MenuIcon sx={{ fontSize: '2.7rem' }} />
								</Button>
							</Grid>
							<Grid size={12}>
								<SearchBar
									cityToReplace={cityToReplace}
									handleCloseCurrentWeather={handleCloseCurrentWeather}
									isDrawerOpen={isDrawerOpen}
									setCityToReplace={setCityToReplace}
									setIsDrawerOpen={toggleDrawer}
								/>
							</Grid>
							<Grid size={12}>
								<Stack direction="row" spacing={4}>
									<ToggleButtonGroup
										exclusive
										onChange={handleToggleUnits}
										value={settings?.preferences?.units}
									>
										<ToggleButton sx={{ padding: '0.2rem 0.7rem' }} value="metric">
											<Typography variant="subtitle1"> &#176;C </Typography>
										</ToggleButton>
										<ToggleButton
											sx={{ padding: '0.2rem 0.7rem' }}
											value="imperial"
											variant="subtitle1"
										>
											<Typography> &#176;F </Typography>
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
							</Grid>
						</Grid>
					</Box>
				</Drawer>
				<Box
					sx={{
						// padding: '0 !important',
						margin: 0,
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
					<Box
						sx={{
							padding: isXs ? '0.2rem' : '0.5rem',
							width: '100%',
							position: 'sticky',
							top: 0,
							backgroundColor: isXs ? 'background.default' : 'background.header',
							display: 'flex',
							zIndex: 300,
							borderBottom: isXs ? '' : `1px solid ${muiTheme?.palette?.primary?.highlight}`,
							justifyContent: isXs && !open ? 'space-between' : 'center',
						}}
					>
						<Box
							sx={{
								padding: 0,
								paddingLeft: '1rem',
								width: '100%',
								alignItems: 'center',
								display: 'flex',
							}}
						>
							<Button
								onClick={handleCloseCurrentWeather}
								sx={{
									fontWeight: 800,
									padding: 0,
									fontSize: '1rem',
									visibility: open ? 'hidden' : 'visible',
									marginRight: '2rem',

									'&:hover': {
										color: 'secondary.main',
									},
								}}
								variant="filled"
							>
								<ArrowBackSharpIcon sx={{ fontSize: '2.1rem' }} />
							</Button>
						</Box>

						{isXs && (
							<Box
								sx={{
									padding: 0,
									width: '100%',
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Button
									onClick={() => toggleDrawer(true)}
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										padding: 0,
										fontWeight: 800,

										fontSize: '1rem',
										'&:hover': {
											color: 'secondary.main',
										},
									}}
									variant="filled"
								>
									<MenuIcon sx={{ fontSize: '2.5rem' }} />
								</Button>
							</Box>
						)}

						{isXs ? null : (
							<Box
								sx={{
									padding: 0,
									width: '100%',
									alignItems: 'center',
									justifyContent: 'center',
									display: 'flex',
								}}
							>
								<SearchBar
									cityToReplace={cityToReplace}
									handleCloseCurrentWeather={handleCloseCurrentWeather}
									isDrawerOpen={isDrawerOpen}
									setCityToReplace={setCityToReplace}
									setIsDrawerOpen={toggleDrawer}
									setOpen={setOpen}
								/>
							</Box>
						)}

						<Box
							sx={{
								padding: 0,
								width: '100%',
								alignItems: 'center',
								display: 'flex',
								justifyContent: 'end',
								paddingRight: '1rem',
							}}
						>
							{!isXs ? (
								<>
									<Stack direction="row" spacing={4}>
										<ToggleButtonGroup
											exclusive
											onChange={handleToggleUnits}
											value={settings?.preferences?.units}
										>
											<ToggleButton sx={{ padding: '0.2rem 0.7rem' }} value="metric">
												<Typography variant="subtitle1"> &#176;C </Typography>
											</ToggleButton>
											<ToggleButton
												sx={{ padding: '0.2rem 0.7rem' }}
												value="imperial"
												variant="subtitle1"
											>
												<Typography> &#176;F </Typography>
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
								</>
							) : null}
						</Box>
					</Box>
					<Expanded
						animation={detailsStyle}
						handleCloseCurrentWeather={handleCloseCurrentWeather}
						open={open}
					/>
					<AnimatedGrid
						container
						spacing={3}
						sx={{
							maxWidth: () => {
								if (isXs) {
									return '300px';
								}
								if (isSm) {
									return '550px';
								}
								return '800px';
							},
							justifyContent: 'center',
							position: 'absolute',
							top: isXs ? 90 : 150,
							zIndex: open ? 100 : -100,
							paddingBottom: '3rem',
						}}
					>
						{springs?.map((style, index) => (
							// CityContainer
							<AnimatedGrid
								id={index}
								key={index}
								onClick={() => handleOpenCurrentWeather(index)}
								size={{ xs: 12, sm: 6, md: 4 }}
								style={{ ...style, transform: style.xys.to(trans) }}
								sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
							>
								<City
									city={cities[index]}
									isDrawerOpen={isDrawerOpen}
									setCityToReplace={setCityToReplace}
									setIsDrawerOpen={setIsDrawerOpen}
								/>
							</AnimatedGrid>
						))}
					</AnimatedGrid>
				</Box>
			</Container>
		</>
	);
};

export default App;

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
import React, { useContext, useMemo, useRef, useState } from 'react';
import { useSpring, useSprings } from 'react-spring';

import Expanded from './components/Expanded/Expanded';
import SearchBar from './components/SearchBar/SearchBar';
import { AppContext } from './context/AppContext';
import { useBreakpoint } from './hooks/useBreakpoint';
import useOutsideClick from './hooks/useOutsideClick';

const MaterialUISwitch = styled(Switch)(({ theme, isXs }) => ({
	width: isXs ? 60 : 50,
	height: isXs ? 38 : 32,
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
		width: isXs ? 30 : 23,
		transform: 'translateY(3px)',
		height: isXs ? 30 : 23,
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
		borderRadius: (isXs ? 30 : 20) / 2,
		...theme.applyStyles('dark', {
			backgroundColor: '#8796A5',
		}),
	},
}));

const AnimatedBox = animated(Box);

const App = () => {
	const { theme, setSettings, settings, setTheme, isGridOpen } = useContext(AppContext);
	const [headerClickedIcon, setHeaderClickedIcon] = useState('search');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [cityToReplace, setCityToReplace] = useState('');
	const springsNumber = useMemo(() => (isGridOpen ? 9 : 7), [isGridOpen]);
	const containerRef = useRef(null);
	const appBarRef = useRef(null);

	const { isXs } = useBreakpoint();

	const muiTheme = useTheme();

	const [springs, api] = useSprings(springsNumber, (i) => ({
		from: { opacity: 0, xys: [30, 0, 0, 50], backdropFilter: 'blur(0px)' },
		to: { opacity: 1, xys: [0, 0, 1, 0], backdropFilter: 'blur(7.5px)' },
		delay: () => i * 50,
	}));

	const toggleDrawer = (value) => setIsDrawerOpen(value);

	const handleToggleUnits = (event, newAlignment) => {
		if (newAlignment !== null) {
			setSettings((prev) => ({ ...prev, preferences: { ...prev?.preferences, units: newAlignment } }));
		}
	};

	const appBar = useSpring({
		config: { duration: 300 },
		from: {
			height: isDrawerOpen ? '56px' : '500px',
			backgroundColor: isDrawerOpen ? 'transparent' : muiTheme?.palette?.background?.shadeOne,
		},
		to: {
			height: !isDrawerOpen ? '56px' : '500px',
			backgroundColor: !isDrawerOpen ? 'transparent' : muiTheme?.palette?.background?.shadeOne,
		},
	});

	console.log(isDrawerOpen);

	useOutsideClick({ ref: appBarRef, callback: () => toggleDrawer(false) });

	return (
		<>
			<Container
				sx={{
					padding: '0 !important',
					height: '100vh',
					minWidth: '100vw',
					background: `linear-gradient(180deg, ${muiTheme?.palette?.background?.default} 0%,${muiTheme?.palette?.background?.shadeOne} 53%, ${muiTheme?.palette?.background?.shadeTwo} 100%)`,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<AnimatedBox
					ref={appBarRef}
					style={appBar}
					sx={{
						position: 'fixed',
						width: '100%',
						overflow: 'hidden',
						display: 'flex',
						bacgroundColor: 'transparent',
						zIndex: muiTheme?.zIndex?.appBar,
						alignItems: 'flex-start',
					}}
				>
					<Grid
						container
						spacing={{ xs: 1, sm: 3 }}
						sx={{ width: '100%', padding: isXs ? '0.5rem 2rem' : '0.5rem 4rem', position: 'fixed' }}
					>
						<Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></Grid>
						<Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></Grid>

						<Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<IconButton
								aria-label="search"
								onClick={() => {
									if (isXs && headerClickedIcon !== 'search' && isDrawerOpen) {
										setHeaderClickedIcon('search');
									} else {
										setHeaderClickedIcon('search');
										toggleDrawer((prev) => !prev);
									}
								}}
								sx={{ color: 'text.secondary', marginRight: '2rem' }}
							>
								<SearchIcon sx={{ fontSize: isXs ? '2rem' : '1.7rem' }} />
							</IconButton>
							{isXs ? (
								<IconButton
									onClick={() => {
										if (isXs && headerClickedIcon !== 'menu' && isDrawerOpen) {
											setHeaderClickedIcon('menu');
										} else {
											setHeaderClickedIcon('menu');
											toggleDrawer((prev) => !prev);
										}
									}}
								>
									<MenuIcon sx={{ fontSize: isXs ? '2rem' : '1.5rem' }} />
								</IconButton>
							) : (
								<Stack direction="row" spacing={4}>
									<ToggleButtonGroup
										exclusive
										onChange={handleToggleUnits}
										sx={{ borderRadius: '16px', backgroundColor: 'background.window' }}
										value={settings?.preferences?.units}
									>
										<ToggleButton
											sx={{
												padding: '0rem 0.6rem',
												backgroundColor: 'background.window',
												borderRadius: '45% 0px 0px 45%',
												borderColor: 'accent.main',

												'&.Mui-selected': {
													background: `linear-gradient(45deg, ${muiTheme?.palette?.accent?.main} 0%,${muiTheme?.palette?.accent?.light} 100%)`,
													color: 'white',
												},
											}}
											value="metric"
											variant="subtitle1"
										>
											<Typography fontWeight={500} sx={{ fontSize: '1rem' }} variant="subtitle1">
												{' '}
												&#176;C{' '}
											</Typography>
										</ToggleButton>
										<ToggleButton
											sx={{
												padding: '0rem 0.6rem',
												borderColor: 'accent.main',
												borderRadius: '0px 45% 45% 0px',

												'&.Mui-selected': {
													background: `linear-gradient(45deg, ${muiTheme?.palette?.accent?.main} 0%,${muiTheme?.palette?.accent?.light} 100%)`,
													color: 'white',
												},
											}}
											value="imperial"
											variant="subtitle1"
										>
											<Typography fontWeight={500} sx={{ fontSize: '1rem' }} variant="subtitle1">
												{' '}
												&#176;F{' '}
											</Typography>
										</ToggleButton>
									</ToggleButtonGroup>
									<MaterialUISwitch
										checked={theme?.mode === 'dark'}
										isXs={isXs}
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
									isDrawerOpen={isDrawerOpen}
									open={open}
									openApi={api}
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
											sx={{
												padding: '0.2rem 0.7rem',
												borderRadius: '45% 0px 0px 45%',
												borderColor: 'accent.main',
												fontSize: isXs ? '1.5rem' : '0.7rem',
												'&.Mui-selected': {
													background: `linear-gradient(45deg, ${muiTheme?.palette?.accent?.main} 0%,${muiTheme?.palette?.accent?.light} 100%)`,
													color: 'white',
												},
											}}
											value="metric"
										>
											<Typography variant="subtitle1"> &#176;C </Typography>
										</ToggleButton>
										<ToggleButton
											sx={{
												padding: '0.2rem 0.7rem',

												borderRadius: '0px 45% 45% 0px',
												borderColor: 'accent.main',
												'&.Mui-selected': {
													background: `linear-gradient(45deg, ${muiTheme?.palette?.accent?.main} 0%,${muiTheme?.palette?.accent?.light} 100%)`,
													color: 'white',
												},
											}}
											value="imperial"
											variant="subtitle1"
										>
											<Typography variant="subtitle1"> &#176;F </Typography>
										</ToggleButton>
									</ToggleButtonGroup>
								</Grid>
								<Grid size={12}>
									<MaterialUISwitch
										checked={theme?.mode === 'dark'}
										isXs={isXs}
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
						marginTop: '56px',
						padding: isXs ? '1rem 1rem 10rem 1rem' : '1.5rem 2rem 10rem 2rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
						alignItems: 'center',
						width: '100%',
						height: '100%',
						overflowY: 'scroll',
						overflowX: 'hidden',
						'&::-webkit-scrollbar': {
							width: '0.5rem',
						},
						'&::-webkit-scrollbar-track': {
							background: muiTheme?.palette?.scrollbarColor?.background,
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: muiTheme?.palette?.scrollbarColor?.primary,
							borderRadius: '10px',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							backgroundColor: muiTheme?.palette?.scrollbarColor?.hover,
						},
						position: 'relative',
					}}
				>
					<Expanded
						api={api}
						containerRef={containerRef}
						setCityToReplace={setCityToReplace}
						setHeaderClickedIcon={setHeaderClickedIcon}
						setIsDrawerOpen={setIsDrawerOpen}
						springs={springs}
					/>
				</Box>
			</Container>
		</>
	);
};

export default App;

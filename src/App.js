import './App.css';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import {
	Box,
	Container,
	Divider,
	Drawer,
	Grid2 as Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useContext, useRef, useState } from 'react';

import Expanded from './components/Expanded/Expanded';
import SearchBar from './components/SearchBar/SearchBar';
import { AppContext } from './context/AppContext';
import { useBreakpoint } from './hooks/useBreakpoint';
import useOutsideClick from './hooks/useOutsideClick';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

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

const App = () => {
	const { theme, setSettings, settings, setTheme } = useContext(AppContext);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [cityToReplace, setCityToReplace] = useState('');

	const appBarRef = useRef(null);

	const { isXs } = useBreakpoint();

	const muiTheme = useTheme();

	const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

	const handleToggleUnits = (event, newAlignment) => {
		if (newAlignment !== null) {
			setSettings((prev) => ({ ...prev, preferences: { ...prev?.preferences, units: newAlignment } }));
		}
	};

	// const handleSortBy = useCallback(() => {
	// 	const updatedCities = cities ? [...cities] : [];
	// 	const sorted = sortBy(updatedCities, 'name');

	// 	setCities(map(sorted, (el, index) => ({ ...el, weight: index + 1 })));
	// }, [cities, setCities]);

	useOutsideClick({ ref: appBarRef, callback: () => toggleDrawer(false) });

	return (
		<>
			<Container
				sx={{
					padding: '0 !important',
					height: '100vh',
					background: `linear-gradient(180deg, ${muiTheme?.palette?.background?.default} 0%,${muiTheme?.palette?.background?.shadeOne} 53%, ${muiTheme?.palette?.background?.shadeTwo} 100%)`,
					minWidth: '100vw',
					backgroundColor: 'background.appBar',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Drawer
					anchor="left"
					open={isDrawerOpen}
					sx={{
						width: '100vw',
						flexShrink: 0,

						'& .MuiDrawer-paper': {
							width: '100vw',
							boxSizing: 'border-box',
							backgroundColor: 'background.appBar',
							backdropFilter: 'blur(7.6px)',
							'-webkit-backdrop-filter': 'blur(7.6px)',
						},
					}}
					variant="persistent"
				>
					<DrawerHeader>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</DrawerHeader>

					<List>
						<ListItem key={'search'}>
							<SearchBar
								cityToReplace={cityToReplace}
								isDrawerOpen={isDrawerOpen}
								isInDrawer={!!isXs}
								setCityToReplace={setCityToReplace}
								setIsDrawerOpen={toggleDrawer}
							/>
						</ListItem>
					</List>

					<List>
						<ListItem key={'theme'}>
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
							<ListItemText primary={'Theme'} />
						</ListItem>
						<ListItem key={'units'}>
							<ToggleButtonGroup
								exclusive
								onChange={handleToggleUnits}
								sx={{ borderRadius: '16px', backgroundColor: 'background.window', marginRight: '1rem' }}
								value={settings?.preferences?.units}
							>
								<ToggleButton
									sx={{
										padding: '0rem 0.4rem',
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
									<Typography fontWeight={500} sx={{ fontSize: '0.8rem' }} variant="subtitle1">
										{' '}
										&#176;C{' '}
									</Typography>
								</ToggleButton>
								<ToggleButton
									sx={{
										padding: '0rem 0.4rem',
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
									<Typography fontWeight={500} sx={{ fontSize: '0.8rem' }} variant="subtitle1">
										{' '}
										&#176;F{' '}
									</Typography>
								</ToggleButton>
							</ToggleButtonGroup>
							<ListItemText primary={'Units'} />
						</ListItem>
					</List>
					<Divider />
					<List>
						{/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem disablePadding key={text}>
								<ListItemButton>
									<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))} */}
					</List>
				</Drawer>
				{/* <AppBar
					ref={appBarRef}
					style={appBar}
					sx={{
						backgroundColor: 'background.appBar',
						height: '100%',
						overflow: 'hidden',
						display: 'flex',
						position: 'fixed',
						borderRadius: '0 1rem',
						top: '5%',
						padding: isXs ? '2rem 0.2rem' : '4rem 0.2rem',
						zIndex: muiTheme?.zIndex?.appBar,
						alignItems: 'flex-start',
					}}
				>
					<Grid container spacing={{ xs: 1, sm: 3 }} sx={{ width: '100%' }}>
						<Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<IconButton
								aria-label="location"
								onClick={() => handleGetLocation()}
								sx={{ color: 'text.secondary', marginRight: '0rem' }}
							>
								<LocationOnIcon sx={{ fontSize: isXs ? '1.7rem' : '1.5rem' }} />
							</IconButton>
							<Clock local={true} />
						</Grid>

						<Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<IconButton
								aria-label="search"
								onClick={() => handleSortBy()}
								sx={{ color: 'text.secondary', marginRight: '2rem' }}
							>
								<SortByAlphaIcon sx={{ fontSize: isXs ? '2rem' : '1.7rem' }} />
							</IconButton>
						</Grid>

						<Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
						</Grid> */}
				{/* <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
							<Grid
								size={12}
								sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
							></Grid>
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
						</Grid> */}
				{/* <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
						{isDrawerOpen && headerClickedIcon === 'search' ? (
							<Grid size={12}>
								<SearchBar
									cityToReplace={cityToReplace}
									isDrawerOpen={isDrawerOpen}
									open={open}
									setCityToReplace={setCityToReplace}
									setIsDrawerOpen={toggleDrawer}
								/>
							</Grid>
						) : null}
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
				</AppBar> */}

				<Box
					id="scrollable-container"
					sx={{
						padding: isXs ? '1rem 1rem 5rem 1rem' : '1.5rem 2rem 5rem 2rem',
						marginTop: '3rem',
						width: '100%',
						borderRadius: '1.5rem 0rem 0rem 0rem',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
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
					<Grid
						container
						spacing={1}
						sx={{
							position: 'fixed',
							width: '100%',
							top: 0,
							left: 0,
							height: '48px',
							backgroundColor: 'background.default',
							zIndex: 1000,
						}}
					>
						<Grid
							size={isXs ? 12 : 4}
							sx={{ display: 'flex', paddingLeft: '2rem', justifyContent: 'start', alignItems: 'center' }}
						>
							<IconButton
								aria-label="open drawer"
								color="inherit"
								edge="start"
								onClick={() => toggleDrawer()}
								sx={[
									{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									},
									!isXs && { display: 'none' },
								]}
							>
								<MenuIcon sx={{ fontSize: '2rem' }} />
							</IconButton>
						</Grid>
						{!isXs ? (
							<>
								<Grid
									size={4}
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										maxWidth: '300px',
										margin: '0 auto',
										zIndex: 100,
									}}
								>
									<SearchBar
										cityToReplace={cityToReplace}
										isDrawerOpen={isDrawerOpen}
										open={open}
										setCityToReplace={setCityToReplace}
										setIsDrawerOpen={toggleDrawer}
									/>
								</Grid>

								<Grid size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									<ToggleButtonGroup
										exclusive
										onChange={handleToggleUnits}
										sx={{
											borderRadius: '16px',
											backgroundColor: 'background.window',
											marginRight: '1rem',
										}}
										value={settings?.preferences?.units}
									>
										<ToggleButton
											sx={{
												padding: '0rem 0.4rem',
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
											<Typography
												fontWeight={500}
												sx={{ fontSize: '0.8rem' }}
												variant="subtitle1"
											>
												{' '}
												&#176;C{' '}
											</Typography>
										</ToggleButton>
										<ToggleButton
											sx={{
												padding: '0rem 0.4rem',
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
											<Typography
												fontWeight={500}
												sx={{ fontSize: '0.8rem' }}
												variant="subtitle1"
											>
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
								</Grid>
							</>
						) : null}
					</Grid>
					<Expanded setCityToReplace={setCityToReplace} />
				</Box>
			</Container>
		</>
	);
};

export default App;

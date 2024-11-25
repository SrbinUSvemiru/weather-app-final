import './App.css';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Container, Drawer, Grid2 as Grid } from '@mui/material';
import { animated } from '@react-spring/web';
import React, { useContext, useRef, useState } from 'react';
import { useSprings } from 'react-spring';

import City from './components/City/City';
import Expanded from './components/Expanded/Expanded';
import SearchBar from './components/SearchBar/SearchBar';
import { AppContext } from './context/AppContext';
import { useBreakpoint } from './hooks/useBreakpoint';

const AnimatedGrid = animated(Grid);

const trans = (x, y, s, z) => `perspective(600px) translateZ(${z}px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
const App = () => {
	const [open, setOpen] = useState(true);
	const [currentCity, setCurrentCity] = useState({});
	const cardsRef = useRef([]);
	const { isXs, isSm } = useBreakpoint();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { cities } = useContext(AppContext);

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

	const [springs, api] = useSprings(
		cities?.length,
		(i) => ({
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
		}),
		[],
	);

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
			delay: () => i * 50 + 100,
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
							background: 'background.main',
							padding: '2rem',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
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
							<SearchBar
								handleCloseCurrentWeather={handleCloseCurrentWeather}
								isDrawerOpen={isDrawerOpen}
								setIsDrawerOpen={toggleDrawer}
							/>
						</Box>
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
							paddingTop: isXs ? '1rem' : '3rem',
							width: '100%',
							position: isXs ? 'sticky' : 'relative',
							top: 0,
							background: '#222831',
							display: 'flex',
							zIndex: 300,
							justifyContent: isXs && !open ? 'space-between' : 'center',
						}}
					>
						{!open && (
							<Button
								onClick={handleCloseCurrentWeather}
								sx={{
									fontWeight: 800,
									fontSize: '1rem',
									marginRight: '2rem',
									'&:hover': {
										color: 'secondary.main',
									},
								}}
								variant="filled"
							>
								<ArrowBackSharpIcon sx={{ fontSize: '2.7rem' }} />
							</Button>
						)}
						{isXs && (
							<Button
								onClick={() => toggleDrawer(true)}
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
						)}
						{!open || isXs ? null : (
							<SearchBar
								handleCloseCurrentWeather={handleCloseCurrentWeather}
								isDrawerOpen={isDrawerOpen}
								setIsDrawerOpen={toggleDrawer}
								setOpen={setOpen}
							/>
						)}
					</Box>
					<Expanded
						animation={detailsStyle}
						currentCity={currentCity}
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
								key={index}
								onClick={() => handleOpenCurrentWeather(index)}
								ref={(el) => (cardsRef.current[index] = el)}
								size={{ xs: 12, sm: 6, md: 4 }}
								style={{ ...style, transform: style.xys.to(trans) }}
								sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
							>
								<City city={cities[index]} index={index} setCurrentCity={setCurrentCity} />
							</AnimatedGrid>
						))}
					</AnimatedGrid>
				</Box>
			</Container>
		</>
	);
};

export default App;

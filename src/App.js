import React, { useCallback, useEffect, useContext, useState, useRef, useTransition } from 'react';
import { useSprings, useSpring, useTrail, useSpringRef, useChain } from 'react-spring';
import { animated } from '@react-spring/web';
import { Carousel, Detailed, Item, EmptyCell } from './styled-components';
import './App.css';
import City from './Components/City/City';
import SearchBar from './Components/SearchBar/SearchBar';
import Expanded from './Components/Expanded/Expanded';
import { images, makeRandomNumbers } from './Utils/utils';
import { v4 as uuid } from 'uuid';
import { useBreakpoint } from './hooks/useBreakpoint';
import { Container, Grid2 as Grid, Box, Button, Drawer } from '@mui/material';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { AppContext } from './context/AppContext/AppContext';

const AnimatedGrid = animated(Grid);

const trans = (x, y, s, z) => `perspective(600px) translateZ(${z}px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
function App() {
	const [open, setOpen] = useState(true);
	const [currentCity, setCurrentCity] = useState({});
	const cardsRef = useRef([]);
	const { isXs, isSm, isMd } = useBreakpoint();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { cities, setCities } = useContext(AppContext);

	// const [style, detailsApi] = useSpring(() => ({
	//
	// 	from: { opacity: 0, scale: 0, x: 0 },
	// 	to: { opacity: 1, scale: 1, x: 0 },
	// }));

	const [detailsStyle, detailsApi] = useSprings(
		9,
		(i) => ({
			delay: () => i * 100,

			config: {
				tension: 1000,
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
			delay: () => i * 50 + 300,
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

	const handleCloseCurrentWeather = (e) => {
		// Reverse the animations

		setOpen(true);
		detailsApi?.start((i) => ({
			delay: () => i * 50,
			to: {
				opacity: 0,
				xys: [0, 0, 0, -(i + 10) * 10], // Reverse the final state to match the initial state of handleOpen
			},
		}));
		api?.start((i) => ({
			delay: () => i * 50 + 300,
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
					background: '#222831',
					position: 'relative', // Enable pseudo-elements to position correctly
					overflow: 'hidden',
				}}
			>
				<Drawer open={isDrawerOpen} onClose={() => toggleDrawer(false)} anchor="left">
					<Box
						sx={{
							width: '100vw',
							height: '100%',
							background: '#222831',
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
								variant="filled"
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									fontWeight: 800,
									fontSize: '1rem',
								}}
								onClick={() => toggleDrawer(false)}
							>
								<MenuIcon sx={{ fontSize: '2.7rem' }} />
							</Button>
							<SearchBar
								cities={cities}
								setCities={setCities}
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
								variant="filled"
								sx={{
									fontWeight: 800,
									fontSize: '1rem',
									marginRight: '2rem',
								}}
								onClick={handleCloseCurrentWeather}
							>
								<ArrowBackSharpIcon sx={{ fontSize: '2.7rem' }} />
							</Button>
						)}
						{isXs && (
							<Button
								variant="filled"
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									fontWeight: 800,
									fontSize: '1rem',
								}}
								onClick={() => toggleDrawer(true)}
							>
								<MenuIcon sx={{ fontSize: '2.7rem' }} />
							</Button>
						)}
						{!open || isXs ? null : (
							<SearchBar
								cities={cities}
								setCities={setCities}
								setOpen={setOpen}
								handleCloseCurrentWeather={handleCloseCurrentWeather}
								isDrawerOpen={isDrawerOpen}
								setIsDrawerOpen={toggleDrawer}
							/>
						)}
					</Box>
					<Expanded
						animation={detailsStyle}
						open={open}
						handleCloseCurrentWeather={handleCloseCurrentWeather}
						currentCity={currentCity}
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
								size={{ xs: 12, sm: 6, md: 4 }}
								key={index}
								ref={(el) => (cardsRef.current[index] = el)}
								sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								style={{ ...style, transform: style.xys.to(trans) }}
								onClick={(e) => handleOpenCurrentWeather(index)}
							>
								<City
									city={cities[index]}
									index={index}
									setCurrentCity={setCurrentCity}
									cities={cities}
									setCities={setCities}
								/>
							</AnimatedGrid>
						))}
					</AnimatedGrid>
				</Box>
			</Container>
		</>
	);
}

export default App;

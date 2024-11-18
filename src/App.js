import React, { useCallback, useEffect, useContext, useState, useRef } from 'react';
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
import { AppContext } from './context/AppContext/AppContext';

const AnimatedGrid = animated(Grid);

const calc = (x, y, rect) => [-(y - rect.top - rect.height / 2) / 17, (x - rect.left - rect.width / 3) / 13, 1.1, 0];

const trans = (x, y, s, z) => `perspective(600px) translateZ(${z}px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
function App() {
	const rand = [2, 6, 4, 2, 3, 5, 1, 4, 2];
	const [open, setOpen] = useState(true);
	const [currentCity, setCurrentCity] = useState({});
	const cardsRef = useRef([]);
	const [isAnimating, setIsAnimating] = useState(false);
	const { isXs, isSm, isMd } = useBreakpoint();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { cities, setCities } = useContext(AppContext);

	// const [style, detailsApi] = useSpring(() => ({
	// 	clamp: true,
	// 	from: { opacity: 0, scale: 0, x: 0 },
	// 	to: { opacity: 1, scale: 1, x: 0 },
	// }));

	const [detailesStyle, detailsApi] = useSprings(
		9,
		(i) => ({
			delay: () => i * 100,
			clamp: true,
			config: {
				tension: 200, // Controls the speed of the animation
				friction: 50, // Higher values slow the animation down
				mass: 1, // Higher values result in slower, heavier animations
			},
			from: {
				opacity: 0,
				scale: 0,
				rotate: rand[i] * 20,
				xys: [0, rand[i] * 20, 1, rand[i] * 100],
			},
			to: { opacity: 1, scale: 1, rotate: 0, xys: [0, 0, 1, 0] },
		}),
		[],
	);

	const [springs, api] = useSprings(
		cities?.length,
		(i) => ({
			delay: () => i * 100,
			clamp: true,
			config: {
				tension: 200, // Controls the speed of the animation
				friction: 50, // Higher values slow the animation down
				mass: 1, // Higher values result in slower, heavier animations
			},
			from: {
				opacity: 0,
				scale: 0,
				rotate: -rand[i] * 20,
				xys: [0, rand[i] * 20, 1, rand[i] * 200],
			},
			to: { opacity: 1, scale: 1, rotate: 0, xys: [0, 0, 1, 0] },
		}),
		[],
	);

	const handleMouseLeave = useCallback((index) => {
		api.start((i) =>
			i === index
				? {
						xys: [0, 0, 1, 0],
						immediate: false,
					}
				: {},
		);
	}, []);

	const handleMouseMove = useCallback(
		(e, index) => {
			const rect = cardsRef?.current[index]?.getBoundingClientRect();
			if (rect && !isAnimating) {
				api.start((i) =>
					i === index
						? {
								xys: calc(e.clientX, e.clientY, rect),
								immediate: false,
							}
						: {},
				);
			}
		},
		[api],
	);

	const handleOpenCurrentWeather = (e) => {
		api?.start((i) => ({
			opacity: 0,
			scale: 0,
			xys: [0, rand[i] * 20, 1, rand[i] * 50],
			rotate: -rand[i] * 20,
			onStart: () => setIsAnimating(true),
			onRest: (finished) => {
				if (finished) {
					console.log(finished);
					setOpen(false);
					detailsApi?.start((i) => ({
						from: {
							opacity: 0,
							scale: 0,
							rotate: -rand[i] * 30,
							xys: [0, rand[i] * 10, 1, rand[i] * 20],
						},
						to: {
							opacity: 1,
							scale: 1,
							rotate: 0,
							xys: [0, 0, 1, 0],
						},
					}));
				}
			},
		}));
	};

	const handleCloseCurrentWeather = (e) => {
		detailsApi?.start((i) => ({
			opacity: 0,
			scale: 0,
			rotate: rand[i] * 30,
			xys: [rand[i] * 20, 0, 1, rand[i] * 20],
			onRest: (finished) => {
				if (finished) {
					setOpen(true);

					api?.start((i) => ({
						from: {
							opacity: 0,
							scale: 0,
							rotate: -rand[i] * 20,
							xys: [0, rand[i] * 20, 1, rand[i] * 200],
						},
						to: {
							opacity: 1,
							scale: 1,
							rotate: 0,
							xys: [0, 0, 1, 0],
						},
						onRest: (finished) => {
							if (finished) {
								setIsAnimating(false);
							}
						},
					}));
				}
			},
		}));
	};

	return (
		<Container
			sx={{
				padding: '0 !important',
				margin: 0,
				height: '100vh',
				minWidth: '100vw',
				backgroundImage: 'url(../images/light2.jpg)',
				backgroundSize: 'cover',
				position: 'relative', // Enable pseudo-elements to position correctly
				overflow: 'hidden',
			}}
		>
			<Box
				sx={{
					// padding: '0 !important',
					margin: 0,
					paddingTop: isXs ? '2rem' : '3rem',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start',
					alignItems: 'center',
					width: '100%',
					height: '100%',
					overflow: 'scroll',
					zIndex: 2,
					position: 'relative',
				}}
			>
				<Box
					sx={{
						width: '100%',
						padding: '2rem',
						marginBottom: open ? '3rem' : '1rem',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{!open && (
						<AnimatedGrid size={12}>
							<Button
								variant="filled"
								sx={{
									width: '100%',
									height: '100%',
									fontWeight: 800,
									fontSize: '1rem',
									marginRight: '2rem',
								}}
								startIcon={<ArrowBackSharpIcon />}
								onClick={handleCloseCurrentWeather}
							>
								Back
							</Button>
						</AnimatedGrid>
					)}
					{!open && isXs ? null : <SearchBar cities={cities} setCities={setCities} setOpen={setOpen} />}
				</Box>
				{open ? (
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
								onClick={(e) => (cities[index]?.id ? handleOpenCurrentWeather(e) : {})}
								onMouseLeave={() => handleMouseLeave(index)}
								onMouseMove={(e) => handleMouseMove(e, index)}
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
				) : (
					<Expanded
						animation={detailesStyle}
						open={open}
						handleCloseCurrentWeather={handleCloseCurrentWeather}
						currentCity={currentCity}
					/>
				)}
			</Box>
		</Container>
	);
}

export default App;

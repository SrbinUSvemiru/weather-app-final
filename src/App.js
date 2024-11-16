import React, { useEffect, useMemo, useState } from 'react';
import { useTransition, useSpring, useTrail } from 'react-spring';
import { animated } from '@react-spring/web';
import { Carousel, Detailed, Item, EmptyCell } from './styled-components';
import './App.css';
import City from './Components/City/City';
import SearchBar from './Components/SearchBar/SearchBar';
import Expanded from './Components/Expanded/Expanded';
import { Images, multipleClassNames } from './Utils/utils';
import { v4 as uuid } from 'uuid';
import { useBreakpoint } from './hooks/useBreakpoint';
import { Container, Grid2 as Grid, Box } from '@mui/material';

const AnimatedGrid = animated(Grid);

function App() {
	const [open, setOpen] = useState(true);
	const [currentCity, setCurrentCity] = useState({});

	const { isXs, isSm, isMd } = useBreakpoint();

	const [cities, setCities] = useState([
		{ id: uuid(), country: 'EG', name: 'New Cairo', lat: '30.03', lon: '31.47' },
		{ id: uuid(), country: 'AR', name: 'Los Menucos', lat: '-40.84402', lon: '-68.08718' },
		{ id: uuid(), country: 'RS', name: 'Novi Sad', lat: '45.25167', lon: '19.83694' },
		{ id: uuid(), country: 'RS', name: 'Zemun', lat: '44.8458', lon: '20.40116' },
		{ id: uuid(), country: 'RS', name: 'Novi Beograd', lat: '44.80556', lon: '20.42417' },
		{ id: '' },
		{ id: '' },
		{ id: '' },
		{ id: '' },
	]);

	useEffect(() => {
		let retrieveStorage = JSON.parse(localStorage.getItem('cities'));
		if (retrieveStorage?.length) {
			setCities(retrieveStorage);
		} else {
			localStorage.setItem('cities', JSON.stringify(cities));
		}
	}, []);

	const { x, ...style } = useSpring({
		config: { mass: 7, tension: 5000, friction: 200 },
		delay: !open ? 300 : 0,
		from: { opacity: 0, x: 0 },
		to: {
			opacity: !open ? 1 : 0,
			x: !open ? 1 : 0,
			border: '1px solid rgba(0, 0, 0, 0.1)',
			boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
			backdropFilter: 'saturate(50%) blur(10px)',
			background: 'rgba(0, 0, 0, 0.1)',
			borderRadius: '10px',
			willChange: 'transform, opacity',
		},
	});

	const gridStyle = useSpring({
		config: { mass: 7, tension: 2000, friction: 200 },
		delay: 200,
		from: { display: !open ? 'flex' : 'none' },
		to: {
			display: open ? 'flex' : 'none',
		},
	});

	const trail = useTrail(cities?.length, {
		config: { mass: 3, tension: 1500, friction: 150 },
		from: { opacity: open ? 0 : 1, x: open ? 0 : 1, display: open ? 'none' : 'flex' },
		to: {
			opacity: open ? 1 : 0,
			x: open ? 1 : 0,
			display: !open ? 'none' : 'flex',
		},
	});

	const handleItemClick = (e) => {
		e.stopPropagation();
		setOpen(!open);
	};

	return (
		<Container
			sx={{
				padding: '0 !important',
				margin: 0,
				height: '100vh',
				minWidth: '100vw',
				backgroundImage: 'linear-gradient( 45.3deg,  rgba(0,119,182,1) 3.6%, rgba(8,24,68,1) 87.6% )',
				position: 'relative', // Enable pseudo-elements to position correctly
				overflow: 'hidden',
			}}
		>
			{/* {backgroundTransition((style, index) => (
				<Carousel
					style={{
						...style,
						backgroundImage: `url(../images/${Images[3]}.jpg)`,
					}}
				/>
			))} */}
			<Box
				sx={{
					padding: '0 !important',
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
				<SearchBar setCities={setCities} cities={cities} setOpen={setOpen} />
				{currentCity && !open ? (
					<Expanded animation={{ ...style, x }} setOpen={setOpen} open={open} currentCity={currentCity} />
				) : null}

				{open ? (
					<AnimatedGrid
						container
						spacing={3}
						style={gridStyle}
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
							mt: '3rem',
							paddingBottom: '3rem',
						}}
					>
						{trail?.map(({ x, ...style }, index) => (
							// CityContainer
							<AnimatedGrid
								size={{ xs: 12, sm: 6, md: 4 }}
								key={index}
								sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								style={{ ...style, transform: x.to((x) => `scale(${x})`) }}
								onClick={(e) => (cities[index]?.id ? handleItemClick(e) : {})}
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
				) : null}
			</Box>
		</Container>
	);
}

export default App;

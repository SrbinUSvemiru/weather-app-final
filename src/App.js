import React, { useEffect, useMemo, useState } from 'react';
import { useTransition, useSpring, useTrail } from 'react-spring';
import { Carousel, Detailed, Item, Grid, EmptyCell } from './styled-components';
import './App.css';
import City from './Components/City/City';
import SearchBar from './Components/SearchBar/SearchBar';
import Expanded from './Components/Expanded/Expanded';
import { Images } from './Utils/utils';
import { defaultCities } from './constants/defaultCities';
import { v4 as uuid } from 'uuid';

function App() {
	const [open, setOpen] = useState(true);
	const [currentCity, setCurrentCity] = useState({});
	const [position, setPosition] = useState(0);
	const [cities, setCities] = useState([
		{ id: uuid(), country: 'EG', name: 'New Cairo', lat: '30.03', lon: '31.47' },
		{ id: uuid(), country: 'AR', name: 'Los Menucos', lat: '-40.84402', lon: '-68.08718' },
		{ id: uuid(), country: 'RS', name: 'Novi Sad', lat: '45.25167', lon: '19.83694' },
		{ id: uuid(), country: 'RS', name: 'Zemun', lat: '44.8458', lon: '20.40116' },
		{ id: uuid(), country: 'RS', name: 'Novi Beograd', lat: '44.80556', lon: '20.42417' },
	]);

	useEffect(() => {
		let retrieveStorage = localStorage.getItem('cities');
		if (retrieveStorage) {
			setCities(JSON.parse(retrieveStorage));
		}
	}, []);

	const { x, ...style } = useSpring({
		config: { mass: 7, tension: 5000, friction: 200 },
		delay: !open ? 300 : 0,
		from: { opacity: 0, x: 0 },
		to: {
			opacity: !open ? 1 : 0,
			x: !open ? 1 : 0,
		},
	});

	const emptyCell = useSpring({
		config: { mass: 7, tension: 2000, friction: 200 },
		delay: 100,
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: open ? 1 : 0,
			scale: open ? '100%' : '0%',
		},
	});

	const trail = useTrail(cities?.length, {
		config: { mass: 2, tension: 2000, friction: 150 },
		from: { opacity: 0, x: 0 },
		to: {
			opacity: open ? 1 : 0,
			x: open ? 1 : 0,
		},
	});

	const backgroundTransition = useTransition(position, {
		key: position,
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: { duration: 2000 },
	});

	const handleItemClick = (e) => {
		e.stopPropagation();
		setOpen(!open);
	};

	return (
		<div className="App">
			{backgroundTransition((style, index) => (
				<Carousel
					style={{
						...style,
						backgroundImage: `url(../images/${Images[3]}.jpg)`,
					}}
				/>
			))}

			<SearchBar setCities={setCities} cities={cities} setOpen={setOpen} />
			{currentCity && !open ? (
				<Detailed>
					<Expanded animation={{ ...style, x }} setOpen={setOpen} open={open} currentCity={currentCity} />
				</Detailed>
			) : null}
			{open ? (
				<Grid>
					{trail.map(({ x, ...style }, index) => (
						// CityContainer
						<Item
							key={cities[index].name}
							style={{ ...style, transform: x.to((x) => `scale(${x})`) }}
							onClick={(e) => handleItemClick(e)}
						>
							<City
								city={cities[index]}
								index={index}
								setCurrentCity={setCurrentCity}
								cities={cities}
								setCities={setCities}
							/>
						</Item>
					))}
					{cities.length < 9
						? Array.from(Array(9 - cities.length)).map((element, index) => (
								<EmptyCell key={index} style={emptyCell} />
							))
						: ''}
				</Grid>
			) : null}
		</div>
	);
}

export default App;

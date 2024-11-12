import React from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { Window, Wrapper, Row } from './styled-components';
import { useSpring } from 'react-spring';

function CurrentInfoWindow({ currentCity, pop, activeWrapper, setActiveWrapper, animation }) {
	const activeWrapperPop = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: activeWrapper === 'precipitation' ? 0.7 : 0,
			scale: activeWrapper === 'precipitation' ? '100%' : '0%',
			background: 'linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)',
		},
	});

	const activeWrapperWind = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: activeWrapper === 'wind' ? 0.8 : 0,
			scale: activeWrapper === 'wind' ? '100%' : '0%',
			background: 'linear-gradient(to right, #ee9ca7, #ffdde1)',
		},
	});

	const activeWrapperVisibility = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: activeWrapper === 'humidity' ? 0.8 : 0,
			scale: activeWrapper === 'humidity' ? '100%' : '0%',
			background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
		},
	});

	return (
		<Row>
			<Window
				style={{
					...animation,
					transform: animation.x.to((x) => `scale(${x})`),
				}}
				onClick={() => setActiveWrapper('wind')}
			>
				<Wrapper style={activeWrapperWind} />
				<div className="card" title="Wind">
					<img src="../wind.svg" />
					<p id="speed">
						{Math.round(currentCity?.current?.wind?.speed * 3.5)}
						km/h
					</p>
				</div>
			</Window>

			<Window
				style={{
					...animation,
					transform: animation.x.to((x) => `scale(${x})`),
				}}
				onClick={() => setActiveWrapper('precipitation')}
				value="precipitation"
			>
				<Wrapper style={activeWrapperPop} />
				<div className="card" title="Precipitation">
					<img src="../umbrella.svg" />
					<p id="speed">{Math.round(pop) * 100}%</p>
				</div>
			</Window>

			<Window
				style={{
					...animation,
					transform: animation.x.to((x) => `scale(${x})`),
				}}
				onClick={() => setActiveWrapper('humidity')}
				value="humidity"
			>
				<Wrapper style={activeWrapperVisibility} />
				<div className="card" title="Humidity">
					<img src="../humidity.svg" />
					<p id="speed">{currentCity?.current?.main?.humidity}%</p>
				</div>
			</Window>
		</Row>
	);
}

export default CurrentInfoWindow;

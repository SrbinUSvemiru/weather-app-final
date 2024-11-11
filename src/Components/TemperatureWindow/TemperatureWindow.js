import React, { useState, useEffect } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { Window, Wrapper } from './styled-components';
import { useSpring } from 'react-spring';

function TemperatureWindow({ currentCity, activeWrapper: wrapper, animation, setActiveWrapper }) {
	const activeWrapper = useSpring({
		config: { mass: 2, tension: 3000, friction: 150 },
		from: { opacity: 0, scale: '0%' },
		to: {
			opacity: wrapper === 'temperature' ? 0.5 : 0,
			scale: wrapper === 'temperature' ? '100%' : '0%',
		},
	});

	return (
		<Window
			style={{
				...animation,
				transform: animation.x.to((x) => `scale(${x})`),
			}}
			onClick={() => setActiveWrapper('temperature')}
		>
			<Wrapper style={activeWrapper} />
			<div className="row">
				<div id="icon-container">
					<img src={`../icons/${currentCity?.current?.weather?.[0]?.icon}.svg`} id="main-svg" />
				</div>

				<div className="temp-con">
					<div className="container">
						<h1>
							{Math.round((currentCity?.current?.main?.temp * 2) / 2)}&#176;
							<span id="unit">C</span>
						</h1>
					</div>
					<p id="feels-like">
						Feels like: {Math.round(currentCity?.current?.main?.feels_like * 10) / 10}
						&#176;
					</p>
				</div>
			</div>
			<div className="description-row">
				<div id="description">
					<p>{currentCity?.current?.weather?.[0]?.description}</p>
				</div>
				<p>
					<span> Visibility:</span> {Math.round((currentCity?.current?.visibility / 1000) * 10) / 10}
					km
				</p>
			</div>
		</Window>
	);
}

export default TemperatureWindow;

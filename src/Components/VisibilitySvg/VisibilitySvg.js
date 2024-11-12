import React, { useState, useEffect } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, TemperatureTile } from './styled-components';
import { useSpring } from 'react-spring';

function VisibilitySvg({ clicked, currentCity, activeWrapper, graphData }) {
	const humidity = graphData?.humidity?.[clicked];
	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: activeWrapper === 'humidity' ? 1 : 0,
		},
	});

	return (
		<Container style={animation}>
			<svg width="800" height="120" xmlns="http://www.w3.org/2000/svg">
				<NaturalCurve
					data={humidity?.map((value, index) => [
						index * (800 / (humidity?.length - 1)),
						-value * 2 +
							60 +
							(humidity?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
								(humidity?.length - 1)) *
								2 +
							3,
					])}
					strokeOpacity={0.9}
					showPoints={false}
					strokeWidth={3}
					stroke="#6dd5ed"
				/>
			</svg>
			<div className="container-for">
				{humidity?.map((element, index) => (
					<NumbersContainer>
						<ValueContainer
							sumOfTemp={
								-element * 2 +
								60 +
								(humidity?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
									(humidity?.length - 1)) *
									2 +
								3
							}
						>
							<p>{element}%</p>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
}

export default VisibilitySvg;

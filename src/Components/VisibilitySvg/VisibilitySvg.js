import React, { useState, useEffect } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, humidityTile } from './styled-components';
import { useSpring } from 'react-spring';

function VisibilitySvg({ clicked, currentCity, activeWrapper, graphData, width }) {
	const humidity = graphData?.humidity?.[clicked];
	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: activeWrapper === 'humidity' ? 1 : 0,
		},
	});

	console.log(humidity);

	return (
		<Container style={animation}>
			<svg width={width} height="160" xmlns="http://www.w3.org/2000/svg">
				<NaturalCurve
					data={humidity?.map((temp, index) => [
						index * (width / (humidity?.length - 1)),
						-temp * 2 +
							80 +
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
								80 +
								(humidity?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
									(humidity?.length - 1)) *
									2 +
								3
							}
						>
							{Math.round(element * 10) / 10}
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
}

export default VisibilitySvg;

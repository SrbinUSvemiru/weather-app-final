import React, { useState, useEffect } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, humidityTile } from './styled-components';
import { useSpring } from 'react-spring';
import { Typography } from '@mui/material';

function VisibilitySvg({ clicked, currentCity, activeWrapper, graphData, width, colors }) {
	const humidity = graphData?.humidity?.[clicked];
	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: activeWrapper === 'humidity' ? 1 : 0,
		},
	});

	return (
		<Container style={animation}>
			<svg width={width} height="160" xmlns="http://www.w3.org/2000/svg">
				<defs>
					{/* Define the gradient */}
					<linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor={colors?.[0]} />
						<stop offset="100%" stopColor={colors?.[1]} />
					</linearGradient>
				</defs>
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
					stroke="url(#gradientStroke)"
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
							<Typography variant="subtitle2" fontWeight={600}>
								{Math.round(element * 10) / 10}%
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
}

export default VisibilitySvg;

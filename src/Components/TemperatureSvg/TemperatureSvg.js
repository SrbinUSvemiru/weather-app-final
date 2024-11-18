import React, { useState, useEffect, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, TemperatureTile } from './styled-components';
import { useSpring } from 'react-spring';
import { Typography } from '@mui/material';

function TemperatureSvg({ clicked, graphData, activeWrapper, animation, width, colors }) {
	const temperature = graphData?.temperature?.[clicked];
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
					data={temperature?.map((temp, index) => [
						index * (width / (temperature?.length - 1)),
						-temp * 2 +
							80 +
							(temperature?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
								(temperature?.length - 1)) *
								2 +
							3,
					])}
					strokeOpacity={0.9}
					showPoints={false}
					strokeWidth={3}
					stroke="url(#gradientStroke)" // Reference the gradient here
				/>
			</svg>
			<div className="container-for">
				{temperature?.map((element, index) => (
					<NumbersContainer key={index}>
						<ValueContainer
							sumOfTemp={
								-element * 2 +
								80 +
								(temperature?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
									(temperature?.length - 1)) *
									2 +
								3
							}
						>
							<Typography variant="subtitle2" fontWeight={600}>
								{Math.round(element)}&#176;
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
}

export default TemperatureSvg;

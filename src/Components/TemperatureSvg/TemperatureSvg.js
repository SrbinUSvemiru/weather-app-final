import { Typography } from '@mui/material';
import React from 'react';
import { NaturalCurve } from 'react-svg-curve';

import { Container, NumbersContainer, ValueContainer } from './styled-components';

const TemperatureSvg = ({ clicked, graphData, animation, width, colors }) => {
	const temperature = graphData?.temperature?.[clicked];
	return (
		<Container style={animation}>
			<svg height="160" width={width} xmlns="http://www.w3.org/2000/svg">
				<defs>
					{/* Define the gradient */}
					<linearGradient id="gradientStroke" x1="0%" x2="100%" y1="0%" y2="0%">
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
					showPoints={false}
					stroke="url(#gradientStroke)" // Reference the gradient here
					strokeOpacity={0.9}
					strokeWidth={3}
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
							<Typography fontWeight={600} variant="subtitle2">
								{Math.round(element)}&#176;
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default TemperatureSvg;

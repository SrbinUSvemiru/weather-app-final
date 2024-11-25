import { Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { NaturalCurve } from 'react-svg-curve';

import { Container, NumbersContainer, ValueContainer } from './styled-components';

const PrecipitationSvg = ({ graphData, activeWrapper, animation, clicked, width, colors }) => {
	const precipitation = useMemo(() => graphData?.[activeWrapper]?.[clicked], [graphData, clicked, activeWrapper]);

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
					data={precipitation?.map((temp, index) => [
						index * (width / (precipitation?.length - 1)),
						-temp * 2 +
							80 +
							(precipitation?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
								(precipitation?.length - 1)) *
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
				{precipitation?.map((element, index) => (
					<NumbersContainer key={index}>
						<ValueContainer
							sumOfTemp={
								-element * 2 +
								80 +
								(precipitation?.reduce(
									(previousValue, currentValue) => previousValue + currentValue,
									0,
								) /
									(precipitation?.length - 1)) *
									2 +
								3
							}
						>
							<Typography fontWeight={600} variant="subtitle2">
								{Math.round(element * 5)}%
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default PrecipitationSvg;

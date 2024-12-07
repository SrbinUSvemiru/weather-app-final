import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { useSpring } from 'react-spring';
import { NaturalCurve } from 'react-svg-curve';

import { Container, NumbersContainer } from '../../styled-components';
import { ValueContainer } from './styled-components';

const VisibilitySvg = ({ clicked, activeWrapper, graphData, width }) => {
	const theme = useTheme();
	const humidity = graphData?.humidity?.[clicked];
	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: activeWrapper === 'humidity' ? 1 : 0,
		},
	});

	return (
		<Container style={animation}>
			<svg height="180" width={width} xmlns="http://www.w3.org/2000/svg">
				<defs>
					{/* Define the gradient */}
					<linearGradient id="gradientStroke" x1="0%" x2="100%" y1="0%" y2="0%">
						<stop offset="0%" stopColor={theme?.palette?.wrapper?.humidity?.light} />
						<stop offset="100%" stopColor={theme?.palette?.wrapper?.humidity?.dark} />
					</linearGradient>
				</defs>
				<NaturalCurve
					data={humidity?.map((temp, index) => [
						index * (width / (humidity?.length - 1)),
						-temp * 2 +
							90 +
							(humidity?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
								(humidity?.length - 1)) *
								2 +
							3,
					])}
					showPoints={false}
					stroke="url(#gradientStroke)"
					strokeOpacity={0.9}
					strokeWidth={3}
				/>
			</svg>
			<div className="container-for">
				{humidity?.map((element, index) => (
					<NumbersContainer key={index}>
						<ValueContainer
							sumOfTemp={
								-element * 2 +
								90 +
								(humidity?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
									(humidity?.length - 1)) *
									2 +
								3
							}
						>
							<Typography fontWeight={600} variant="subtitle2">
								{Math.round(element * 10) / 10}%
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default VisibilitySvg;

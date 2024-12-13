import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { useSpring } from 'react-spring';
import { NaturalCurve } from 'react-svg-curve';

import { Container, NumbersContainer } from '../../styled-components';
import { ValueContainer } from './styled-components';

const VisibilitySvg = ({ clicked, activeWrapper, graphData, width }) => {
	const theme = useTheme();
	const humidity = graphData?.humidity?.[clicked];
	console.log(humidity);
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
					data={humidity?.map((value, index) => {
						const x = index * (width / (humidity?.length - 1));

						const minHumidity = Math.min(...humidity);
						const maxHumidity = Math.max(...humidity);

						const padding = (maxHumidity - minHumidity) * 2;
						const adjustedMin = minHumidity - padding;
						const adjustedMax = maxHumidity + padding;

						const normalizedY = 180 - ((value - adjustedMin) / (adjustedMax - adjustedMin)) * 180;

						return [x, normalizedY];
					})}
					showPoints={false}
					stroke="url(#gradientStroke)"
					strokeOpacity={0.9}
					strokeWidth={2}
				/>
			</svg>
			<div className="container-for">
				{humidity?.map((element, index) => (
					<NumbersContainer key={index}>
						<ValueContainer
							sumOfTemp={() => {
								const minHumidity = Math.min(...humidity);
								const maxHumidity = Math.max(...humidity);

								const padding = (maxHumidity - minHumidity) * 2;
								const adjustedMin = minHumidity - padding;
								const adjustedMax = maxHumidity + padding;

								const normalizedY = 180 - ((element - adjustedMin) / (adjustedMax - adjustedMin)) * 180;

								return normalizedY - 40;
							}}
						>
							<Typography fontWeight={500} variant="subtitle1">
								{Math.round(element * 10) / 10}
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default VisibilitySvg;

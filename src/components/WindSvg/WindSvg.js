import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Icon, Typography } from '@mui/material';
import { map } from 'lodash';
import React, { useMemo } from 'react';
import { useSpring } from 'react-spring';
import { NaturalCurve } from 'react-svg-curve';

import { Container, NumbersContainer, ValueContainer } from './styled-components';

const WindSvg = ({ clicked, graphData, activeWrapper, width, colors }) => {
	const wind = useMemo(() => map(graphData?.wind?.[clicked], (el) => el?.value), [graphData, clicked]);
	const windDeg = useMemo(() => map(graphData?.wind?.[clicked], (el) => el?.deg), [graphData, clicked]);
	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: activeWrapper === 'wind' ? 1 : 0,
		},
	});

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
					data={wind?.map((value, index) => [
						index * (width / (wind?.length - 1)),
						-value * 2 +
							80 +
							(wind?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
								(wind?.length - 1)) *
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
				{wind?.map((element, index) => (
					<NumbersContainer key={index}>
						<ValueContainer
							degrees={windDeg}
							sumOfTemp={
								-element * 2 +
								80 +
								(wind?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
									(wind?.length - 1)) *
									2 +
								3
							}
						>
							<Typography variant="subtitle1">{Math.round(element * 3.6)}</Typography>
							<Icon
								component={ArrowForwardIcon}
								sx={{
									position: 'absolute',
									left: 0,
									margin: 'auto',
									transform: `rotate(${windDeg[index] - 90}deg)`,
									top: `${
										-element * 2 +
										80 +
										(wind?.reduce(
											(previousValue, currentValue) => previousValue + currentValue,
											0,
										) /
											(wind?.length - 1)) *
											2 +
										3 -
										15
									}px`,
								}}
							/>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default WindSvg;
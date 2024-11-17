import React, { useState, useEffect, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, TemperatureTile } from './styled-components';
import { useSpring } from 'react-spring';
import { map } from 'lodash';
import { Typography, Icon } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
			<svg width={width} height="160" xmlns="http://www.w3.org/2000/svg">
				<defs>
					{/* Define the gradient */}
					<linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
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
					strokeOpacity={0.9}
					showPoints={false}
					strokeWidth={3}
					stroke="url(#gradientStroke)" // Reference the gradient here
				/>
			</svg>
			<div className="container-for">
				{wind?.map((element, index) => (
					<NumbersContainer>
						<ValueContainer
							sumOfTemp={
								-element * 2 +
								80 +
								(wind?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
									(wind?.length - 1)) *
									2 +
								3
							}
							degrees={windDeg}
						>
							<Typography variant="subtitle1">{Math.round(element * 3.6)}</Typography>
							<Icon
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
								component={ArrowForwardIcon}
							/>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default WindSvg;

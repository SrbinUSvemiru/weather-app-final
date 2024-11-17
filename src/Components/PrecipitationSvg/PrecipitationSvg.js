import React, { useState, useEffect, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, TemperatureTile } from './styled-components';
import { useSpring } from 'react-spring';
import { Typography } from '@mui/material';

function PrecipitationSvg({ graphData, activeWrapper, animation, clicked, width, colors }) {
	const precipitation = useMemo(() => graphData?.[activeWrapper]?.[clicked], [graphData, clicked, activeWrapper]);

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
					data={precipitation?.map((temp, index) => [
						index * (width / (precipitation?.length - 1)),
						-temp * 2 +
							80 +
							(precipitation?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
								(precipitation?.length - 1)) *
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
				{precipitation?.map((element, index) => (
					<NumbersContainer>
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
							<Typography variant="subtitle2" fontWeight={600}>
								{Math.round(element * 5)}%
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
}

export default PrecipitationSvg;

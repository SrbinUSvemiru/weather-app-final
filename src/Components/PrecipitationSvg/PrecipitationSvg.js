import React, { useState, useEffect, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, TemperatureTile } from './styled-components';
import { useSpring } from 'react-spring';

function PrecipitationSvg({ graphData, activeWrapper, clicked, width }) {
	const precipitation = useMemo(() => graphData?.[activeWrapper]?.[clicked], [graphData, clicked, activeWrapper]);

	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: activeWrapper === 'precipitation' ? 1 : 0,
		},
	});

	return (
		<Container style={animation}>
			<svg width={width} height="160" xmlns="http://www.w3.org/2000/svg">
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
					stroke="#29ffc6"
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
							{Math.round(element * 5)}
							<span>%</span>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
}

export default PrecipitationSvg;

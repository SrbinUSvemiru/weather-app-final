import React, { useState, useEffect, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, TemperatureTile } from './styled-components';
import { useSpring } from 'react-spring';
import { map } from 'lodash';

const WindSvg = ({ clicked, graphData, activeWrapper }) => {
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
			<svg width="800" height="120" xmlns="http://www.w3.org/2000/svg">
				<NaturalCurve
					data={wind?.map((value, index) => [
						index * (800 / (wind?.length - 1)),
						-value * 2 +
							60 +
							(wind?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
								(wind?.length - 1)) *
								2 +
							3,
					])}
					strokeOpacity={0.9}
					showPoints={false}
					strokeWidth={3}
					stroke="#ffdde1"
				/>
			</svg>
			<div className="container-for">
				{wind?.map((element, index) => (
					<NumbersContainer>
						<ValueContainer
							sumOfTemp={
								-element * 2 +
								60 +
								(wind?.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
									(wind?.length - 1)) *
									2 +
								3
							}
							degrees={windDeg}
						>
							<p>{Math.round(element * 3.6 * 10) / 10} km/h</p>
							<div id="wind-arrow">
								<img src="../wind-arrow.png" />
							</div>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default WindSvg;

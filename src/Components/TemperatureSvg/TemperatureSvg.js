import React, { useState, useEffect, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, TemperatureTile } from './styled-components';
import { useSpring } from 'react-spring';

function TemperatureSvg({ clicked, graphData, activeWrapper, animation, width }) {
	const temperature = graphData?.temperature?.[clicked];
	return (
		<Container style={animation}>
			<svg width={width} height="160" xmlns="http://www.w3.org/2000/svg">
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
					stroke="#f9d423"
				/>
			</svg>
			<div className="container-for">
				{temperature?.map((element, index) => (
					<NumbersContainer>
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
							{Math.round(element * 10) / 10}&#176;
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
}

export default TemperatureSvg;

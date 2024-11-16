import React, { useState, useEffect, useMemo } from 'react';
import { useGetFetchedQuery } from '../../Queries/useCitiesQuery';
import { NaturalCurve } from 'react-svg-curve';
import { NumbersContainer, Container, ValueContainer, TemperatureTile } from './styled-components';
import { useSpring } from 'react-spring';
import { map } from 'lodash';
import { Typography, Icon } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const WindSvg = ({ clicked, graphData, activeWrapper, width }) => {
	const wind = useMemo(() => map(graphData?.wind?.[clicked], (el) => el?.value), [graphData, clicked]);
	const windDeg = useMemo(() => map(graphData?.wind?.[clicked], (el) => el?.deg), [graphData, clicked]);
	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: activeWrapper === 'wind' ? 1 : 0,
		},
	});
	console.log(windDeg);
	return (
		<Container style={animation}>
			<svg width={width} height="160" xmlns="http://www.w3.org/2000/svg">
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
					stroke="#ffdde1"
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

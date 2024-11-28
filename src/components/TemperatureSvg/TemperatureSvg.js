import { Typography, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import { NaturalCurve } from 'react-svg-curve';

import { AppContext } from '../../context/AppContext';
import { Container, NumbersContainer } from '../../styled-components';
import { ValueContainer } from './styled-components';

const TemperatureSvg = ({ clicked, graphData, animation, width }) => {
	const theme = useTheme();
	const temperature = graphData?.temperature?.[clicked];

	const { settings } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	return (
		<Container style={animation}>
			<svg height="180" width={width} xmlns="http://www.w3.org/2000/svg">
				<defs>
					{/* Define the gradient */}
					<linearGradient id="gradientStroke" x1="0%" x2="100%" y1="0%" y2="0%">
						<stop offset="0%" stopColor={theme?.palette?.wrapper?.temperature?.light} />
						<stop offset="100%" stopColor={theme?.palette?.wrapper?.temperature?.dark} />
					</linearGradient>
				</defs>
				<NaturalCurve
					data={temperature?.map((temp, index) => [
						index * (width / (temperature?.length - 1)),
						-temp?.metric * 2 +
							90 +
							(temperature?.reduce(
								(previousValue, currentValue) => previousValue + (currentValue?.metric || 0),
								0,
							) /
								(temperature?.length - 1)) *
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
				{temperature?.map((element, index) => (
					<NumbersContainer key={index}>
						<ValueContainer
							sumOfTemp={
								-element?.metric * 2 +
								90 +
								(temperature?.reduce(
									(previousValue, currentValue) => previousValue + (currentValue?.metric || 0),
									0,
								) /
									(temperature?.length - 1)) *
									2 +
								3
							}
						>
							<Typography fontWeight={600} variant="subtitle2">
								{element?.[units]}&#176;
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default TemperatureSvg;

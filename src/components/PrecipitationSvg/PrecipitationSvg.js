import { Typography, useTheme } from '@mui/material';
import { every, map } from 'lodash';
import React, { useMemo } from 'react';
import { NaturalCurve } from 'react-svg-curve';

import { Container, NumbersContainer } from '../../styled-components';
import { ValueContainer } from './styled-components';

const PrecipitationSvg = ({ graphData, activeWrapper, animation, clicked, width }) => {
	const theme = useTheme();
	const precipitation = useMemo(() => graphData?.[activeWrapper]?.[clicked], [graphData, clicked, activeWrapper]);

	return (
		<Container style={animation}>
			<svg height="180" width={width} xmlns="http://www.w3.org/2000/svg">
				<defs>
					{/* Define the gradient */}
					<linearGradient id="gradientStroke" x1="0%" x2="100%" y1="0%" y2="0%">
						<stop offset="0%" stopColor={theme?.palette?.wrapper?.precipitation?.light} />
						<stop offset="100%" stopColor={theme?.palette?.wrapper?.precipitation?.dark} />
					</linearGradient>
				</defs>
				<NaturalCurve
					data={map(precipitation, (value, index) => {
						const x = index * (width / (precipitation?.length - 1));
						const isEveryValueZero = every(precipitation, (el) => el === 0);

						const minHumidity = Math.min(...precipitation);
						const maxHumidity = Math.max(...precipitation);

						const padding = maxHumidity - minHumidity;
						const adjustedMin = minHumidity - padding;
						const adjustedMax = maxHumidity + padding;

						const normalizedY = isEveryValueZero
							? index % 2 === 0
								? 100
								: 99
							: 180 - ((value - adjustedMin) / (adjustedMax - adjustedMin)) * 180;

						return [x, normalizedY];
					})}
					showPoints={false}
					stroke="url(#gradientStroke)" // Reference the gradient here
					strokeOpacity={0.9}
					strokeWidth={2}
				/>
			</svg>
			<div className="container-for">
				{precipitation?.map((element, index) => (
					<NumbersContainer key={index}>
						<ValueContainer
							sumOfTemp={() => {
								const minHumidity = Math.min(...precipitation);
								const maxHumidity = Math.max(...precipitation);
								const isEveryValueZero = every(precipitation, (el) => el === 0);
								const padding = maxHumidity - minHumidity;
								const adjustedMin = minHumidity - padding;
								const adjustedMax = maxHumidity + padding;

								const normalizedY = isEveryValueZero
									? index % 2 === 0
										? 100
										: 99
									: 180 - ((element - adjustedMin) / (adjustedMax - adjustedMin)) * 180;

								return normalizedY - 40;
							}}
						>
							<Typography fontWeight={500} variant="subtitle1">
								{Math.round(element * 100)}
							</Typography>
						</ValueContainer>
					</NumbersContainer>
				))}
			</div>
		</Container>
	);
};

export default PrecipitationSvg;

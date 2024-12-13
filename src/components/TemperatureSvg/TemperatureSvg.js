import { Box, Typography, useTheme } from '@mui/material';
import { map } from 'lodash';
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
			<Box sx={{ width: '100%' }}>
				<svg height="180" width={width} xmlns="http://www.w3.org/2000/svg">
					<defs>
						{/* Define the gradient */}
						<linearGradient id="gradientStroke" x1="0%" x2="100%" y1="0%" y2="0%">
							<stop offset="0%" stopColor={theme?.palette?.wrapper?.temperature?.light} />
							<stop offset="100%" stopColor={theme?.palette?.wrapper?.temperature?.dark} />
						</linearGradient>
					</defs>
					<NaturalCurve
						data={map(temperature, (temp, index) => {
							const x = index * (width / (temperature?.length - 1));
							const metric = map(temperature, (el) => el?.metric);
							const minHumidity = Math.min(...metric);
							const maxHumidity = Math.max(...metric);

							const padding = (maxHumidity - minHumidity) * 2;
							const adjustedMin = minHumidity - padding;
							const adjustedMax = maxHumidity + padding;

							const normalizedY =
								180 - ((temp?.metric - adjustedMin) / (adjustedMax - adjustedMin)) * 180;

							return [x, normalizedY];
						})}
						showPoints={false}
						stroke="url(#gradientStroke)" // Reference the gradient here
						strokeOpacity={0.9}
						strokeWidth={2}
					/>
				</svg>
			</Box>
			<div className="container-for">
				{temperature?.map((element, index) => (
					<NumbersContainer key={index}>
						<ValueContainer
							sumOfTemp={() => {
								const metric = map(temperature, (el) => el?.metric);
								const minHumidity = Math.min(...metric);
								const maxHumidity = Math.max(...metric);

								const padding = (maxHumidity - minHumidity) * 2;
								const adjustedMin = minHumidity - padding;
								const adjustedMax = maxHumidity + padding;

								const normalizedY =
									180 - ((element?.metric - adjustedMin) / (adjustedMax - adjustedMin)) * 180;

								return normalizedY - 40;
							}}
						>
							<Typography fontWeight={500} variant="subtitle1">
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

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Icon, Typography, useTheme } from '@mui/material';
import { map } from 'lodash';
import React, { useContext, useMemo } from 'react';
import { useSpring } from 'react-spring';
import { NaturalCurve } from 'react-svg-curve';

import { AppContext } from '../../context/AppContext';
import { Container, NumbersContainer } from '../../styled-components';
import { ValueContainer } from './styled-components';

const WindSvg = ({ clicked, graphData, activeWrapper, width }) => {
	const theme = useTheme();
	const wind = useMemo(() => map(graphData?.wind?.[clicked], (el) => el?.value), [graphData, clicked]);
	const windDeg = useMemo(() => map(graphData?.wind?.[clicked], (el) => el?.deg), [graphData, clicked]);
	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: activeWrapper === 'wind' ? 1 : 0,
		},
	});

	const { settings } = useContext(AppContext);

	const units = useMemo(() => settings?.preferences?.units, [settings?.preferences?.units]);

	return (
		<Container style={animation}>
			<svg height="180" width={width} xmlns="http://www.w3.org/2000/svg">
				<defs>
					{/* Define the gradient */}
					<linearGradient id="gradientStroke" x1="0%" x2="100%" y1="0%" y2="0%">
						<stop offset="0%" stopColor={theme?.palette?.wrapper?.wind?.light} />
						<stop offset="100%" stopColor={theme?.palette?.wrapper?.wind?.dark} />
					</linearGradient>
				</defs>
				<NaturalCurve
					data={wind?.map((value, index) => [
						index * (width / (wind?.length - 1)),
						-value?.metric?.large * 2 +
							90 +
							(wind?.reduce(
								(previousValue, currentValue) => previousValue + (currentValue?.metric?.large || 0),
								0,
							) /
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
								-element?.metric?.large * 2 +
								90 +
								(wind?.reduce(
									(previousValue, currentValue) => previousValue + (currentValue?.metric?.large || 0),
									0,
								) /
									(wind?.length - 1)) *
									2 +
								3
							}
						>
							<Typography variant="subtitle1">{element?.[units]?.large}</Typography>
							<Icon
								component={ArrowForwardIcon}
								sx={{
									position: 'absolute',
									left: 0,
									margin: 'auto',
									transform: `rotate(${windDeg[index] - 90}deg)`,
									top: `${
										-element?.metric?.large * 2 +
										90 +
										(wind?.reduce(
											(previousValue, currentValue) =>
												previousValue + (currentValue?.metric?.large || 0),
											0,
										) /
											(wind?.length - 1)) *
											2 +
										3 -
										20
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

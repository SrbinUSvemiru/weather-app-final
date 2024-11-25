import React, { useEffect, useState } from 'react';
import { useSpring } from 'react-spring';
import { NaturalCurve } from 'react-svg-curve';

import { Container, NumbersContainer, ValueContainer } from './styled-components';

const UVSvg = (props) => {
	const [uv, setUV] = useState();

	useEffect(() => {
		switch (props.clicked) {
			case 'hourly':
				setUV(() => {
					let values = props?.data?.hourly.map((element) => element.uvi);
					let array = values.filter((element, index) => index % 3 === 0);
					return { uvi: values, list: array };
				});

				break;
			case 'daily':
				setUV(() => {
					let values = props?.data?.daily.map((element) => element.uvi);
					let array = props?.data?.daily.map((element) => element.uvi);
					return { uvi: values, list: array };
				});
				break;
			default:
				setUV(() => {
					let values = props?.data?.hourly.map((element) => element.uvi);
					let array = values.filter((element, index) => index % 3 === 0);
					return { uvi: values, list: array };
				});
		}
	}, [props?.data, props.clicked]);

	const animation = useSpring({
		from: { opacity: 0 },
		to: {
			opacity: props.activeWrapper === 'UV' ? 1 : 0,
		},
	});

	if (uv) {
		return (
			<Container style={animation}>
				<svg height="120" width="800" xmlns="http://www.w3.org/2000/svg">
					<NaturalCurve
						data={uv.uvi.map((temp, index) => [
							index * (800 / (uv.uvi.length - 1)),
							-temp * 2 +
								60 +
								(uv.uvi.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
									(uv.uvi.length - 1)) *
									2 +
								3,
						])}
						showPoints={false}
						stroke="#9b23ea"
						strokeOpacity={0.8}
						strokeWidth={3}
					/>
				</svg>
				<div className="container-for">
					{uv?.list.map((element, index) => (
						<NumbersContainer key={index}>
							<ValueContainer
								sumOfTemp={
									-element * 2 +
									60 +
									(uv.uvi.reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
										(uv.uvi.length - 1)) *
										2 +
									3
								}
							>
								{element}
							</ValueContainer>
						</NumbersContainer>
					))}
				</div>
			</Container>
		);
	}
};

export default UVSvg;

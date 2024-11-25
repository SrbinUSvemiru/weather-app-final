import { animated } from 'react-spring';
import styled from 'styled-components';

export const NumbersContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	font-size: 0.7rem;
	opacity: 1;
	display: flex;
	justify-content: center;
`;

export const Container = styled(animated.div)`
	position: absolute;

	& ${NumbersContainer} + ${NumbersContainer} {
		border-left: 2px dashed rgba(255, 255, 255, 0.1);
	}
`;

export const ValueContainer = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	margin: auto;
	top: ${(props) => props.sumOfTemp - 30}px;
`;

export const TemperatureTile = styled.div`
	font-size: 0.8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0.7;
	position: relative;
	& > p {
		opacity: 0.8;
		font-size: 0.8rem;
	}

	// &::after {
	//   content: "${(props) => props.temp}";
	//   height: 120px;
	//   min-width: ${(props) => props.length}px;
	//   position: absolute;
	//   top: ${(props) => -props.temp * 2 + 60 + props.sumOfTemp - 150}px;
	//   background: red;
	//   left: 0;
	//   right: 0;
	//   margin: auto;
	//   font-size: 0.7rem;
	//   opacity: 0.5;
	//   display: flex;
	//   justify-content: center;
	// }
`;

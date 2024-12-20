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
	z-index: -1;
`;

export const Container = styled(animated.div)`
	& ${NumbersContainer} + ${NumbersContainer} {
		${({ theme }) =>
			`border-left: 2px dashed  ${theme?.palette?.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(121, 151, 162, 0.2)'}`};
	}
`;

export const ValueContainer = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	margin: auto;
	top: ${(props) => props.sumOfTemp}px;
	& span {
		font-size: 0.6rem;
		opacity: 0.7;
	}
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

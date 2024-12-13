import { animated } from 'react-spring';
import styled from 'styled-components';

export const SvgContainer = styled.div`
	width: 100%;
	position: relative;
	overflow-y: scroll;
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Edge */
	}
	& .container-for {
		position: absolute;
		width: ${(props) => props?.width}px;
		height: 180px;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		display: flex;
	}
`;

export const NumbersContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	font-size: 0.7rem;
	opacity: 0.5;
	display: flex;
	justify-content: center;
`;

export const Container = styled.div`
	& #buttons-container {
		heigth: 100%;
		display: flex;
		justify-content: start;
		padding-bottom: 0.5rem;
	}
	& ${NumbersContainer} + ${NumbersContainer} {
		border-left: 2px dashed rgba(255, 255, 255, 0.1);
	}
`;

export const ButtonHourly = styled.div`
	font-size: 0.9rem;
	opacity: 0.8;
	padding: 0.3rem;
	border-radius: 5px;
	cursor: pointer;
	border: ${(props) =>
		props.value === 'hourly' ? '2px solid rgba(299, 299, 299, 0.5)' : '2px solid rgba(0, 0, 0, 0.3)'};
	margin-bottom: 0.5rem;
	z-index: 2;
`;

export const ButtonDaily = styled.div`
	font-size: 0.9rem;
	opacity: 0.8;
	padding: 0.3rem;
	margin-left: 1rem;
	border-radius: 5px;
	cursor: pointer;
	border: ${(props) =>
		props.value === 'daily' ? '2px solid rgba(299, 299, 299, 0.5)' : '2px solid rgba(0, 0, 0, 0.3)'};
	margin-bottom: 0.5rem;
	z-index: 2;
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
`;

export const TimeList = styled.div`
	display: flex;
	justify-content: space-around;
	width: ${(props) => props?.width}px;
	padding-top: 1rem;
	padding-bottom: 0.2rem;
	font-size: 0.8rem;
	opacity: 0.8;
`;

export const DegreesContainer = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	margin: auto;
	top: ${(props) => props.sumOfTemp}px;
`;

export const Window = styled(animated.div)`
	background: ${({ theme }) => theme?.palette?.background?.window};
	border-radius: 16px;
	border: ${(props) =>
		props?.bordercolor ? `1px solid ${props?.bordercolor}` : '1px solid rgba(251, 247, 255, 0.22)'};
	border-radius: 10px;
	overflow: hidden;
	border-radius: 16px;
	box-shadow: 0px 10px 15px -4px rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(7.6px);
	-webkit-backdrop-filter: blur(7.6px);
	padding: 1rem;
	margin: 0;
	position: relative;
	user-select: none;
`;

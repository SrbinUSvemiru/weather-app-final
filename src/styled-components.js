import { animated } from 'react-spring';
import styled from 'styled-components';

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	empty-cells: show;
	border-collapse: collapse;
	column-gap: 2rem;
	row-gap: 2rem;
	width: 50vw;
	height: 80vh;
	margin: 0 auto;
`;

export const EmptyCell = styled(animated.div)`
	width: 100%;
	height: 100%;
	background-color: rgba(9, 18, 35, 0.3);
	color: rgba(9, 18, 35, 0.3);
	border-radius: 10px;
	min-height: 150px;
	min-width: 230px;
	border: 3px dashed rgba(0, 0, 0, 0.3);
`;

export const Item = styled(animated.div)`
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: saturate(50%) blur(10px);
	background: rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	display: flex;
	min-height: 150px;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	width: 100%;
	min-width: 230px;
	will-change: transform, opacity;
`;

export const Carousel = styled(animated.div)`
	position: absolute;
	width: 100vw;
	height: 100vh;
	background-position: center;
	left: 0;
	background-size: cover;
`;

export const Wrapper = styled(animated.div)`
	position: absolute;
	width: 102%;
	height: 102%;
	top: 50%;
	z-index: -1;
	margin: 0 auto;
	transform: translateY(-50%);
	border-radius: 10px;
	display: felx;
	align-items: center;
	justify-content: center;
	&::after {
		content: '';
		width: 90%;
		height: 90%;
		border-radius: 10px;
		background: rgb(66, 71, 80);
		position: absolute;
		z-index: -1; /* Place behind the content of Wrapper */
	}
`;

export const Window = styled(animated.div)`
	background: rgba(251, 247, 255, 0.15);
	border-radius: 16px;
	border: 2px solid ${(props) => (props?.bordercolor ? props?.bordercolor : 'rgba(251, 247, 255, 0.22)')};
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	overflow: hidden;
	padding: 1rem;
	height: 100%;
	position: relative;
	cursor: pointer;
	user-select: none;
`;

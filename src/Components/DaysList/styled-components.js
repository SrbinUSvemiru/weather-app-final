import styled from 'styled-components';
import { animated } from 'react-spring';

export const Day = styled(animated.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border-radius: 5px;
	width: 100%;
	& > img {
		width: 100%;
		width: 40px;
	}
`;

export const Wrapper = styled(animated.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	background: linear-gradient(180deg, #feac5e, #c779d0, #4bc0c8);
	border-radius: 10px;
	z-index: -1;
`;

export const Window = styled(animated.div)`
	/* From https://css.glass */
	background: rgba(251, 247, 255, 0.15);
	border-radius: 16px;
	border: 1px solid rgba(251, 247, 255, 0.22);
	border-radius: 10px;
	overflow: hidden;
	padding: 0.5rem 1rem;
	width: 100%;
	position: relative;
	user-select: none;
	cursor: pointer;
`;

export const Row = styled.div`
	display: flex;
`;

import { animated } from 'react-spring';
import styled from 'styled-components';

export const Window = styled(animated.div)`
	/* From https://css.glass */
	background: rgba(251, 247, 255, 0.15);
	border-radius: 16px;
	border: 2px solid rgba(251, 247, 255, 0.22);
	border-radius: 10px;
	overflow: hidden;
	padding: 1rem;
	width: 100%;
	height: 100%;
	min-width: 200px;
	position: relative;
	user-select: none;
`;

export const MessageContainer = styled(animated.div)`
	display: flex;
	max-width: 180px;

	& > p {
		display: inline-block;
		white-space: nowrap;
		padding: 0.2rem;
		font-size: 1.2rem;
	}
`;

export const StartAndFinishContainer = styled.div`
	display: flex;
	font-size: 0.8rem;
	margin-top: 0.5rem;
	justify-content: space-between;
	align-items: center;
	& #warning {
		width: 30px;
		& > img {
			width: 100%;
		}
	}
	& #enjoy {
		font-size: 1rem;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;

import styled from 'styled-components';
import { animated } from 'react-spring';

export const Window = styled(animated.div)`
	/* From https://css.glass */
	background: rgba(42, 33, 51, 0.25);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(6.5px);
	-webkit-backdrop-filter: blur(6.5px);
	border: 1px solid rgba(42, 33, 51, 0.14);
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

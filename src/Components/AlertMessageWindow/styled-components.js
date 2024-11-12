import styled from 'styled-components';
import { animated } from 'react-spring';

export const Window = styled(animated.div)`
	backdrop-filter: saturate(50%) blur(10px);
	background: rgba(0, 0, 0, 0.3);
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	overflow: hidden;
	padding: 1rem;
	width: 100%;
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

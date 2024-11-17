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
	display: flex;
	height: 100%;
	user-select: none;
	position: relative;
	cursor: pointer;
	& .row {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
	}
	& #uv-index {
		margin: 0;
		& p {
			opacity: 0.6;
		}
		& #units {
			font-size: 1.4rem;
			margin-top: 0.5rem;
			opacity: 1;
		}
		& #message {
			margin-left: 1.5rem;
			max-width: 150px;
		}
	}
	& #description {
		opacity: 0.9;
	}
`;

export const Uvi = styled.div`
	display: flex;
	height: 5px;
	width: 100%;
	border-radius: 5px;
	background: rgb(0, 0, 0, 0.2);
	& #background {
		width: ${(props) => (props?.uvi * props?.width) / 5}px;
		background: ${(props) => props?.color?.background};
		background: ${(props) => props?.color?.backgroundTwo};
		height: 5px;
		border-radius: 5px;
	}
`;

export const Wrapper = styled(animated.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-image: linear-gradient(to top, #5f72bd 0%, #9b23ea 100%);
	border-radius: 10px;
`;

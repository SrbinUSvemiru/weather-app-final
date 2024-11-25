import { animated } from 'react-spring';
import styled from 'styled-components';

export const Window = styled(animated.div)`
	/* From https://css.glass */
	background: rgba(251, 247, 255, 0.15);
	border-radius: 16px;
	border: 2px solid rgba(251, 247, 255, 0.22);
	border-radius: 10px;
	overflow: hidden;
	padding: 0.5rem 1rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	z-index: 3;
	min-width: 50px;
	height: 100%;
	width: 100%;
	cursor: pointer;
	user-select: none;

	& .card {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 0.5rem;
		border-radius: 10px;
		width: 40px;
		height: 40px;
		& > img {
			width: 100%;
			z-index: 1;
			filter: invert(100%) sepia(14%) saturate(0%) hue-rotate(92deg) brightness(102%) contrast(102%);
		}

		& #speed {
			color: white;
			font-weight: 500;
			opacity: 0.9;
			font-size: 0.7rem;
			margin-bottom: 0.3rem;
		}
		& > p {
			opacity: 0.5;
			font-size: 0.9rem;
		}
	}
`;

export const Wrapper = styled(animated.div)`
	background: rgb(144, 71, 175);
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 1;
	margin: 0 auto;
	background: rgb(144, 71, 175);
	background: linear-gradient(
		138deg,
		rgba(144, 71, 175, 1) 6%,
		rgba(233, 92, 235, 0.6085784655659139) 13%,
		rgba(0, 0, 0, 0.2024160005799195) 100%
	);
	border-radius: 10px;
`;

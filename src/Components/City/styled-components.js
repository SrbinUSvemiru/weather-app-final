import styled from 'styled-components';
import { animated } from 'react-spring';

export const Tile = styled(animated.div)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 260px;
	border-radius: 10px;
	cursor: pointer;
	color: white;
	padding: 1rem;
	/* From https://css.glass */
	background: rgba(42, 33, 51, 0.25);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(6.5px);
	-webkit-backdrop-filter: blur(6.5px);
	border: 1px solid rgba(42, 33, 51, 0.14);
	border-radius: 10px;
	will-change: transform, opacity;

	& .temperature {
		width: 100%;
		justify-content: space-between;
		align-items: center;
		display: flex;
		& > img {
			width: 100px;
		}
		& > p {
			font-size: 2.5rem;
			font-weight: bold;
		}
	}

	& .clock {
		font-size: 1rem;
		font-weight: bold;
	}

	& #container p {
		margin-right: 2rem;
	}
	& #container h3 {
		opacity: 0.9;
	}
`;

export const EmptyCell = styled(animated.div)`
	width: 100%;
	height: 100%;
	background-color: rgba(9, 18, 35, 0.2);
	border-radius: 10px;
	min-height: 170px;
	width: 260px;
	padding: 1rem;
	border: 3px dashed rgba(0, 0, 0, 0.2);
`;

export const Spinner = styled.div`
	background: none;
	width: 50px;
	& > img {
		width: 100%;
		background: none;
	}
`;

export const RemoveButton = styled.div`
	width: 20px;
	height: 20px;
	position: absolute;
	right: 0.2rem;
	top: 0.2rem;
	opacity: 0.2;
	&:hover {
		opacity: 1;
	}
	& img {
		width: 100%;
	}
`;

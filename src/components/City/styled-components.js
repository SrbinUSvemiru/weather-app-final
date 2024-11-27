import { animated } from 'react-spring';
import styled from 'styled-components';

export const Tile = styled(animated.div)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 260px;
	cursor: pointer;
	color: white;
	padding: 1rem;
	background: ${({ theme }) => theme?.palette?.background?.window};
	border-radius: 16px;
	border: ${(props) =>
		props?.hovered === 'hovered'
			? `1px solid ${props?.theme?.palette?.secondary?.main}`
			: `1px solid rgba(251, 247, 255, 0.22)`};
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
	background-color: ${({ theme }) => theme?.palette?.primary?.main};
	border-radius: 10px;
	min-height: 156px;
	width: 260px;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0.5;
	border: 1px dashed ${({ theme }) => theme?.palette?.primary?.highlight};
	&:hover {
		opacity: 1;
	}
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

import { animated } from 'react-spring';
import styled from 'styled-components';

export const Tile = styled(animated.div)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-shadow: ${(props) => (props?.isEmpty ? 'none' : `0px 3px 8px -1px rgba(0, 0, 0, 0.2)`)};
	align-items: center;
	width: 260px;
	backdrop-filter: blur(7.6px);
	-webkit-backdrop-filter: blur(7.6px);
	cursor: pointer;
	color: white;
	padding: 1rem;
	background: ${({ isEmpty, theme }) =>
		isEmpty ? theme?.palette?.background?.windowShade : theme?.palette?.background?.window};
	border-radius: 1.3rem;
	border: ${(props) =>
		props?.hovered === 'hovered'
			? `1px solid ${props?.theme?.palette?.secondary?.main}`
			: `1px ${props?.isEmpty ? 'dashed' : 'solid'} ${props?.theme?.palette?.border}`};
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
	border-radius: 1.3rem;
	min-height: 182.52px;
	min-width: 260px;
	border: 1px solid rgba(251, 247, 255, 0.22),
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0.5;
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

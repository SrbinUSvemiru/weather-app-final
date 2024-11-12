import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;

	& ::-webkit-scrollbar {
		display: none;
	}

	& #back-arrow-container {
		position: absolute;
		left: -3rem;
		top: 50%;
		transform: translateY(-50%);
		> div {
			padding: 0.2rem;
			border-radius: 50%;
			cursor: pointer;
		}
		& img {
			width: 30px;
			opacity: 0.5;
			transition: width 500 ease;
			&:hover {
				opacity: 1;
			}
		}
	}
	& .row {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
	}
	& .container {
		display: flex;
		align-items: center;
		& > h1 {
			font-size: 3.5rem;
		}
	}

	& #day {
		margin-right: 1rem;
	}
	& #days-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

export const TopContainer = styled.div`
	display: flex;

	justify-content: space-between;
	flex: 1;
	padding-bottom: 1rem;
`;

export const LeftSideContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .row {
		display: flex;
		align-items: flex-start;
	}
`;

export const RightSideContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	& .row {
		display: flex;
		align-items: center;
		gap: 16px;
		justify-content: space-between;
		position: relative;
		width: 100%;
	}
`;

export const Window = styled(animated.div)`
	backdrop-filter: saturate(50%) blur(10px);
	background: rgba(0, 0, 0, 0.3);
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	overflow: hidden;
	padding: 1rem;
	margin: 0;
	position: relative;
`;

export const MoonWindow = styled(animated.div)`
	backdrop-filter: saturate(50%) blur(10px);
	background: rgba(0, 0, 0, 0.3);
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	border-radius: 50%;
	overflow: hidden;
	padding: 0.5rem;
	position: relative;
	user-select: none;
`;

export const Wrapper = styled(animated.div)`
	background: rgb(144, 71, 175);
	margin: 0.5rem;
	background: linear-gradient(
		138deg,
		rgba(144, 71, 175, 1) 0%,
		rgba(233, 92, 235, 0.4433123591233369) 31%,
		rgba(0, 0, 0, 0.2024160005799195) 100%
	);
	border-radius: 10px;
`;

export const Visibility = styled.div``;

export const Moon = styled.div``;

export const DaysRow = styled.div`
	display: flex;
	justify-content: space-between;
`;

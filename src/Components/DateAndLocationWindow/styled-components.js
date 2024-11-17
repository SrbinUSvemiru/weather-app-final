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
	position: relative;
	height: 100%;
	user-select: none;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	& .row {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .row-clock {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& #expanded-clock {
		display: flex;
		justify-content: center;
		margin-top: 0.3rem;
		color: black;
		font-weight: 500;
		opacity: 0.5;
		background: linear-gradient(to right, #ffeeee, #ddefbb);
		border-radius: 5px;
		padding: 0.1rem;
		width: 70px;
	}
	& #city-name {
		font-size: 1.5rem;
		opacity: 0.8;
		& > span {
			opacity: 0.2;
			font-weight: 700;
		}
	}
	& #date {
		display: flex;
		opacity: 0.7;
		margin-bottom: 0.3rem;
	}
`;

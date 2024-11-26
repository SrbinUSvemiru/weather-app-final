import styled from 'styled-components';

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

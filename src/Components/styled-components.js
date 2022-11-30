import styled from "styled-components";
import { animated } from "react-spring";

export const Tile = styled(animated.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  color: white;

  & #container p {
    margin-right: 2rem;
  }
  & #container h3 {
    opacity: 0.9;
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
  width: 10px;
  height: 10px;

  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  & img {
    width: 100%;
  }
`;

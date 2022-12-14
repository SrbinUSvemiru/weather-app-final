import styled from "styled-components";
import { animated } from "react-spring";

export const Day = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  max-width: 36px;
  & > img {
    width: 100%;
  }
`;

export const Wrapper = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: linear-gradient(180deg, #feac5e, #c779d0, #4bc0c8);
  border-radius: 10px;
  z-index: -1;
`;

export const Window = styled(animated.div)`
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 0.3rem;
  position: relative;

  cursor: pointer;
`;

export const Row = styled.div`
  display: flex;
`;

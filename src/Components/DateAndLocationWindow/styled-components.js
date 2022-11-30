import styled from "styled-components";
import { animated } from "react-spring";

export const Window = styled(animated.div)`
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 0.8rem;
  margin: 0.5rem;
  position: relative;
  & .row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  & #expanded-clock {
    display: flex;
    margin-top: 0.3rem;
    opacity: 0.7;
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

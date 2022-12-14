import styled from "styled-components";
import { animated } from "react-spring";

export const Window = styled(animated.div)`
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 0.8rem;
  position: relative;
  height: 100%;
  user-select: none;
  display: flex;
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

import styled from "styled-components";
import { animated } from "react-spring";

export const NumbersContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 0.7rem;
  opacity: 0.5;
  display: flex;
  justify-content: center;
`;

export const Container = styled(animated.div)`
  position: absolute;

  & ${NumbersContainer} + ${NumbersContainer} {
    border-left: 2px dashed rgba(255, 255, 255, 0.1);
  }
`;

export const ValueContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
  top: ${(props) => props.sumOfTemp - 30}px;
  & #wind-arrow {
    position: absolute;
    left: 0;
    margin: auto;
    top: ${(props) => props.sumOfTemp - 15}px;
    transform: rotate(${(props) => props.degrees - 90}deg);
    dipslay: flex;
    justify-content: center;
    & > img {
      width: 15px;
      filter: brightness(0) invert(1);
    }
  }
`;

export const TemperatureTile = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  position: relative;
  & > p {
    opacity: 0.8;
    font-size: 0.8rem;
  }
`;

import styled from "styled-components";
import { animated } from "react-spring";

export const SvgContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  & .container-for {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
  }

  & #svg-container {
    width: 100%;
    height: 100%;
    font-size: 0.6rem;
  }
`;

export const NumbersContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 0.7rem;
  opacity: 0.5;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  & #buttons-container {
    width: 30%;
    heigth: 100%;
    display: flex;
    justify-content: space-around;
    margin-right: 1rem;
  }
  & ${NumbersContainer} + ${NumbersContainer} {
    border-left: 2px dashed rgba(255, 255, 255, 0.1);
  }
`;

export const Button = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  padding: 0.3rem;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
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

  // &::after {
  //   content: "${(props) => props.temp}";
  //   height: 120px;
  //   min-width: ${(props) => props.length}px;
  //   position: absolute;
  //   top: ${(props) => -props.temp * 2 + 60 + props.sumOfTemp - 150}px;
  //   background: red;
  //   left: 0;
  //   right: 0;
  //   margin: auto;
  //   font-size: 0.7rem;
  //   opacity: 0.5;
  //   display: flex;
  //   justify-content: center;
  // }
`;

export const TimeList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 0.5rem;
`;

export const DegreesContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
  top: ${(props) => props.sumOfTemp}px;
`;

export const Window = styled(animated.div)`
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 0.5rem;
  margin: 0;
  position: relative;
`;

import styled from "styled-components";
import { animated } from "react-spring";

export const Detailed = styled(animated.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  border-radius: 10px;
  margin: 0 auto;
  height: 580px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  empty-cells: show;
  border-collapse: collapse;
  column-gap: 2rem;
  row-gap: 2rem;
  width: 50vw;
  height: 80vh;
  margin: 0 auto;
`;

export const EmptyCell = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(9, 18, 35, 0.3);
  color: rgba(9, 18, 35, 0.3);
  border-radius: 10px;
  border: 3px dashed rgba(0, 0, 0, 0.3);
`;

export const Item = styled(animated.div)`
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
`;

export const Carousel = styled(animated.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
`;

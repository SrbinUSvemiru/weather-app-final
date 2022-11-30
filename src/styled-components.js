import styled from "styled-components";
import { animated } from "react-spring";

export const Detailed = styled(animated.div)`
  width: 80vw;
  height: 90vh;
  position: absolute;
  padding: 1rem;
  top: 2rem;
  color: white;
  right: 2rem;
  border-radius: 10px;
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

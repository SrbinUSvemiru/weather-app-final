import styled from "styled-components";
import { animated } from "react-spring";

export const Window = styled(animated.div)`
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 35%;
  overflow: hidden;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  min-height: 60px;
  cursor: pointer;

  & .card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 0.5rem;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    & > img {
      width: 100%;
      z-index: 1;
      filter: invert(100%) sepia(14%) saturate(0%) hue-rotate(92deg)
        brightness(102%) contrast(102%);
    }

    & #speed {
      color: white;
      font-weight: 500;
      opacity: 0.9;
      font-size: 0.7rem;
      margin-bottom: 0.3rem;
    }
    & > p {
      opacity: 0.5;
      font-size: 0.9rem;
    }
  }
`;

export const Wrapper = styled(animated.div)`
  background: rgb(144, 71, 175);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0 auto;
  background: rgb(144, 71, 175);
  background: linear-gradient(
    138deg,
    rgba(144, 71, 175, 1) 6%,
    rgba(233, 92, 235, 0.6085784655659139) 13%,
    rgba(0, 0, 0, 0.2024160005799195) 100%
  );
  border-radius: 10px;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

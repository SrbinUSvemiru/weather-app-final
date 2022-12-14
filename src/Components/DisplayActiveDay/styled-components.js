import styled from "styled-components";
import { animated } from "react-spring";

export const MainWeather = styled.div`
  & .row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding: 0.5rem;
  }
  & .row-first {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }

  & .row + .row {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  & .image-container {
    width: 80px;
    & img {
      width: 100%;
    }
  }

  & #container {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 200px;
    & > h4 {
      margin: 0;
      font-weight: 500;
      opacity: 0.7;
    }
    & p {
      margin: 0;
      font-weight: 400;
      opacity: 1;
    }
  }
  & #whole {
    display: flex;
  }
  & #side + #side {
    margin-left: 2rem;
  }
`;

export const Window = styled(animated.div)`
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 0 0.5rem 0.5rem;
  margin: 0;
  position: relative;
`;

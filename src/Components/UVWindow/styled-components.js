import styled from "styled-components";
import { animated } from "react-spring";

export const Window = styled(animated.div)`
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 1rem;
  margin: 0.5rem;
  position: relative;
  cursor: pointer;
  & .row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }
  & #uv-index{
    margin: 0;
    &  p{
      opacity: 0.6;
    }
    & #units{
      font-size: 1.4rem;
      margin-top: 0.5rem;
      opacity: 1;
    }
    & #message{
      margin-left: 1.5rem;
      max-width: 150px; 
    }
  }
    & #description {
      opacity: 0.9;
    }
  }
`;

export const Uvi = styled.div`
  display: flex;
  height: 5px;
  width: 230px;
  border-radius: 5px;
  background: rgb(0, 0, 0, 0.2);
  margin-top: 0.5rem;
  & #background {
    width: ${(props) => props.uvi * 16.36 + 50}px;
    background: ${(props) => props.color.background};
    background: ${(props) => props.color.backgroundTwo};
    height: 5px;
    border-radius: 5px;
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
  background: linear-gradient(
    138deg,
    rgba(144, 71, 175, 1) 0%,
    rgba(233, 92, 235, 0.4433123591233369) 31%,
    rgba(0, 0, 0, 0.2024160005799195) 100%
  );
  border-radius: 10px;
`;

import styled from "styled-components";
import { animated } from "react-spring";

export const Window = styled(animated.div)`
  backdrop-filter: saturate(50%) blur(10px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  padding: 0.5rem;
  margin: 0.5rem;
  position: relative;
  cursor: pointer;
  & #main-svg{
    width: 100px;
  }
  & .row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    & .temp-con {
      margin-left: 1rem;
        & #degrees {
         font-size: 2rem;
         opacity: 0.7;
        }
      }
    }
  }
  & #feels-like {
    opacity: 0.7;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
    border-radius: 10px;
    background: rgb(174,238,208);
    background: linear-gradient(90deg, rgba(174,238,208,0.3) 0%, rgba(148,233,199,0) 100%);
    padding: 0.2rem 0.5rem ;
    text-align: left;
  }
  & #description{
    opacity: 0.5;
    font-size: 1rem;
    text-align: center;
  
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
    163deg,
    rgba(144, 71, 175, 0.38448882971157217) 0%,
    rgba(233, 92, 235, 0.15479695296087181) 49%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: 10px;
`;

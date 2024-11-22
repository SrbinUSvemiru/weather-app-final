import styled from 'styled-components';
import { animated } from 'react-spring';

export const Window = styled(animated.div)`
 
	background: rgba(251, 247, 255, 0.15);
	border-radius: 16px;
	border: 2px solid rgba(251, 247, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  user-select: none;
  & #icon-container{
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   & #main-svg{
    width: 100px;
  }
  }
  
  & .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  }
  & .description-row{
    padding: 0.5rem;
    display: flex;
    justify-content: space-around;
    & span{
      opacity: 0.6;
    }
  }
  & #unit{
    font-size: 2.5rem;
  }
`;

export const Wrapper = styled(animated.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: 0 auto;
	border-radius: 10px;
`;

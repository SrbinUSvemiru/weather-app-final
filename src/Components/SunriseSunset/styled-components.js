import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & #border {
    position: relative;

    & ::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background: white;
      opacity: 0.2;
      top: -29px;
      left: 0px;
    }
  }

  & > .rows {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    & > img {
      width: 20px;
      filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(84deg)
        brightness(105%) contrast(101%);
      opacity: 0.5;
    }
  }

  & p {
    font-size: 0.7rem;
    opacity: 0.8;
  }
  & #title {
    color: #f0e457;
  }
`;

export const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 75px;
  overflow: hidden;
  margin: 0 0.7rem 0.5rem 0.7rem;
  position: relative;
  background: rgb(5, 41, 93);
  transform: rotate(${(props) => props.calculation}rad);
  background: linear-gradient(
    ${(props) => (props.isDayTime ? 0 : 180)}deg,
    rgba(5, 41, 93, 1) 0%,
    rgba(26, 108, 161, 1) 25%,
    rgba(23, 133, 167, 0.7) 37%,
    rgba(74, 226, 193, 0.5) 50%,
    rgba(229, 222, 77, 1) 62%,
    rgba(250, 248, 127, 1) 75%,
    rgba(246, 255, 90, 1) 100%
  );
`;

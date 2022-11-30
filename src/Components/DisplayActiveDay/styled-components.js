import styled from "styled-components";

export const MainWeather = styled.div`
  & .row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding: 0.3rem;
  }

  & .row + .row {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  & .image-container > img {
    width: 50px;
  }

  & #container {
    font-size: 0.9rem;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 200px;
    & > h4 {
      margin: 0;
      font-weight: 500;
      opacity: 0.8;
    }
    & p {
      margin: 0;
      font-weight: 500;
    }
  }
  & #whole {
    display: flex;
  }
  & #side + #side {
    margin-left: 2rem;
  }
`;

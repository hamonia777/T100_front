import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  width: 20vw;
  height: 20vh;
  margin-top: 70vh;
  margin-left: 40vw;
  top: 0;
  left: 0;
  background: #faf9ff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
  font-size: 3rem;
  margin-top: 50px;
`;

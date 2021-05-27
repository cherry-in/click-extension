import styled from "styled-components";

export const App = styled.div`
  text-align: center;
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Cursor = styled.div`
width: 10rem;
  height: 10rem;
  border: 2px solid black;
  position: absolute;
  z-index: 1000;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: all 0.3s ease;
  transition-property: background, transform;
  transform-origin: 100% 100%;
  background-size: cover;
  background-color: white;
  cursor: pointer;
}
`;

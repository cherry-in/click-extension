import styled from "styled-components";
import mouse from "./mouse.png";

export const App = styled.div`
  text-align: center;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  min-width: 300px;
  max-width: 300px;
  min-height: 300px;
  max-height: 300px;
}
`;

export const Cursor = styled.img`
  // width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  position: absolute;
  z-index: 1000;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: all 0.3s ease;
  transition-property: background, transform;
  transform-origin: 100% 100%;
`;

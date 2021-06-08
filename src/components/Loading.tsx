import React from 'react';
import styled, {keyframes} from "styled-components";

const buildingHouse = keyframes`
  0% {
    font-size: 2rem;
    opacity: 0.2;
  }
  33% {
    font-size: 2rem;
    opacity: .2;
  }
  33.1% {
    font-size: 3rem;
    opacity: .6;
  }
  66% {
    font-size: 3rem;
    opacity: .6;
  }
  66.1% {
    font-size: 4rem;
    opacity: 1;
  }
  100% {
    font-size: 4rem;
    opacity: 1;
  }
`;

const Spinner = styled.span`
  animation-name: ${buildingHouse};
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  &::after {
    content: "🏠";
    display: inline-block;
  }
`;

export const Loading = () => (
  <Spinner />
);
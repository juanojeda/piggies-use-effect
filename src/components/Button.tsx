import { FC } from 'react';
import styled from "styled-components";

interface IButtonProps {
  onClick: Function;
  isDisabled: boolean;
}

const StyledButton = styled.button`
  appearance: none;
  background: var(--blue);
  border: none;
  border-radius: 1rem;
  box-shadow: .1rem .1rem .1rem rgba(0,0,0,0.2);
  color: var(--white);
  cursor: pointer;
  font-family: inherit;
  font-size: 2rem;
  padding: 1.5rem;

  &:hover {
    transform: rotateZ(-5deg);
  }

  &:active {
    transform: translateY(.4rem);
  }
`;

export const Button: FC<IButtonProps> = ({onClick, isDisabled}) => (
  <StyledButton>
    Add Piggy
  </StyledButton>
);
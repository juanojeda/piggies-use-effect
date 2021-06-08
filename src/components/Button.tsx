import { FC, MouseEventHandler } from 'react';
import styled from "styled-components";

interface IButtonProps {
  onClick: MouseEventHandler;
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
  display: block;
  font-family: inherit;
  font-size: 2rem;
  padding: 1.5rem;

  &:hover {
    transform: rotateZ(-5deg);
  }

  &:active {
    transform: translateY(.4rem);
  }

  &:disabled {
    pointer-events: none;
    opacity: .4;
    background: var(--black);
  }
`;

export const Button: FC<IButtonProps> = ({onClick, isDisabled}) => (
  <StyledButton onClick={onClick} disabled={isDisabled}>
    Add Piggy
  </StyledButton>
);
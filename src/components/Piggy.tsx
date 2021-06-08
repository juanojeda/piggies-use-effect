import {FC} from 'react';
import styled from "styled-components";

import { Loading } from "./Loading";

type Material = "hay" | "twigs" | "bricks";

interface IPiggyProps {
  material?: Material;
  index: number;
}

const Tile = styled.div`
  background: var(--white);
  border-radius: 1rem;
  box-shadow: .1rem .1rem .2rem rgba(0,50,100,.25);
  flex-grow: 0;
  flex-shrink: 1;
  font-size: 2rem;
  margin: 1rem;
  padding: 1rem;
`;

const Emoji = styled.i`
  font-size: 64px;
  font-style: normal;
`;

const materials = {
  hay: "🌾",
  twigs: "🥢",
  bricks: "🧱"
}

const getMaterial = (index: number): string => Object.values(materials)[index];

export const Piggy: FC<IPiggyProps> = ({ index }) => {
  const material = getMaterial(index);
  
  return (
  <Tile>
    <Emoji>🐷</Emoji>
    {
      material ?
        (
          <>
        <Emoji>{material}</Emoji><Emoji>🏠</Emoji>
          </>
        ) : <Loading />
    }
  </Tile>
  )
};
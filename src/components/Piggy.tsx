import {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import { getMaterial } from '../api/getMaterial';
import { Emoji } from './Emoji';

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

export const Piggy: FC<IPiggyProps> = ({ index }) => {
  
  // attempt 3: useEffect for async data

  const [material, setMaterial] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetMaterial = async () => {
      const fetchedMaterial = await getMaterial(index);

      setMaterial(fetchedMaterial);
    }

    void fetchAndSetMaterial();
  }, [index]);
  
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
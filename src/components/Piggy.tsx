import {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import { getMaterial } from '../api/getMaterial';
import { useWolfContext } from '../context/WolfContext';
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

const isSuccessfulHuff = (material: string): boolean => ["🥢", "🌾"].includes(material);

export const Piggy: FC<IPiggyProps> = ({ index }) => {
  
  const [material, setMaterial] = useState<string | null>(null);
  const { addHuff } = useWolfContext();

  useEffect(() => {
    const fetchAndSetMaterial = async () => {
      const fetchedMaterial = await getMaterial(index);

      setMaterial(fetchedMaterial);
    }

    void fetchAndSetMaterial();
  }, [index]);

  useEffect(() => {
    if (!material) return;
    const isSuccess = isSuccessfulHuff(material);

    addHuff(isSuccess);
  }, [material, addHuff]);
  
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
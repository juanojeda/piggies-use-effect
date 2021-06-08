import styled from "styled-components";
import { useWolfContext } from "../context/WolfContext";
import { Emoji } from "./Emoji";
import { getLoadingStyles } from "./loadingStyles";

const PositionAtScreenRightBottom = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
`;

const Huffing = styled.span`
  ${getLoadingStyles("💨")}
  &:after {
    transform: scale(-1, 1);
  }
`;

const getHuffEmoji = (isWinner: boolean): string => isWinner ? "✅" : "❌";

export const WolfHuffCounter = () => {

  const { huffRecord } = useWolfContext();

  const hasHuffs = huffRecord.length > 0;


  return (
    <PositionAtScreenRightBottom>
      {huffRecord.map((isWinner) => <Emoji>{getHuffEmoji(isWinner)}</Emoji>)}
      {hasHuffs && <Huffing />}
      <Emoji>🐺</Emoji>
  </PositionAtScreenRightBottom>
)};
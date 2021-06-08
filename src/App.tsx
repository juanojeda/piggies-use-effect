import styled from "styled-components";
import { Piggy } from "./components/Piggy";
import { Button } from "./components/Button";
import { useState } from "react";

const PigStack = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const getPiggiesArray = (count: number): any[] => Array(count).fill(null);

function App() {

  const [piggiesCount, setPiggiesCount] = useState(0);

  const isPiggedOut = piggiesCount >= 3;

  const handleAddPiggy = (): void => {
    if (!isPiggedOut) {
      setPiggiesCount(i => i + 1);
    }
  };

  return (
    <>
      <Button onClick={handleAddPiggy} isDisabled={isPiggedOut} />
      <PigStack>
        {getPiggiesArray(piggiesCount).map((_, i) => (
          <Piggy key={i} index={i} />
        ))}
      </PigStack>
      </>
  );
}

export default App;

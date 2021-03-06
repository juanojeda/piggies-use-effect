import styled from "styled-components";
import { Piggy } from "./components/Piggy";

const PigStack = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;

`;

function App() {
  return (
    <PigStack>
      <Piggy index={0} />
      <Piggy material="hay" index={1} />
      <Piggy material="twigs" index={2} />
      <Piggy material="bricks" index={3} />
    </PigStack>
  );
}

export default App;

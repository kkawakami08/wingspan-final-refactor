import { useAtom } from "jotai";
import { playBirdAtom } from "../../../../utils/jotaiStore";

const PlayABirdText = () => {
  const [playBirdState] = useAtom(playBirdAtom);
  let playableTest = playBirdState.habitat ? (
    <p>Selected {playBirdState.habitat}. Select a bird to play</p>
  ) : (
    <p>Select a location</p>
  );

  if (playBirdState.bird) playableTest = <p>Select food tokens</p>;

  return (
    <div>
      {playBirdState.confirmHabitat ? (
        playableTest
      ) : (
        <p>Not enough resources. Pick a different location</p>
      )}
    </div>
  );
};

export default PlayABirdText;

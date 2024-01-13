import { useAtom } from "jotai";
import {
  playerBirdHandAtom,
  birdDeckAtom,
} from "../../../../../utils/jotaiStore";

import { drawCard } from "../../../../../utils/gameFunctions/cardFunctions";

const DrawOrSkipBtn = ({ brownBirdSupply }) => {
  const [birdDeck] = useAtom(birdDeckAtom);
  const [, setPlayerBirdHand] = useAtom(playerBirdHandAtom);

  const drawBirdCardClick = () => {
    for (let i = 0; i < brownBirdSupply.resourceQuantity; i++) {
      drawCard(birdDeck, setPlayerBirdHand);
    }
    brownBirdSupply.setDiscardQuantity((state) => state + 1);
    brownBirdSupply.setBrownPowerEnd(true);
    brownBirdSupply.setBrownPowerContinueBtn(false);
    brownBirdSupply.setCurrentActionText("Click Next Power");
  };

  return (
    <div className="flex gap-5">
      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={drawBirdCardClick}
      >
        Draw bird cards
      </button>
    </div>
  );
};

export default DrawOrSkipBtn;

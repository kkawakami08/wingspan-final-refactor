import { useAtom } from "jotai";
import {
  playerBirdHandAtom,
  birdDeckAtom,
} from "../../../../../utils/jotaiStore";
import { continueBrownPower } from "../../../../../utils/gameFunctions/birdPowerFunctions";

import { drawCard } from "../../../../../utils/gameFunctions/cardFunctions";
import NextPower from "../NextPower";

const DiscardOrSkipBtn = ({ brownBirdSupply }) => {
  const [birdDeck] = useAtom(birdDeckAtom);
  const [, setPlayerBirdHand] = useAtom(playerBirdHandAtom);

  const drawBirdCardClick = () => {
    drawCard(birdDeck, setPlayerBirdHand);
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
        Draw a bird card
      </button>
    </div>
  );
};

export default DiscardOrSkipBtn;

import { useAtom } from "jotai";
import {
  resourceQuantityAtom,
  eggTrackerAtom,
} from "../../../../utils/jotaiStore";
import { resetFromGrassland } from "../../../../utils/gameFunctions/grasslandFunctions";
import { continueBrownPower } from "../../../../utils/gameFunctions/birdPowerFunctions";

const DiscardEggs = ({ brownBirdSupply }) => {
  const [resourceQuantity] = useAtom(resourceQuantityAtom);

  const [, setEggTracker] = useAtom(eggTrackerAtom);

  const discardEggsClick = () => {
    if (
      brownBirdSupply.currentAction === "brownEgg" ||
      brownBirdSupply.currentAction === "brownNest"
    ) {
      setEggTracker([]);
      continueBrownPower(brownBirdSupply);
    } else {
      resetFromGrassland(
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentAction,
        brownBirdSupply.setCurrentActionText
      );
      brownBirdSupply.setResourceQuantity(0);
    }
  };

  return (
    <button
      className="bg-amber-300 text-amber-900 text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300 border-2 rounded-lg"
      onClick={discardEggsClick}
    >
      Discard remaining {resourceQuantity} eggs
    </button>
  );
};

export default DiscardEggs;

import { useAtom } from "jotai";
import {
  eggTrackerAtom,
  grasslandBrownBirdsAtom,
  playBirdAtom,
} from "../../../../utils/jotaiStore";
import { resetFromGrassland } from "../../../../utils/gameFunctions/grasslandFunctions";
import {
  activateBrownPowers,
  continueBrownPower,
} from "../../../../utils/gameFunctions/birdPowerFunctions";
import { resetPlayBirdAction } from "../../../../utils/gameFunctions/playABirdFunctions";

const DiscardEggs = ({ brownBirdSupply }) => {
  const [grasslandBrownBirds] = useAtom(grasslandBrownBirdsAtom);

  const [, setEggTracker] = useAtom(eggTrackerAtom);
  const [, setPlayBirdState] = useAtom(playBirdAtom);

  const discardEggsClick = () => {
    if (
      brownBirdSupply.currentAction === "brownEgg" ||
      brownBirdSupply.currentAction === "brownNest"
    ) {
      setEggTracker([]);
      continueBrownPower(brownBirdSupply);
    } else if (brownBirdSupply.currentAction === "whiteNest") {
      setEggTracker([]);
      resetPlayBirdAction(
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentAction,
        setPlayBirdState,
        brownBirdSupply.setCurrentActionText
      );
    } else {
      if (grasslandBrownBirds.length) {
        brownBirdSupply.setBrownBirdCopy((state) => ({
          ...state,
          location: "grassland",
        }));
        activateBrownPowers(
          brownBirdSupply.grassland,
          grasslandBrownBirds,

          brownBirdSupply
        );
      } else {
        resetFromGrassland(
          brownBirdSupply.setDisableClick,
          brownBirdSupply.setCurrentAction,
          brownBirdSupply.setCurrentActionText
        );
        brownBirdSupply.setResourceQuantity(0);
      }
    }
  };

  return (
    <button
      className="bg-amber-300 text-amber-900 text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300 border-2 rounded-lg"
      onClick={discardEggsClick}
    >
      Discard remaining {brownBirdSupply.resourceQuantity} eggs
    </button>
  );
};

export default DiscardEggs;

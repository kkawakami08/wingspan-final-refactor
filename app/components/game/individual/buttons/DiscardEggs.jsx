import { useAtom } from "jotai";
import {
  resourceQuantityAtom,
  disableClickAtom,
  currentActionAtom,
  currentActionTextAtom,
  birdFeederAtom,
  playerEggSupplyAtom,
  brownBirdCopyAtom,
  brownBirdVariableAtom,
  selectedFoodAtom,
  brownPowerContinueBtnAtom,
  forestAtom,
  grasslandAtom,
  wetlandAtom,
  eggTrackerAtom,
} from "../../../../utils/jotaiStore";
import { resetFromGrassland } from "../../../../utils/gameFunctions/grasslandFunctions";
import { continueBrownPower } from "../../../../utils/gameFunctions/birdPowerFunctions";

const DiscardEggs = () => {
  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [brownBirdVariable, setBrownBirdVariable] = useAtom(
    brownBirdVariableAtom
  );
  const [brownPowerContinueBtn, setBrownPowerContinueBtn] = useAtom(
    brownPowerContinueBtnAtom
  );
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setEggTracker] = useAtom(eggTrackerAtom);
  const [playerEggs] = useAtom(playerEggSupplyAtom);
  const [forest] = useAtom(forestAtom);
  const [grassland] = useAtom(grasslandAtom);
  const [wetland] = useAtom(wetlandAtom);

  const brownBirdSupply = {
    birdFeeder: birdFeeder,
    setBirdFeeder: setBirdFeeder,
    setDisableClick: setDisableClick,
    setCurrentActionText: setCurrentActionText,
    setResourceQuantity: setResourceQuantity,
    setBrownBirdVariable: setBrownBirdVariable,
    setBrownPowerContinueBtn: setBrownPowerContinueBtn,
    brownPowerContinueBtn: brownPowerContinueBtn,
    setCurrentAction: setCurrentAction,
    setBrownBirdCopy: setBrownBirdCopy,
    brownBirdCopy: brownBirdCopy,
    setSelectedFood: setSelectedFood,
    playerEggs: playerEggs,
  };

  const discardEggsClick = () => {
    if (currentAction === "brownEgg") {
      setEggTracker([]);
      continueBrownPower(
        brownBirdCopy,
        setBrownBirdCopy,
        forest,
        grassland,
        wetland,
        brownBirdSupply
      );
    } else {
      resetFromGrassland(
        setDisableClick,
        setCurrentAction,
        setCurrentActionText
      );
      setResourceQuantity(0);
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

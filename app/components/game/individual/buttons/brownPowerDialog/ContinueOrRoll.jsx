import { useAtom } from "jotai";
import {
  brownPowerContinueBtnAtom,
  birdFeederAtom,
  disableClickAtom,
  currentActionTextAtom,
  currentActionAtom,
  resourceQuantityAtom,
  brownBirdVariableAtom,
  brownBirdCopyAtom,
  forestAtom,
  grasslandAtom,
  wetlandAtom,
  selectedFoodAtom,
  playerEggSupplyAtom,
} from "../../../../../utils/jotaiStore";
import RollBirdFeederBtn from "../RollBirdFeederBtn";
import { rollBirdFeeder } from "../../../../../utils/gameFunctions/birdFeederFunctions";
import { resetAction } from "../../../../../utils/gameFunctions/habitatFunctions";
import {
  activateBrownPowers,
  continueBrownPower,
} from "../../../../../utils/gameFunctions/birdPowerFunctions";
import { useEffect } from "react";

const ContinueOrRoll = () => {
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setSelectedFood] = useAtom(selectedFoodAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setBrownBirdVariable] = useAtom(brownBirdVariableAtom);
  const [brownPowerContinue, setBrownPowerContinue] = useAtom(
    brownPowerContinueBtnAtom
  );
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [forest] = useAtom(forestAtom);
  const [grassland] = useAtom(grasslandAtom);
  const [wetland] = useAtom(wetlandAtom);
  const [playerEggs] = useAtom(playerEggSupplyAtom);

  const brownBirdSupply = {
    birdFeeder: birdFeeder,
    setBirdFeeder: setBirdFeeder,
    setDisableClick: setDisableClick,
    setCurrentActionText: setCurrentActionText,
    setResourceQuantity: setResourceQuantity,
    setBrownBirdVariable: setBrownBirdVariable,
    setBrownPowerContinueBtn: setBrownPowerContinue,
    brownPowerContinueBtn: brownPowerContinue,
    setCurrentAction: setCurrentAction,
    setBrownBirdCopy: setBrownBirdCopy,
    brownBirdCopy: brownBirdCopy,
    setSelectedFood: setSelectedFood,
    playerEggs: playerEggs,
  };

  const continueBrownBirds = () => {
    setBrownPowerContinue(false);

    continueBrownPower(
      brownBirdCopy,
      setBrownBirdCopy,
      forest,
      grassland,
      wetland,
      brownBirdSupply
    );
  };

  const rollBirdFeederClick = () => {
    setBirdFeeder(rollBirdFeeder());
    setCurrentActionText("click continue");
  };

  const continueCheckingClick = () => {
    continueBrownBirds();
  };

  return (
    <div className="flex gap-5">
      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={continueCheckingClick}
      >
        Continue checking brown powers
      </button>

      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={rollBirdFeederClick}
      >
        Roll Bird Feeder
      </button>
    </div>
  );
};

export default ContinueOrRoll;

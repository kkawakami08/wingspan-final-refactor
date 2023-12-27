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
} from "../../../../utils/jotaiStore";
import RollBirdFeederBtn from "./RollBirdFeederBtn";
import { rollBirdFeeder } from "../../../../utils/gameFunctions/birdFeederFunctions";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";
import { activateBrownPowers } from "../../../../utils/gameFunctions/birdPowerFunctions";
import { useEffect } from "react";

const BrownPowerContinueBtn = () => {
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setBrownBirdVariable] = useAtom(brownBirdVariableAtom);
  const [brownPowerContinue, setBrownPowerContinue] = useAtom(
    brownPowerContinueBtnAtom
  );
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [forest] = useAtom(forestAtom);

  const brownBirdSupply = {
    birdFeeder: birdFeeder,
    setDisableClick: setDisableClick,
    setCurrentActionText: setCurrentActionText,
    setResourceQuantity: setResourceQuantity,
    setBrownBirdVariable: setBrownBirdVariable,
    setBrownPowerContinueBtn: setBrownPowerContinue,
    brownPowerContinueBtn: brownPowerContinue,
    setCurrentAction: setCurrentAction,
  };

  const continueBrownBirds = () => {
    switch (currentAction) {
      case "brownFood":
        console.log("continuing one");
        if (!brownBirdCopy.copy.length) {
          setBrownPowerContinue(false);
          break;
        } else {
          switch (brownBirdCopy.location) {
            case "forest":
              activateBrownPowers(
                forest,
                brownBirdCopy.copy,
                setBrownBirdCopy,
                brownBirdSupply
              );
              return;
          }
        }
    }
    resetAction(
      setDisableClick,
      setResourceQuantity,
      setCurrentAction,

      setCurrentActionText
    );
  };

  const rollBirdFeederClick = () => {
    setBirdFeeder(rollBirdFeeder());
    setCurrentActionText("Click continue");
  };

  const continueCheckingClick = () => {
    setBrownPowerContinue(true);
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

export default BrownPowerContinueBtn;

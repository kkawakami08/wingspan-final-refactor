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
  playerFoodSupplyAtom,
  selectedFoodAtom,
} from "../../../../../utils/jotaiStore";
import RollBirdFeederBtn from "../RollBirdFeederBtn";
import { rollBirdFeeder } from "../../../../../utils/gameFunctions/birdFeederFunctions";
import { resetAction } from "../../../../../utils/gameFunctions/habitatFunctions";
import {
  activateBrownPowers,
  continueBrownPower,
} from "../../../../../utils/gameFunctions/birdPowerFunctions";
import { useEffect } from "react";
import { saveFoodSelection } from "../../../../../utils/gameFunctions/foodFunctions";

const CacheOrSupply = () => {
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setBrownBirdVariable] = useAtom(brownBirdVariableAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [brownPowerContinue, setBrownPowerContinue] = useAtom(
    brownPowerContinueBtnAtom
  );
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [forest, setForest] = useAtom(forestAtom);
  const [grassland] = useAtom(grasslandAtom);
  const [wetland] = useAtom(wetlandAtom);

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
  };

  const continueBrownBirds = () => {
    setBrownPowerContinue(false);
    setDisableClick((state) => ({
      ...state,
      selectedFood: false,
    }));
    switch (currentAction) {
      case "brownFood":
        continueBrownPower(
          brownBirdCopy,
          setBrownBirdCopy,
          forest,
          grassland,
          wetland,
          brownBirdSupply
        );
    }
  };

  const addToSupplyClick = () => {
    saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);
    continueBrownBirds();
  };
  console.log(brownBirdCopy, "from cache");

  const cacheTokenClick = () => {
    switch (brownBirdCopy.location) {
      case "forest":
        setForest((forest) => {
          forest[brownBirdCopy.currentSpace].cacheCount += 1;
          return forest;
        });
        setSelectedFood([]);
      default:
        break;
    }

    continueBrownBirds();
  };

  return (
    <div className="flex gap-5">
      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={cacheTokenClick}
      >
        Cache Token
      </button>

      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={addToSupplyClick}
      >
        Add to your supply
      </button>
    </div>
  );
};

export default CacheOrSupply;

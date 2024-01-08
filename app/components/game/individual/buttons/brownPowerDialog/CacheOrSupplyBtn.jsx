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
  playerEggSupplyAtom,
} from "../../../../../utils/jotaiStore";
import {
  cacheToken,
  continueBrownPower,
} from "../../../../../utils/gameFunctions/birdPowerFunctions";
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
  const [grassland, setGrassland] = useAtom(grasslandAtom);
  const [wetland, setWetland] = useAtom(wetlandAtom);
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
    setDisableClick((state) => ({
      ...state,
      selectedFood: false,
    }));

    continueBrownPower(
      brownBirdCopy,
      setBrownBirdCopy,
      forest,
      grassland,
      wetland,
      brownBirdSupply
    );
  };

  const addToSupplyClick = () => {
    saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);
    continueBrownBirds();
  };
  console.log(brownBirdCopy, "from cache");

  const cacheTokenClick = () => {
    cacheToken(
      brownBirdCopy,
      setForest,
      setGrassland,
      setWetland,
      setSelectedFood
    );

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

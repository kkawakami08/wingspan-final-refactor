import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import {
  disableClickAtom,
  playerFoodSupplyAtom,
  brownBirdVariableAtom,
  resourceQuantityAtom,
  birdFeederAtom,
  currentActionAtom,
  currentActionTextAtom,
  brownPowerContinueBtnAtom,
  brownBirdCopyAtom,
  selectedFoodAtom,
  forestAtom,
  grasslandAtom,
  wetlandAtom,
  playerEggSupplyAtom,
} from "../../../../utils/jotaiStore";
import {
  cacheToken,
  continueBrownPower,
} from "../../../../utils/gameFunctions/birdPowerFunctions";

const FoodSupplyBoxes = ({ type, bg }) => {
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [currentActionText, setCurrentActionText] = useAtom(
    currentActionTextAtom
  );
  const [brownPowerContinue, setBrownPowerContinue] = useAtom(
    brownPowerContinueBtnAtom
  );
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const disableFood = disableClick.foodSupply;

  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);
  const [, setSelectedFood] = useAtom(selectedFoodAtom);
  const [forest, setForest] = useAtom(forestAtom);
  const [grassland, setGrassland] = useAtom(grasslandAtom);
  const [wetland, setWetland] = useAtom(wetlandAtom);
  const [playerEggs] = useAtom(playerEggSupplyAtom);

  const [brownBirdVariable, setBrownBirdVariable] = useAtom(
    brownBirdVariableAtom
  );
  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);

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

  const foodSupplyClick = () => {
    if (disableFood) {
      console.log("disabled");
    } else {
      if (!type.includes(brownBirdVariable)) {
        console.log("not the right type");
      } else {
        switch (currentAction) {
          case "brownFood":
            setPlayerFood((state) => [...state, { type: type, id: nanoid() }]);
            break;
          case "brownCache":
            cacheToken(
              brownBirdCopy,
              setForest,
              setGrassland,
              setWetland,
              setSelectedFood
            );
            break;
        }

        setResourceQuantity((state) => state - 1);
        if (resourceQuantity - 1 == 0) {
          continueBrownPower(
            brownBirdCopy,
            setBrownBirdCopy,
            forest,
            grassland,
            wetland,
            brownBirdSupply
          );
        }
      }
    }
  };

  return (
    <div className={`${bg} p-10 rounded-lg`} onClick={foodSupplyClick}>
      <p className="text-xl font-bold text-white">{type.toUpperCase()}</p>
    </div>
  );
};

export default FoodSupplyBoxes;

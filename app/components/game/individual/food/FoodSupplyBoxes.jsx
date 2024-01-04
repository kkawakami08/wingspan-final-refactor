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
} from "../../../../utils/jotaiStore";
import { continueBrownPower } from "../../../../utils/gameFunctions/birdPowerFunctions";

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
  const [forest] = useAtom(forestAtom);
  const [grassland] = useAtom(grasslandAtom);
  const [wetland] = useAtom(wetlandAtom);

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
  };

  const foodSupplyClick = () => {
    if (disableFood) {
      console.log("disabled");
    } else {
      if (!type.includes(brownBirdVariable)) {
        console.log("not the right type");
      } else {
        setPlayerFood((state) => [...state, { type: type, id: nanoid() }]);
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

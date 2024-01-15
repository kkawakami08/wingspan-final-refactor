import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import {
  disableClickAtom,
  playerFoodSupplyAtom,
} from "../../../../utils/jotaiStore";
import {
  cacheToken,
  continueBrownPower,
} from "../../../../utils/gameFunctions/birdPowerFunctions";

const FoodSupplyBoxes = ({ type, bg, brownBirdSupply }) => {
  const [disableClick] = useAtom(disableClickAtom);
  const disableFood = disableClick.foodSupply;

  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const foodSupplyClick = () => {
    if (disableFood) {
      console.log("disabled");
    } else {
      if (!brownBirdSupply.brownBirdVariable.includes(type)) {
        console.log("not the right type");
      } else {
        switch (brownBirdSupply.currentAction) {
          case "brownFood":
            setPlayerFood((state) => [...state, { type: type, id: nanoid() }]);
            break;
          case "whiteFood":
            setPlayerFood((state) => [...state, { type: type, id: nanoid() }]);
            break;
          case "brownCache":
            cacheToken(brownBirdSupply, brownBirdSupply.setSelectedFood);
            break;
        }

        brownBirdSupply.setResourceQuantity((state) => state - 1);
        if (brownBirdSupply.resourceQuantity - 1 == 0) {
          continueBrownPower(brownBirdSupply);
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

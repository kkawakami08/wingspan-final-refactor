import { useAtom } from "jotai";
import {
  currentActionAtom,
  selectedFoodAtom,
  disableClickAtom,
  playerFoodSupplyAtom,
} from "../../../../utils/jotaiStore";
import { foodSelection } from "../../../../utils/gameFunctions/foodFunctions";

const FoodToken = ({ food }) => {
  const [currentAction] = useAtom(currentActionAtom);
  const [, setSelectedFood] = useAtom(selectedFoodAtom);
  const [playerFood, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const [disableClick] = useAtom(disableClickAtom);
  const disableFoodToken = disableClick.playerFood;

  const foodTokenClick = () => {
    if (disableFoodToken) console.log("disabled");
    else {
      switch (currentAction) {
        case "grassland":
          foodSelection(playerFood, setSelectedFood, setPlayerFood, food.id);
          break;
        case "playBird":
          foodSelection(playerFood, setSelectedFood, setPlayerFood, food.id);
          break;
      }
    }
  };

  return (
    <div
      className="bg-indigo-700 p-3 rounded-lg text-white"
      onClick={foodTokenClick}
    >
      <p className="font-semibold text-lg">{food.type}</p>
    </div>
  );
};

export default FoodToken;

import { useAtom } from "jotai";
import {
  currentActionAtom,
  selectedFoodAtom,
  birdFeederAtom,
  playerFoodSupplyAtom,
  disableClickAtom,
} from "../../../../utils/jotaiStore";
import { foodSelection } from "../../../../utils/gameFunctions/foodFunctions";

const SelectedFoodToken = ({ food }) => {
  const [currentAction] = useAtom(currentActionAtom);
  const [disableClick] = useAtom(disableClickAtom);
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setBirdFeeder] = useAtom(birdFeederAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const disableSelectedFood = disableClick.selectedFood;

  const selectedFoodTokenClick = () => {
    if (disableSelectedFood) {
      console.log("disabled");
    } else {
      if (currentAction === "forest" || currentAction === "brownFeeder") {
        foodSelection(selectedFood, setBirdFeeder, setSelectedFood, food.id);
      } else {
        foodSelection(selectedFood, setPlayerFood, setSelectedFood, food.id);
      }
    }
  };

  return (
    <div
      className="bg-indigo-900 p-3 rounded-lg text-white"
      onClick={selectedFoodTokenClick}
    >
      <p className="font-semibold text-lg">{food.type}</p>
    </div>
  );
};

export default SelectedFoodToken;

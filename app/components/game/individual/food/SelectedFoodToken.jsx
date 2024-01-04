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
      switch (currentAction) {
        case "forest":
          foodSelection(selectedFood, setBirdFeeder, setSelectedFood, food.id);
          break;
        case "grassland":
          foodSelection(selectedFood, setPlayerFood, setSelectedFood, food.id);
          break;
        case "playBird":
          foodSelection(selectedFood, setPlayerFood, setSelectedFood, food.id);
          break;
        case "brownFeeder":
          foodSelection(selectedFood, setBirdFeeder, setSelectedFood, food.id);
          break;
        case "brownFood":
          foodSelection(selectedFood, setPlayerFood, setSelectedFood, food.id);
          break;
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

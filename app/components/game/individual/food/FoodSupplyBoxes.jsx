import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import {
  disableClickAtom,
  playerFoodSupplyAtom,
} from "../../../../utils/jotaiStore";

const FoodSupplyBoxes = ({ type, bg }) => {
  const [disableClick] = useAtom(disableClickAtom);
  const disableFood = disableClick.foodSupply;

  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const foodSupplyClick = () => {
    if (disableFood) {
      console.log("disabled");
    } else {
      setPlayerFood((state) => [...state, { type: type, id: nanoid() }]);
    }
  };

  return (
    <div className={`${bg} p-10 rounded-lg`} onClick={foodSupplyClick}>
      <p className="text-xl font-bold text-white">{type.toUpperCase()}</p>
    </div>
  );
};

export default FoodSupplyBoxes;

import { useAtom } from "jotai";
import { playerFoodSupplyAtom } from "../../../utils/jotaiStore";
import FoodToken from "../individual/food/FoodToken";

const PlayerFoodSupply = () => {
  const [playerFoodSupply] = useAtom(playerFoodSupplyAtom);

  const foodSupplyContent = playerFoodSupply.map((food) => (
    <FoodToken key={food.id} food={food} />
  ));

  return (
    <div className="col-span-6 flex flex-col items-center gap-3">
      <p className="text-indigo-900 font-semibold text-lg text-center   ">
        Player Food Supply
      </p>
      <div className="flex gap-3 flex-wrap">{foodSupplyContent}</div>
    </div>
  );
};

export default PlayerFoodSupply;

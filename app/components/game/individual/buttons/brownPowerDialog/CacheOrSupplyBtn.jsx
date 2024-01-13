import { useAtom } from "jotai";
import {
  playerFoodSupplyAtom,
  selectedFoodAtom,
} from "../../../../../utils/jotaiStore";
import {
  cacheToken,
  continueBrownPower,
} from "../../../../../utils/gameFunctions/birdPowerFunctions";
import { saveFoodSelection } from "../../../../../utils/gameFunctions/foodFunctions";

const CacheOrSupply = ({ brownBirdSupply }) => {
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  const continueBrownBirds = () => {
    brownBirdSupply.setBrownPowerContinueBtn(false);
    brownBirdSupply.setDisableClick((state) => ({
      ...state,
      selectedFood: false,
    }));

    continueBrownPower(brownBirdSupply);
  };

  const addToSupplyClick = () => {
    saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);
    continueBrownBirds();
  };

  const cacheTokenClick = () => {
    cacheToken(brownBirdSupply, setSelectedFood);

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

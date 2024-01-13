import { useAtom } from "jotai";
import {
  birdFeederAtom,
  selectedFoodAtom,
  selectedBirdsAtom,
} from "../../../../utils/jotaiStore";
import { continueBrownPower } from "../../../../utils/gameFunctions/birdPowerFunctions";

const NextPower = ({ brownBirdSupply }) => {
  const [, setBirdFeeder] = useAtom(birdFeederAtom);
  const [, setSelectedBirds] = useAtom(selectedBirdsAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  const continueBrownBirds = () => {
    //forest specific
    if (selectedFood.length) {
      setBirdFeeder((state) => [...state, selectedFood[0]]);
      setSelectedFood([]);
    }
    //
    if (brownBirdSupply.currentAction === "brownWing") {
      setSelectedBirds([]);
    }
    brownBirdSupply.setBrownPowerContinueBtn(false);

    brownBirdSupply.setBrownBirdCopy((state) => ({
      ...state,
      dialog: "",
      currentSpace: null,
    }));
    continueBrownPower(brownBirdSupply);
  };

  return (
    <button
      className="bg-emerald-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      onClick={continueBrownBirds}
    >
      Go to next bird power
    </button>
  );
};

export default NextPower;

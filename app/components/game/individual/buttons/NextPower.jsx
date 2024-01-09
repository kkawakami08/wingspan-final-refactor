import { useAtom } from "jotai";
import { birdFeederAtom, selectedFoodAtom } from "../../../../utils/jotaiStore";
import { activateBrownPowers } from "../../../../utils/gameFunctions/birdPowerFunctions";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";

const NextPower = ({ brownBirdSupply }) => {
  const [, setBirdFeeder] = useAtom(birdFeederAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  const continueBrownBirds = () => {
    if (selectedFood.length) {
      setBirdFeeder((state) => [...state, selectedFood[0]]);
      setSelectedFood([]);
    }
    brownBirdSupply.setBrownPowerContinueBtn(false);

    if (!brownBirdSupply.brownBirdCopy.copy.length) {
      resetAction(
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentAction,

        brownBirdSupply.setCurrentActionText
      );
    } else {
      brownBirdSupply.setBrownBirdCopy((state) => ({
        ...state,
        dialog: "",
        currentSpace: null,
      }));
      switch (brownBirdSupply.brownBirdCopy.location) {
        case "forest":
          activateBrownPowers(
            brownBirdSupply.forest,
            brownBirdSupply.brownBirdCopy.copy,

            brownBirdSupply
          );
          return;
      }
    }
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

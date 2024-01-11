import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedBirdsAtom,
  selectedFoodAtom,
  brownBirdVariableAtom,
} from "../../../../utils/jotaiStore";

import { continueBrownPower } from "../../../../utils/gameFunctions/birdPowerFunctions";

const BrownDiscardBtn = ({ brownBirdSupply }) => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  const [brownBirdVariable] = useAtom(brownBirdVariableAtom);

  let disableSave;
  const updateDisable = () => {
    switch (brownBirdSupply.currentAction) {
      case "discard":
        disableSave = selectedBirds.length == brownBirdSupply.discardQuantity;
        break;
      default:
        disableSave =
          selectedFood.length == brownBirdSupply.resourceQuantity &&
          selectedFood.some((item) => item.type.includes(brownBirdVariable));
        break;
    }
  };

  updateDisable();

  const discardBtnClick = () => {
    switch (brownBirdSupply.currentAction) {
      case "discard":
        setSelectedBirds([]);
        brownBirdSupply.setBrownPowerEnd(false);
        break;
      default:
        setSelectedFood([]);
        break;
    }
    continueBrownPower(brownBirdSupply);
  };

  useEffect(() => {
    updateDisable();
  }, [selectedBirds, selectedFood]);

  return (
    <button
      className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      disabled={!disableSave}
      onClick={discardBtnClick}
    >
      Discard Selection
    </button>
  );
};

export default BrownDiscardBtn;

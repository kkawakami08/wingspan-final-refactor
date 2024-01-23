import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedBirdsAtom,
  selectedFoodAtom,
} from "../../../../utils/jotaiStore";

import { continueBrownPower } from "../../../../utils/gameFunctions/birdPowerFunctions";

const BrownDiscardBtn = ({ brownBirdSupply }) => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  let disableSave;
  const updateDisable = () => {
    if (brownBirdSupply.currentAction == "discard") {
      disableSave = selectedBirds.length == brownBirdSupply.discardQuantity;
    } else {
      disableSave =
        selectedFood.length == brownBirdSupply.resourceQuantity &&
        selectedFood.some((item) =>
          item.type.includes(brownBirdSupply.brownBirdVariable)
        );
    }
  };

  updateDisable();

  const discardBtnClick = () => {
    if (brownBirdSupply.currentAction == "discard") {
      setSelectedBirds([]);
      brownBirdSupply.setBrownPowerEnd(false);
    } else {
      setSelectedFood([]);
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

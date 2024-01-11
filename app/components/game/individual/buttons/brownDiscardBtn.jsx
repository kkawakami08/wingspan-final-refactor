import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedBirdsAtom,
  resourceQuantityAtom,
  selectedFoodAtom,
  brownBirdVariableAtom,
} from "../../../../utils/jotaiStore";

import {
  activateBrownPowers,
  continueBrownPower,
} from "../../../../utils/gameFunctions/birdPowerFunctions";

const BrownDiscardBtn = ({ brownBirdSupply }) => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  const [resourceQuantity] = useAtom(resourceQuantityAtom);

  const [brownBirdVariable] = useAtom(brownBirdVariableAtom);

  let disableSave;
  const updateDisable = () => {
    switch (brownBirdSupply.currentAction) {
      case "discard":
        disableSave = selectedBirds.length == resourceQuantity;
        break;
      default:
        disableSave =
          selectedFood.length == resourceQuantity &&
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
        continueBrownPower(brownBirdSupply);
      default:
        setSelectedFood([]);

        switch (brownBirdSupply.brownBirdCopy.location) {
          case "forest":
            activateBrownPowers(
              brownBirdSupply.forest,
              brownBirdSupply.brownBirdCopy.copy,

              brownBirdSupply
            );
            return;
          case "grassland":
            activateBrownPowers(
              brownBirdSupply.grassland,
              brownBirdSupply.brownBirdCopy.copy,

              brownBirdSupply
            );
            return;
        }
    }
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

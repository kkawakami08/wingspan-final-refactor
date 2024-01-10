import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedBirdsAtom,
  resourceQuantityAtom,
  selectedFoodAtom,
  playerFoodSupplyAtom,
  brownBirdVariableAtom,
} from "../../../../utils/jotaiStore";
import { saveFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";
import {
  activateBrownPowers,
  continueBrownPower,
} from "../../../../utils/gameFunctions/birdPowerFunctions";
import { birdFeederCheck } from "../../../../utils/gameFunctions/brownPowerHelperFunctions";

const BrownSelectBtn = ({ brownBirdSupply }) => {
  const [selectedBirds] = useAtom(selectedBirdsAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const [resourceQuantity] = useAtom(resourceQuantityAtom);

  const [brownBirdVariable] = useAtom(brownBirdVariableAtom);

  let disableSave;
  const updateDisable = () => {
    switch (brownBirdSupply.currentAction) {
      case "brownFeeder":
        disableSave =
          selectedFood.length == resourceQuantity &&
          birdFeederCheck(brownBirdVariable, selectedFood);
        break;
      case "brownFood":
        disableSave =
          selectedFood.length == resourceQuantity &&
          selectedFood.some((item) => item.type.includes(brownBirdVariable));
        break;
    }
  };
  updateDisable();

  const selectBtnClick = () => {
    if (
      brownBirdSupply.currentAction === "brownFood" ||
      brownBirdSupply.currentAction === "brownFeeder"
    ) {
      saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);

      continueBrownPower(brownBirdSupply);
    }
  };

  useEffect(() => {
    updateDisable();
  }, [selectedBirds, selectedFood]);

  return (
    <button
      className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      disabled={!disableSave}
      onClick={selectBtnClick}
    >
      Save Selection
    </button>
  );
};

export default BrownSelectBtn;

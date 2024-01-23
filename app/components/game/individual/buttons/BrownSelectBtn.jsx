import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedBirdsAtom,
  selectedFoodAtom,
  playerFoodSupplyAtom,
} from "../../../../utils/jotaiStore";
import { saveFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";
import {
  continueBrownPower,
  tuckCard,
} from "../../../../utils/gameFunctions/birdPowerFunctions";
import { birdFeederCheck } from "../../../../utils/gameFunctions/brownPowerHelperFunctions";

const BrownSelectBtn = ({ brownBirdSupply }) => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  let disableSave;
  const updateDisable = () => {
    switch (brownBirdSupply.currentAction) {
      case "brownFeeder":
        disableSave =
          selectedFood.length == brownBirdSupply.resourceQuantity &&
          birdFeederCheck(brownBirdSupply.brownBirdVariable, selectedFood);
        break;
      case "brownFood":
        disableSave =
          selectedFood.length == brownBirdSupply.resourceQuantity &&
          selectedFood.some((item) =>
            item.type.includes(brownBirdSupply.brownBirdVariable)
          );
        break;
      case "brownTuck":
        disableSave = selectedBirds.length == brownBirdSupply.resourceQuantity;
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
    } else {
      //tucking
      tuckCard(brownBirdSupply);
      setSelectedBirds([]);
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
      onClick={selectBtnClick}
    >
      Save Selection
    </button>
  );
};

export default BrownSelectBtn;

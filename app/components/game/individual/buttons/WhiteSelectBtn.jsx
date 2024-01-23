import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedBirdsAtom,
  selectedFoodAtom,
  playerFoodSupplyAtom,
  playBirdAtom,
  playerBirdHandAtom,
  birdTrayAtom,
  birdDeckAtom,
} from "../../../../utils/jotaiStore";
import { saveFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";

import { birdFeederCheck } from "../../../../utils/gameFunctions/brownPowerHelperFunctions";
import { resetPlayBirdAction } from "../../../../utils/gameFunctions/playABirdFunctions";
import { saveSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { refillTray } from "../../../../utils/gameFunctions/birdTrayFunctions";

const WhiteSelectBtn = ({ brownBirdSupply }) => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [birdDeck] = useAtom(birdDeckAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);

  let disableSave;
  const updateDisable = () => {
    if (brownBirdSupply.currentAction === "whiteFeeder") {
      disableSave =
        selectedFood.length == brownBirdSupply.resourceQuantity &&
        birdFeederCheck(brownBirdSupply.brownBirdVariable, selectedFood);
    } else {
      disableSave = selectedBirds.length == brownBirdSupply.resourceQuantity;
    }
  };
  updateDisable();
  const selectBtnClick = () => {
    if (brownBirdSupply.currentAction === "whiteFeeder") {
      saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);
    } else {
      saveSelection(setBirdHand, selectedBirds, setSelectedBirds);
    }
    if (brownBirdSupply.currentAction === "whiteCard") {
      refillTray(birdTray, birdDeck, setBirdTray);
    }
    resetPlayBirdAction(
      brownBirdSupply.setDisableClick,
      brownBirdSupply.setResourceQuantity,
      brownBirdSupply.setCurrentAction,
      brownBirdSupply.setPlayBirdState,
      brownBirdSupply.setCurrentActionText
    );
  };

  useEffect(() => {
    updateDisable();
  }, [selectedBirds, selectedFood]);

  return (
    <button
      className="bg-purple-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      disabled={!disableSave}
      onClick={selectBtnClick}
    >
      Save Selection
    </button>
  );
};

export default WhiteSelectBtn;

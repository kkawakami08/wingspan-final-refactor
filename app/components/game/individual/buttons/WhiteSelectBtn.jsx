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
import {
  continueBrownPower,
  tuckCard,
} from "../../../../utils/gameFunctions/birdPowerFunctions";
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
  const [, setPlayBirdState] = useAtom(playBirdAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);

  let disableSave;
  const updateDisable = () => {
    switch (brownBirdSupply.currentAction) {
      case "whiteFeeder":
        disableSave =
          selectedFood.length == brownBirdSupply.resourceQuantity &&
          birdFeederCheck(brownBirdSupply.brownBirdVariable, selectedFood);
        break;
      case "whiteSelect":
        disableSave = selectedBirds.length == brownBirdSupply.resourceQuantity;
        break;
      case "whiteCard":
        disableSave = selectedBirds.length == brownBirdSupply.resourceQuantity;
        break;
      // case "brownFood":
      //   disableSave =
      //     selectedFood.length == brownBirdSupply.resourceQuantity &&
      //     selectedFood.some((item) =>
      //       item.type.includes(brownBirdSupply.brownBirdVariable)
      //     );
      //   break;
      // case "brownTuck":
      //   disableSave = selectedBirds.length == brownBirdSupply.resourceQuantity;
      //   break;
    }
  };
  updateDisable();

  const selectBtnClick = () => {
    if (
      // brownBirdSupply.currentAction === "brownFood" ||
      brownBirdSupply.currentAction === "whiteFeeder"
    ) {
      saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);
      // } else {
      //   //tucking
      //   tuckCard(brownBirdSupply);
      //   setSelectedBirds([]);
      // }
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

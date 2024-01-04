import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedBirdsAtom,
  resourceQuantityAtom,
  disableClickAtom,
  playerBirdHandAtom,
  currentActionAtom,
  birdTrayAtom,
  birdDeckAtom,
  selectedFoodAtom,
  playerFoodSupplyAtom,
  playBirdAtom,
  currentActionTextAtom,
  forestAtom,
  forestBirdCountAtom,
  grasslandAtom,
  grasslandBirdCountAtom,
  brownBirdVariableAtom,
  birdFeederAtom,
  brownBirdCopyAtom,
  brownPowerContinueBtnAtom,
  playerEggSupplyAtom,
} from "../../../../utils/jotaiStore";
import { refillTray } from "../../../../utils/gameFunctions/birdTrayFunctions";
import { saveSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { saveFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";
import { activateBrownPowers } from "../../../../utils/gameFunctions/birdPowerFunctions";
import { rollBirdFeeder } from "../../../../utils/gameFunctions/birdFeederFunctions";
import { birdFeederCheck } from "../../../../utils/gameFunctions/brownPowerHelperFunctions";

const BrownSelectBtn = () => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [birdDeck] = useAtom(birdDeckAtom);
  const [playerEggs] = useAtom(playerEggSupplyAtom);
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);

  const [playBirdState, setPlayBirdState] = useAtom(playBirdAtom);

  const [forest] = useAtom(forestAtom);
  const [grassland] = useAtom(grasslandAtom);
  const [forestBirdCount] = useAtom(forestBirdCountAtom);

  const [brownBirdVariable, setBrownBirdVariable] = useAtom(
    brownBirdVariableAtom
  );
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [brownPowerContinue, setBrownPowerContinue] = useAtom(
    brownPowerContinueBtnAtom
  );

  const brownBirdSupply = {
    birdFeeder: birdFeeder,
    setBirdFeeder: setBirdFeeder,
    setDisableClick: setDisableClick,
    setCurrentActionText: setCurrentActionText,
    setResourceQuantity: setResourceQuantity,
    setBrownBirdVariable: setBrownBirdVariable,
    setBrownPowerContinueBtn: setBrownPowerContinue,
    brownPowerContinueBtn: brownPowerContinue,
    setCurrentAction: setCurrentAction,
    setBrownBirdCopy: setBrownBirdCopy,
    brownBirdCopy: brownBirdCopy,
    setSelectedFood: setSelectedFood,
    playerEggs: playerEggs,
  };

  let disableSave;
  const updateDisable = () => {
    switch (currentAction) {
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
    if (currentAction === "brownFood" || currentAction === "brownFeeder") {
      saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);

      switch (brownBirdCopy.location) {
        case "forest":
          activateBrownPowers(
            forest,
            brownBirdCopy.copy,

            brownBirdSupply
          );
          return;
        case "grassland":
          activateBrownPowers(
            grassland,
            brownBirdCopy.copy,

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
      onClick={selectBtnClick}
    >
      Save Selection
    </button>
  );
};

export default BrownSelectBtn;

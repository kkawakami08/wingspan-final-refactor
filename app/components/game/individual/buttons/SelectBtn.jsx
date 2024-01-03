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
  brownBirdVariableAtom,
  birdFeederAtom,
  forestBrownBirdsAtom,
  brownBirdCopyAtom,
  brownPowerContinueBtnAtom,
} from "../../../../utils/jotaiStore";
import { refillTray } from "../../../../utils/gameFunctions/birdTrayFunctions";
import { saveSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { saveFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";
import { activateBrownPowers } from "../../../../utils/gameFunctions/birdPowerFunctions";

const SelectBtn = () => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [birdDeck] = useAtom(birdDeckAtom);
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);

  const [playBirdState, setPlayBirdState] = useAtom(playBirdAtom);

  const [forest] = useAtom(forestAtom);
  const [forestBirdCount] = useAtom(forestBirdCountAtom);
  const [forestBrownBirds] = useAtom(forestBrownBirdsAtom);
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [brownPowerContinueBtn, setBrownPowerContinueBtn] = useAtom(
    brownPowerContinueBtnAtom
  );

  const [brownBirdVariable, setBrownBirdVariable] = useAtom(
    brownBirdVariableAtom
  );

  const brownBirdSupply = {
    birdFeeder: birdFeeder,
    setBirdFeeder: setBirdFeeder,
    setDisableClick: setDisableClick,
    setCurrentActionText: setCurrentActionText,
    setResourceQuantity: setResourceQuantity,
    setBrownBirdVariable: setBrownBirdVariable,
    setBrownPowerContinueBtn: setBrownPowerContinueBtn,
    brownPowerContinueBtn: brownPowerContinueBtn,
    setCurrentAction: setCurrentAction,
    setBrownBirdCopy: setBrownBirdCopy,
    brownBirdCopy: brownBirdCopy,
    setSelectedFood: setSelectedFood,
  };

  let disableSave;
  const updateDisable = () => {
    switch (currentAction) {
      case "wetland":
        disableSave = selectedBirds.length === resourceQuantity;
        break;
      case "forest":
        disableSave = selectedFood.length === resourceQuantity;
        break;
      case "playBird":
        disableSave =
          selectedBirds.length === 1 &&
          selectedBirds[0].habitat.includes(playBirdState.habitat);
        break;
    }
  };
  updateDisable();

  const selectBtnClick = () => {
    switch (currentAction) {
      case "wetland":
        saveSelection(setBirdHand, selectedBirds, setSelectedBirds);
        refillTray(birdTray, birdDeck, setBirdTray);
        break;
      case "forest":
        saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);
        if (!forestBrownBirds.length) {
          break;
        } else {
          setBrownBirdCopy((state) => ({
            ...state,
            location: "forest",
          }));

          activateBrownPowers(
            forest,
            forestBrownBirds,

            brownBirdSupply
          );
          return;
        }

      case "playBird":
        setPlayBirdState((state) => {
          state.bird = selectedBirds[0];
        });
        setDisableClick((state) => ({
          ...state,
          playerFood: false,
          birdHand: true,
        }));
        setCurrentActionText(
          `Selected ${selectedBirds[0].common_name}. Discard required food`
        );

        return;
    }

    resetAction(
      setDisableClick,
      setResourceQuantity,
      setCurrentAction,

      setCurrentActionText
    );
  };

  useEffect(() => {
    updateDisable();
  }, [selectedBirds]);

  return (
    <button
      className="bg-emerald-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      disabled={!disableSave}
      onClick={selectBtnClick}
    >
      Save Selection
    </button>
  );
};

export default SelectBtn;

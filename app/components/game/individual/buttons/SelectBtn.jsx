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
  grasslandPlayableAtom,
} from "../../../../utils/jotaiStore";
import { refillTray } from "../../../../utils/gameFunctions/birdTrayFunctions";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";
import { saveSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { saveFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";

const SelectBtn = () => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [birdDeck] = useAtom(birdDeckAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);

  const [playBirdState, setPlayBirdState] = useAtom(playBirdAtom);
  const [, setGrassLandPlayable] = useAtom(grasslandPlayableAtom);

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
        break;
      case "playBird":
        setPlayBirdState((state) => {
          state.bird = selectedBirds[0];
        });
        setDisableClick((state) => ({
          ...state,
          playerFood: false,
          birdHand: true,
        }));
        return;
    }

    resetAction(
      setDisableClick,
      setResourceQuantity,
      setCurrentAction,
      setPlayBirdState,
      setGrassLandPlayable
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

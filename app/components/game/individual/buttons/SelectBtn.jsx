import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  selectedBirdsAtom,
  playerBirdHandAtom,
  birdTrayAtom,
  birdDeckAtom,
  selectedFoodAtom,
  playerFoodSupplyAtom,
  playBirdAtom,
  forestBrownBirdsAtom,
  wetlandBrownBirdsAtom,
} from "../../../../utils/jotaiStore";
import { refillTray } from "../../../../utils/gameFunctions/birdTrayFunctions";
import { saveSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { saveFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";
import { activateBrownPowers } from "../../../../utils/gameFunctions/birdPowerFunctions";

const SelectBtn = ({ brownBirdSupply }) => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [birdDeck] = useAtom(birdDeckAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const [playBirdState] = useAtom(playBirdAtom);

  const [forestBrownBirds] = useAtom(forestBrownBirdsAtom);
  const [wetlandBrownBirds] = useAtom(wetlandBrownBirdsAtom);

  let disableSave;
  const updateDisable = () => {
    switch (brownBirdSupply.currentAction) {
      case "wetland":
        disableSave = selectedBirds.length === brownBirdSupply.resourceQuantity;
        break;
      case "forest":
        disableSave = selectedFood.length === brownBirdSupply.resourceQuantity;
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
    switch (brownBirdSupply.currentAction) {
      case "wetland":
        saveSelection(setBirdHand, selectedBirds, setSelectedBirds);
        refillTray(birdTray, birdDeck, setBirdTray);
        if (!wetlandBrownBirds.length) {
          break;
        } else {
          brownBirdSupply.setBrownBirdCopy((state) => ({
            ...state,
            location: "wetland",
          }));

          activateBrownPowers(
            brownBirdSupply.wetland,
            wetlandBrownBirds,
            brownBirdSupply
          );
          return;
        }

      case "forest":
        saveFoodSelection(setPlayerFood, selectedFood, setSelectedFood);
        if (!forestBrownBirds.length) {
          break;
        } else {
          brownBirdSupply.setBrownBirdCopy((state) => ({
            ...state,
            location: "forest",
          }));

          activateBrownPowers(
            brownBirdSupply.forest,
            forestBrownBirds,
            brownBirdSupply
          );
          return;
        }

      case "playBird":
        brownBirdSupply.setPlayBirdState((state) => {
          state.bird = selectedBirds[0];
        });
        brownBirdSupply.setDisableClick((state) => ({
          ...state,
          playerFood: false,
          birdHand: true,
        }));
        brownBirdSupply.setCurrentActionText(
          `Selected ${selectedBirds[0].common_name}. Discard required food`
        );

        return;
    }

    resetAction(
      brownBirdSupply.setDisableClick,
      brownBirdSupply.setResourceQuantity,
      brownBirdSupply.setCurrentAction,

      brownBirdSupply.setCurrentActionText
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

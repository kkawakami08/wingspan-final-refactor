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
  brownBirdBoolAtom,
} from "../../../../utils/jotaiStore";
import { refillTray } from "../../../../utils/gameFunctions/birdTrayFunctions";
import { saveSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { saveFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";
import { birdPowerCheck } from "../../../../utils/gameFunctions/birdPowerFunctions";

const BrownSelectBtn = () => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [birdDeck] = useAtom(birdDeckAtom);
  const [birdFeeder] = useAtom(birdFeederAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setPlayerFood] = useAtom(playerFoodSupplyAtom);

  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);

  const [playBirdState, setPlayBirdState] = useAtom(playBirdAtom);

  const [forest] = useAtom(forestAtom);
  const [forestBirdCount] = useAtom(forestBirdCountAtom);

  const [brownBirdBool, setBrownBirdBool] = useAtom(brownBirdBoolAtom);
  const [brownBirdVariable, setBrownBirdVariable] = useAtom(
    brownBirdVariableAtom
  );

  let disableSave;
  const updateDisable = () => {
    switch (
      currentAction
      // case "wetland":
      //   disableSave = selectedBirds.length === resourceQuantity;
      //   break;
      // case "forest":
      //   disableSave = selectedFood.length === resourceQuantity;
      //   break;
    ) {
    }
  };
  updateDisable();

  const selectBtnClick = () => {
    switch (
      currentAction
      // case "wetland":
      //   saveSelection(setBirdHand, selectedBirds, setSelectedBirds);
      //   refillTray(birdTray, birdDeck, setBirdTray);
      //   break;

      // case "playBird":
      //   setPlayBirdState((state) => {
      //     state.bird = selectedBirds[0];
      //   });
      //   setDisableClick((state) => ({
      //     ...state,
      //     playerFood: false,
      //     birdHand: true,
      //   }));
      //   setCurrentActionText(
      //     `Selected ${selectedBirds[0].common_name}. Discard required food`
      //   );
      //   return;
    ) {
    }
    console.log("resetting");
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

export default BrownSelectBtn;

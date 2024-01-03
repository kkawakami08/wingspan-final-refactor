import { useAtom } from "jotai";
import {
  brownBirdCopyAtom,
  birdFeederAtom,
  disableClickAtom,
  currentActionAtom,
  currentActionTextAtom,
  resourceQuantityAtom,
  brownBirdVariableAtom,
  brownPowerContinueBtnAtom,
  selectedFoodAtom,
  forest,
  forestAtom,
} from "../../../../utils/jotaiStore";
import { activateBrownPowers } from "../../../../utils/gameFunctions/birdPowerFunctions";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";

const NextPower = () => {
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [forest, setForest] = useAtom(forestAtom);
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [currentActionText, setCurrentActionText] = useAtom(
    currentActionTextAtom
  );
  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [brownBirdVariable, setBrownBirdVariable] = useAtom(
    brownBirdVariableAtom
  );
  const [brownPowerContinueBtn, setBrownPowerContinueBtn] = useAtom(
    brownPowerContinueBtnAtom
  );
  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

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

  const continueBrownBirds = () => {
    if (selectedFood.length) {
      setBirdFeeder((state) => [...state, selectedFood[0]]);
      setSelectedFood([]);
    }
    setBrownPowerContinueBtn(false);

    if (!brownBirdCopy.copy.length) {
      resetAction(
        setDisableClick,
        setResourceQuantity,
        setCurrentAction,

        setCurrentActionText
      );
    } else {
      setBrownBirdCopy((state) => ({
        ...state,
        dialog: "",
        currentSpace: null,
      }));
      switch (brownBirdCopy.location) {
        case "forest":
          activateBrownPowers(
            forest,
            brownBirdCopy.copy,

            brownBirdSupply
          );
          return;
      }
    }
  };

  return (
    <button
      className="bg-emerald-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      onClick={continueBrownBirds}
    >
      Go to next bird power
    </button>
  );
};

export default NextPower;

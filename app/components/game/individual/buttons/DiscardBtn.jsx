import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  resourceQuantityAtom,
  birdDiscardAtom,
  disableClickAtom,
  currentActionAtom,
  selectedFoodAtom,
} from "../../../../utils/jotaiStore";
import { discardSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { discardFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";

const DiscardBtn = () => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdDiscard] = useAtom(birdDiscardAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);

  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [currentAction] = useAtom(currentActionAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);

  let disableDiscard;
  switch (currentAction) {
    case "forest":
      disableDiscard = selectedBirds.length === 1;
      break;
    case "grassland":
      disableDiscard = selectedFood.length === 1;
      break;
  }

  const discardBtnClick = () => {
    switch (currentAction) {
      case "forest":
        discardSelection(
          setResourceQuantity,
          setBirdDiscard,
          selectedBirds,
          setSelectedBirds
        );
        setDisableClick((state) => ({
          ...state,
          birdHand: true,
        }));
        break;
      case "grassland":
        discardFoodSelection(setResourceQuantity, setSelectedFood);
        setDisableClick((state) => ({
          ...state,
          playerFood: true,
        }));
        break;
    }
  };

  return (
    <button
      className="bg-emerald-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      disabled={!disableDiscard}
      onClick={discardBtnClick}
    >
      Discard Selection
    </button>
  );
};

export default DiscardBtn;

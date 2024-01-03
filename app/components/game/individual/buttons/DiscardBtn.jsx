import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  resourceQuantityAtom,
  birdDiscardAtom,
  disableClickAtom,
  currentActionAtom,
  selectedFoodAtom,
  playBirdAtom,
  forestAtom,
  forestBirdCountAtom,
  currentActionTextAtom,
  grasslandAtom,
  grasslandBirdCountAtom,
  wetlandAtom,
  wetlandBirdCountAtom,
  forestBrownBirdsAtom,
  grasslandBrownBirdsAtom,
  wetlandBrownBirdsAtom,
} from "../../../../utils/jotaiStore";
import { discardSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { discardFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";
import {
  placeBird,
  playBird,
} from "../../../../utils/gameFunctions/playABirdFunctions";
import { resetPlayBirdAction } from "../../../../utils/gameFunctions/playABirdFunctions";

const DiscardBtn = () => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdDiscard] = useAtom(birdDiscardAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [playBirdState, setPlayBirdState] = useAtom(playBirdAtom);

  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);

  const [, setForest] = useAtom(forestAtom);
  const [forestBirdCount, setForestBirdCount] = useAtom(forestBirdCountAtom);
  const [forestBrownBirds, setForestBrownBirds] = useAtom(forestBrownBirdsAtom);

  const [, setGrassland] = useAtom(grasslandAtom);
  const [grasslandBirdCount, setGrasslandBirdCount] = useAtom(
    grasslandBirdCountAtom
  );
  const [grasslandBrownBirds, setGrasslandBrownBirds] = useAtom(
    grasslandBrownBirdsAtom
  );

  const [, setWetland] = useAtom(wetlandAtom);
  const [wetlandBirdCount, setWetlandBirdCount] = useAtom(wetlandBirdCountAtom);
  const [wetlandBrownBirds, setWetlandBrownBirds] = useAtom(
    wetlandBrownBirdsAtom
  );

  const forestState = {
    setHabitat: setForest,
    birdCount: forestBirdCount,
    setBirdCount: setForestBirdCount,
    setBrownBirds: setForestBrownBirds,
  };
  const grasslandState = {
    setHabitat: setGrassland,
    birdCount: grasslandBirdCount,
    setBirdCount: setGrasslandBirdCount,
    setBrownBirds: setGrasslandBrownBirds,
  };
  const wetlandState = {
    setHabitat: setWetland,
    birdCount: wetlandBirdCount,
    setBirdCount: setWetlandBirdCount,
    setBrownBirds: setWetlandBrownBirds,
  };

  let disableDiscard;
  switch (currentAction) {
    case "forest":
      disableDiscard = selectedBirds.length === 1;
      break;
    case "grassland":
      disableDiscard = selectedFood.length === 1;
      break;
    case "playBird":
      if (playBirdState.bird) {
        disableDiscard = playBird(selectedFood, selectedBirds[0]);
      }
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
      case "playBird":
        discardFoodSelection(setResourceQuantity, setSelectedFood);
        switch (playBirdState.habitat) {
          case "forest":
            placeBird(playBirdState, forestState);
            break;
          case "grassland":
            placeBird(playBirdState, grasslandState);
            break;
          case "wetland":
            placeBird(playBirdState, wetlandState);
            break;
        }
        setSelectedBirds((hand) => {
          hand = [];
          return hand;
        });
        resetPlayBirdAction(
          setDisableClick,
          setResourceQuantity,
          setCurrentAction,
          setPlayBirdState,
          setCurrentActionText
        );
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

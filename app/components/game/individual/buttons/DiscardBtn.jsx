import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  birdDiscardAtom,
  selectedFoodAtom,
  playBirdAtom,
  birdDeckAtom,
  playerBirdHandAtom,
} from "../../../../utils/jotaiStore";
import { discardSelection } from "../../../../utils/gameFunctions/generalFunctions";
import { discardFoodSelection } from "../../../../utils/gameFunctions/foodFunctions";
import {
  placeBird,
  playBird,
} from "../../../../utils/gameFunctions/playABirdFunctions";
import { resetPlayBirdAction } from "../../../../utils/gameFunctions/playABirdFunctions";
import { whitePowerCheck } from "../../../../utils/gameFunctions/birdPowerFunctions";

const DiscardBtn = ({ brownBirdSupply, moveBirdSupply }) => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdDiscard] = useAtom(birdDiscardAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [playBirdState] = useAtom(playBirdAtom);
  const [birdDeck] = useAtom(birdDeckAtom);
  const [birdHand] = useAtom(playerBirdHandAtom);

  const forestState = {
    setHabitat: brownBirdSupply.setForest,
    birdCount: moveBirdSupply.forestBirdCount,
    setBirdCount: moveBirdSupply.setForestBirdCount,
    setBrownBirds: moveBirdSupply.setForestBrownBirds,
  };
  const grasslandState = {
    setHabitat: brownBirdSupply.setGrassland,
    birdCount: moveBirdSupply.grasslandBirdCount,
    setBirdCount: moveBirdSupply.setGrasslandBirdCount,
    setBrownBirds: moveBirdSupply.setGrasslandBrownBirds,
  };
  const wetlandState = {
    setHabitat: brownBirdSupply.setWetland,
    birdCount: moveBirdSupply.wetlandBirdCount,
    setBirdCount: moveBirdSupply.setWetlandBirdCount,
    setBrownBirds: moveBirdSupply.setWetlandBrownBirds,
  };

  let disableDiscard;
  switch (brownBirdSupply.currentAction) {
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
    switch (brownBirdSupply.currentAction) {
      case "forest":
        discardSelection(
          brownBirdSupply.setResourceQuantity,
          setBirdDiscard,
          selectedBirds,
          setSelectedBirds
        );
        brownBirdSupply.setDisableClick((state) => ({
          ...state,
          birdHand: true,
        }));
        break;
      case "grassland":
        discardFoodSelection(
          brownBirdSupply.setResourceQuantity,
          setSelectedFood
        );
        brownBirdSupply.setDisableClick((state) => ({
          ...state,
          playerFood: true,
        }));
        break;
      case "playBird":
        discardFoodSelection(
          brownBirdSupply.setResourceQuantity,
          setSelectedFood
        );
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
        setSelectedBirds([]);
        //activate white powers
        if (playBirdState.bird.power.color === "white") {
          const canActivate = whitePowerCheck(
            playBirdState,
            brownBirdSupply,
            moveBirdSupply,
            birdDeck,
            birdHand
          );
          brownBirdSupply.setPlayBirdState((state) => {
            state.bird = null;
            return state;
          });
          if (canActivate) {
            return;
          }
        }

        resetPlayBirdAction(
          brownBirdSupply.setDisableClick,
          brownBirdSupply.setResourceQuantity,
          brownBirdSupply.setCurrentAction,
          brownBirdSupply.setPlayBirdState,
          brownBirdSupply.setCurrentActionText
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

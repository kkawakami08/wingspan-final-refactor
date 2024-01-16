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
import {
  activateWhitePowers,
  brownPowerCheck,
  whitePowerCheck,
} from "../../../../utils/gameFunctions/birdPowerFunctions";

const WhiteDiscardBtn = ({ brownBirdSupply, moveBirdSupply }) => {
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdDiscard] = useAtom(birdDiscardAtom);

  const [selectedFood, setSelectedFood] = useAtom(selectedFoodAtom);
  const [playBirdState, setPlayBirdState] = useAtom(playBirdAtom);
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

  let disableDiscard = false;
  const updateDisable = () => {
    console.log("running updatedisable");
    if (selectedFood.length) {
      disableDiscard = playBird(selectedFood, selectedBirds[0]);
    }
  };
  updateDisable();

  const discardBtnClick = () => {
    discardFoodSelection(brownBirdSupply.setResourceQuantity, setSelectedFood);
    console.log("CHECKKIKING");
    switch (playBirdState.habitat) {
      case "forest":
        console.log("FOREST");
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
      console.log("WHITE CHECK");
      const canActivate = whitePowerCheck(
        playBirdState,
        brownBirdSupply,
        moveBirdSupply,
        birdDeck,
        birdHand
      );
      if (canActivate) {
        console.log("CANACTIVATRE TURE");
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
  };

  return (
    <button
      className="bg-purple-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      disabled={!disableDiscard}
      onClick={discardBtnClick}
    >
      Discard Selection
    </button>
  );
};

export default WhiteDiscardBtn;

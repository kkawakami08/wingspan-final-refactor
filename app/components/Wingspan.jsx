import PlayerBirdHand from "./game/bird/PlayerBirdHand";
import BirdDeck from "./game/bird/BirdDeck";
import BirdTray from "./game/bird/BirdTray";
import SelectedBirds from "./game/bird/SelectedBirds";
import BirdFeeder from "./game/food/BirdFeeder";
import HabitatMat from "./game/mat/HabitatMat";
import SelectedFood from "./game/food/SelectedFood";
import PlayerFoodSupply from "./game/food/PlayerFoodSupply";
import FoodSupply from "./game/food/FoodSupply";
import BonusDeck from "./game/bird/BonusDeck";
import BirdDiscard from "./game/bird/BirdDiscard";
import BonusDiscard from "./game/bird/BonusDiscard";

import { useAtom } from "jotai";
import {
  playerEggSupplyAtom,
  brownPowerContinueBtnAtom,
  brownBirdCopyAtom,
  currentActionAtom,
  birdFeederAtom,
  disableClickAtom,
  currentActionTextAtom,
  brownBirdVariableAtom,
  resourceQuantityAtom,
  selectedFoodAtom,
  forestAtom,
  grasslandAtom,
  wetlandAtom,
  brownPowerEndAtom,
  discardQuantityAtom,
  playerFoodSupplyAtom,
  forestBirdCountAtom,
  forestBrownBirdsAtom,
  grasslandBirdCountAtom,
  grasslandBrownBirdsAtom,
  wetlandBrownBirdsAtom,
  wetlandBirdCountAtom,
  playBirdAtom,
  selectedCardsAtom,
} from "../utils/jotaiStore";
import BirdCardOptions from "./game/card/BirdCardOptions";

const Wingspan = () => {
  const [playerEggs] = useAtom(playerEggSupplyAtom);
  const [playerFood] = useAtom(playerFoodSupplyAtom);
  const [forest, setForest] = useAtom(forestAtom);
  const [grassland, setGrassland] = useAtom(grasslandAtom);
  const [wetland, setWetland] = useAtom(wetlandAtom);
  const [brownPowerContinue, setBrownPowerContinue] = useAtom(
    brownPowerContinueBtnAtom
  );
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [brownBirdVariable, setBrownBirdVariable] = useAtom(
    brownBirdVariableAtom
  );
  const [, setSelectedFood] = useAtom(selectedFoodAtom);
  const [, setSelectedCards] = useAtom(selectedCardsAtom);
  const [, setPlayBirdState] = useAtom(playBirdAtom);
  const [birdFeeder] = useAtom(birdFeederAtom);
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [brownPowerEnd, setBrownPowerEnd] = useAtom(brownPowerEndAtom);
  const [discardQuantity, setDiscardQuantity] = useAtom(discardQuantityAtom);

  const [forestBirdCount, setForestBirdCount] = useAtom(forestBirdCountAtom);
  const [grasslandBirdCount, setGrasslandBirdCount] = useAtom(
    grasslandBirdCountAtom
  );
  const [wetlandBirdCount, setWetlandBirdCount] = useAtom(wetlandBirdCountAtom);

  const [, setForestBrownBirds] = useAtom(forestBrownBirdsAtom);
  const [, setGrasslandBrownBirds] = useAtom(grasslandBrownBirdsAtom);
  const [, setWetlandBrownBirds] = useAtom(wetlandBrownBirdsAtom);

  const moveBirdSupply = {
    forestBirdCount: forestBirdCount,
    setForestBirdCount: setForestBirdCount,
    grasslandBirdCount: grasslandBirdCount,
    setGrasslandBirdCount: setGrasslandBirdCount,
    wetlandBirdCount: wetlandBirdCount,
    setWetlandBirdCount: setWetlandBirdCount,
    setForestBrownBirds: setForestBrownBirds,
    setGrasslandBrownBirds: setGrasslandBrownBirds,
    setWetlandBrownBirds: setWetlandBrownBirds,
  };

  const brownBirdSupply = {
    forest: forest,
    setForest: setForest,

    grassland: grassland,
    setGrassland: setGrassland,

    wetland: wetland,
    setWetland: setWetland,

    birdFeeder: birdFeeder,

    setPlayBirdState: setPlayBirdState,

    setSelectedCards: setSelectedCards,

    setDisableClick: setDisableClick,

    setCurrentActionText: setCurrentActionText,

    resourceQuantity: resourceQuantity,
    setResourceQuantity: setResourceQuantity,

    brownBirdVariable: brownBirdVariable,
    setBrownBirdVariable: setBrownBirdVariable,

    setBrownPowerContinueBtn: setBrownPowerContinue,
    brownPowerContinueBtn: brownPowerContinue,

    currentAction: currentAction,
    setCurrentAction: setCurrentAction,

    setBrownBirdCopy: setBrownBirdCopy,
    brownBirdCopy: brownBirdCopy,

    setSelectedFood: setSelectedFood,

    playerEggs: playerEggs,
    playerFood: playerFood,

    brownPowerEnd: brownPowerEnd,
    setBrownPowerEnd: setBrownPowerEnd,

    discardQuantity: discardQuantity,
    setDiscardQuantity: setDiscardQuantity,
  };

  return (
    <div className="grid grid-cols-12 p-5 gap-5">
      {/* //overlay over components */}
      <SelectedBirds
        brownBirdSupply={brownBirdSupply}
        moveBirdSupply={moveBirdSupply}
      />
      {brownBirdSupply.currentAction === "whiteSelect" && <BirdCardOptions />}
      <SelectedFood
        brownBirdSupply={brownBirdSupply}
        moveBirdSupply={moveBirdSupply}
      />
      <BirdFeeder />
      <FoodSupply brownBirdSupply={brownBirdSupply} />
      <div className="col-span-12 flex justify-around ">
        <BirdDeck brownBirdSupply={brownBirdSupply} />
        <BirdDiscard />
        <BirdTray />
        <BonusDeck />
        <BonusDiscard />
      </div>

      <HabitatMat
        brownBirdSupply={brownBirdSupply}
        moveBirdSupply={moveBirdSupply}
      />
      {/* //separate tab */}

      <PlayerFoodSupply />
      <PlayerBirdHand />
    </div>
  );
};

export default Wingspan;

import PlayerBirdHand from "./game/bird/PlayerBirdHand";
import BirdDeck from "./game/bird/BirdDeck";
import BirdTray from "./game/bird/BirdTray";
import SelectedBirds from "./game/bird/SelectedBirds";
import BirdFeeder from "./game/food/BirdFeeder";
import HabitatMat from "./game/mat/HabitatMat";
import SelectedFood from "./game/food/SelectedFood";
import PlayerFoodSupply from "./game/food/PlayerFoodSupply";
import FoodSupply from "./game/food/FoodSupply";

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
} from "../utils/jotaiStore";

const Wingspan = () => {
  const [playerEggs] = useAtom(playerEggSupplyAtom);
  const [forest] = useAtom(forestAtom);
  const [grassland] = useAtom(grasslandAtom);
  const [wetland] = useAtom(wetlandAtom);
  const [brownPowerContinue, setBrownPowerContinue] = useAtom(
    brownPowerContinueBtnAtom
  );
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setBrownBirdVariable] = useAtom(brownBirdVariableAtom);
  const [, setSelectedFood] = useAtom(selectedFoodAtom);
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [brownBirdCopy, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);

  const brownBirdSupply = {
    forest: forest,
    grassland: grassland,
    wetland: wetland,

    birdFeeder: birdFeeder,

    setDisableClick: setDisableClick,
    setCurrentActionText: setCurrentActionText,
    setResourceQuantity: setResourceQuantity,
    setBrownBirdVariable: setBrownBirdVariable,

    setBrownPowerContinueBtn: setBrownPowerContinue,
    brownPowerContinueBtn: brownPowerContinue,

    currentAction: currentAction,
    setCurrentAction: setCurrentAction,

    setBrownBirdCopy: setBrownBirdCopy,
    brownBirdCopy: brownBirdCopy,

    setSelectedFood: setSelectedFood,
    playerEggs: playerEggs,
  };

  return (
    <div className="grid grid-cols-12 p-5 gap-5">
      <PlayerBirdHand />

      <BirdTray />
      <BirdDeck />

      <SelectedBirds brownBirdSupply={brownBirdSupply} />
      <BirdFeeder />
      <PlayerFoodSupply />
      <SelectedFood brownBirdSupply={brownBirdSupply} />
      <FoodSupply brownBirdSupply={brownBirdSupply} />
      <HabitatMat brownBirdSupply={brownBirdSupply} />
    </div>
  );
};

export default Wingspan;

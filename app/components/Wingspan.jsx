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
import { brownPowerContinueBtnAtom } from "../utils/jotaiStore";

const Wingspan = () => {
  const [browncontinue] = useAtom(brownPowerContinueBtnAtom);
  return (
    <div className="grid grid-cols-12 p-5 gap-5">
      <PlayerBirdHand />

      <BirdTray />
      <BirdDeck />

      <SelectedBirds />
      <BirdFeeder />
      <PlayerFoodSupply />
      <SelectedFood />
      <FoodSupply />
      <HabitatMat />
    </div>
  );
};

export default Wingspan;

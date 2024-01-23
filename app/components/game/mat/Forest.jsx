import { useAtom } from "jotai";
import {
  disableClickAtom,
  playBirdAtom,
  playerBirdHandAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";
import { eggReqCheck } from "../../../utils/gameFunctions/playABirdFunctions";
import {
  continueBrownPower,
  moveBird,
} from "../../../utils/gameFunctions/birdPowerFunctions";
import { moveBirdDestination } from "../../../utils/gameFunctions/brownPowerHelperFunctions";

const Forest = ({ moveBirdSupply, brownBirdSupply }) => {
  const [disableClick] = useAtom(disableClickAtom);
  const disableForest = disableClick.habitats;

  const [, setPlayBird] = useAtom(playBirdAtom);

  const [birdHand] = useAtom(playerBirdHandAtom);

  const forestClick = () => {
    if (!disableForest) {
      if (brownBirdSupply.currentAction === "playBird") {
        eggReqCheck(
          moveBirdSupply.forestBirdCount,
          brownBirdSupply.setDisableClick,
          brownBirdSupply.playerEggs,
          brownBirdSupply.setCurrentActionText,
          setPlayBird,
          "forest",
          birdHand,
          brownBirdSupply.playerFood,
          brownBirdSupply.setResourceQuantity
        );
      } else if (brownBirdSupply.currentAction === "brownMove") {
        if (brownBirdSupply.brownBirdCopy.location == "forest") {
          brownBirdSupply.setCurrentActionText(
            "Bird must move to a different location."
          );
          return;
        } else {
          moveBirdDestination(
            brownBirdSupply.setForest,
            moveBirdSupply.forestBirdCount,
            moveBirdSupply.setForestBrownBirds,
            moveBirdSupply.setForestBirdCount,
            brownBirdSupply
          );
          moveBird(brownBirdSupply, moveBirdSupply);
          continueBrownPower(brownBirdSupply);
        }
      } else {
        activateHabitat(
          brownBirdSupply.setCurrentAction,
          "forest",
          moveBirdSupply.forestBirdCount,
          brownBirdSupply.setResourceQuantity,
          brownBirdSupply.setDisableClick
        );
      }
    }
  };

  return (
    <div
      className="bg-emerald-700 p-5 rounded-lg text-white font-semibold text-2xl row-start-3 row-span-2 flex flex-col gap-5 items-center justify-center text-center"
      onClick={forestClick}
    >
      <p>Forest</p>
      <p className="font-normal text-lg">Gain food from birdfeeder</p>
    </div>
  );
};

export default Forest;

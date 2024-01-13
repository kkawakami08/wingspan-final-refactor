import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
  wetlandBirdCountAtom,
  playBirdAtom,
  playerEggSupplyAtom,
  playerBirdHandAtom,
  playerFoodSupplyAtom,
  currentActionTextAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";
import { eggReqCheck } from "../../../utils/gameFunctions/playABirdFunctions";
import { moveBirdDestination } from "../../../utils/gameFunctions/brownPowerHelperFunctions";
import {
  continueBrownPower,
  moveBird,
} from "../../../utils/gameFunctions/birdPowerFunctions";

const Wetland = ({ moveBirdSupply, brownBirdSupply }) => {
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableWetland = disableClick.habitats;

  const [, setPlayBird] = useAtom(playBirdAtom);

  const [birdHand] = useAtom(playerBirdHandAtom);

  const wetlandClick = () => {
    if (disableWetland) console.log("Disabled");
    else {
      if (brownBirdSupply.currentAction === "playBird") {
        eggReqCheck(
          moveBirdSupply.wetlandBirdCount,
          brownBirdSupply.setDisableClick,
          brownBirdSupply.playerEggs,
          brownBirdSupply.setCurrentActionText,
          setPlayBird,
          "wetland",
          birdHand,
          brownBirdSupply.playerFood,
          brownBirdSupply.setResourceQuantity
        );
      } else if (brownBirdSupply.currentAction === "brownMove") {
        if (brownBirdSupply.brownBirdCopy.location == "grassland") {
          brownBirdSupply.setCurrentActionText(
            "Bird must move to a different location."
          );
          return;
        } else {
          moveBirdDestination(
            brownBirdSupply.setWetland,
            moveBirdSupply.wetlandBirdCount,
            moveBirdSupply.setWetlandBrownBirds,
            moveBirdSupply.setWetlandBirdCount,
            brownBirdSupply
          );
          moveBird(brownBirdSupply, moveBirdSupply);
          continueBrownPower(brownBirdSupply);
        }
      } else {
        activateHabitat(
          brownBirdSupply.setCurrentAction,
          "wetland",
          moveBirdSupply.wetlandBirdCount,
          brownBirdSupply.setResourceQuantity,
          brownBirdSupply.setDisableClick
        );
      }
    }
  };

  return (
    <div
      className="bg-blue-700 p-5 rounded-lg text-white font-semibold text-2xl row-start-7 row-span-2 flex flex-col gap-5 items-center justify-center text-center"
      onClick={wetlandClick}
    >
      <p>Wetland</p>
      <p className="font-normal text-lg">Draw a bird card</p>
    </div>
  );
};

export default Wetland;

import { useAtom } from "jotai";
import {
  disableClickAtom,
  playBirdAtom,
  playerBirdHandAtom,
  grasslandBrownBirdsAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";
import DiscardEggs from "../individual/buttons/DiscardEggs";
import { eggReqCheck } from "../../../utils/gameFunctions/playABirdFunctions";
import { checkBirdEggCapacity } from "../../../utils/gameFunctions/grasslandFunctions";
import {
  activateBrownPowers,
  continueBrownPower,
  moveBird,
} from "../../../utils/gameFunctions/birdPowerFunctions";
import { moveBirdDestination } from "../../../utils/gameFunctions/brownPowerHelperFunctions";

const Grassland = ({ brownBirdSupply, moveBirdSupply }) => {
  const [disableClick] = useAtom(disableClickAtom);
  const disableGrassland = disableClick.habitats;

  const [, setPlayBird] = useAtom(playBirdAtom);
  const [birdHand] = useAtom(playerBirdHandAtom);

  const [grasslandBrownBirds] = useAtom(grasslandBrownBirdsAtom);

  const grasslandClick = () => {
    if (!disableGrassland) {
      if (brownBirdSupply.currentAction === "playBird") {
        eggReqCheck(
          moveBirdSupply.grasslandBirdCount,
          brownBirdSupply.setDisableClick,
          brownBirdSupply.playerEggs,
          brownBirdSupply.setCurrentActionText,
          setPlayBird,
          "grassland",
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
            brownBirdSupply.setGrassland,
            moveBirdSupply.grasslandBirdCount,
            moveBirdSupply.setGrasslandBrownBirds,
            moveBirdSupply.setGrasslandBirdCount,
            brownBirdSupply
          );
          moveBird(brownBirdSupply, moveBirdSupply);
          continueBrownPower(brownBirdSupply);
        }
      } else {
        if (
          checkBirdEggCapacity(
            brownBirdSupply.forest,
            brownBirdSupply.grassland,
            brownBirdSupply.wetland
          )
        ) {
          brownBirdSupply.setCurrentActionText(
            "There are no birds to lay eggs. Continuing with brown birds"
          );

          if (grasslandBrownBirds.length) {
            brownBirdSupply.setBrownBirdCopy((state) => ({
              ...state,
              location: "grassland",
            }));
            activateBrownPowers(
              brownBirdSupply.grassland,
              grasslandBrownBirds,

              brownBirdSupply
            );
          }
        } else {
          activateHabitat(
            brownBirdSupply.setCurrentAction,
            "grassland",
            moveBirdSupply.grasslandBirdCount,
            brownBirdSupply.setResourceQuantity,
            brownBirdSupply.setDisableClick
          );
        }
      }
    }
  };

  return (
    <div
      className="bg-amber-700 p-5 rounded-lg text-white font-semibold text-2xl row-start-5 row-span-2 flex flex-col gap-5 items-center justify-center text-center"
      onClick={grasslandClick}
    >
      <p>Grassland</p>
      <p className="font-normal text-lg">Lay eggs</p>
      {(brownBirdSupply.currentAction === "grassland" ||
        brownBirdSupply.currentAction === "brownEgg" ||
        brownBirdSupply.currentAction === "brownNest" ||
        brownBirdSupply.currentAction === "whiteNest") && (
        <DiscardEggs brownBirdSupply={brownBirdSupply} />
      )}
    </div>
  );
};

export default Grassland;

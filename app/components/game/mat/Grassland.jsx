import { useAtom } from "jotai";
import {
  disableClickAtom,
  grasslandBirdCountAtom,
  playBirdAtom,
  playerBirdHandAtom,
  playerFoodSupplyAtom,
  grasslandBrownBirdsAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";
import DiscardEggs from "../individual/buttons/DiscardEggs";
import { eggReqCheck } from "../../../utils/gameFunctions/playABirdFunctions";
import { checkBirdEggCapacity } from "../../../utils/gameFunctions/grasslandFunctions";
import { activateBrownPowers } from "../../../utils/gameFunctions/birdPowerFunctions";

const Grassland = ({ brownBirdSupply }) => {
  const [disableClick] = useAtom(disableClickAtom);
  const disableGrassland = disableClick.habitats;

  const [, setPlayBird] = useAtom(playBirdAtom);
  const [birdHand] = useAtom(playerBirdHandAtom);
  const [playerFood] = useAtom(playerFoodSupplyAtom);

  const [grasslandBrownBirds] = useAtom(grasslandBrownBirdsAtom);
  const [grasslandBirdCount] = useAtom(grasslandBirdCountAtom);

  const grasslandClick = () => {
    if (disableGrassland) console.log("Disabled");
    else {
      if (brownBirdSupply.currentAction === "playBird") {
        eggReqCheck(
          grasslandBirdCount,
          brownBirdSupply.setDisableClick,
          brownBirdSupply.playerEggs,
          brownBirdSupply.setCurrentActionText,
          setPlayBird,
          "grassland",
          birdHand,
          playerFood,
          brownBirdSupply.setResourceQuantity
        );
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
            grasslandBirdCount,
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
        brownBirdSupply.currentAction === "brownNest") && (
        <DiscardEggs brownBirdSupply={brownBirdSupply} />
      )}
    </div>
  );
};

export default Grassland;

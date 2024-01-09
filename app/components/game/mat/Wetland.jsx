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

const Wetland = () => {
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);

  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableWetland = disableClick.habitats;

  const [wetlandBirdCount] = useAtom(wetlandBirdCountAtom);

  const [, setPlayBird] = useAtom(playBirdAtom);

  const [playerEggs] = useAtom(playerEggSupplyAtom);
  const [birdHand] = useAtom(playerBirdHandAtom);
  const [playerFood] = useAtom(playerFoodSupplyAtom);

  const wetlandClick = () => {
    if (disableWetland) console.log("Disabled");
    else {
      if (currentAction === "playBird") {
        eggReqCheck(
          wetlandBirdCount,
          setDisableClick,
          playerEggs,
          setCurrentActionText,
          setPlayBird,
          "wetland",
          birdHand,
          playerFood,
          setResourceQuantity
        );
      } else {
        activateHabitat(
          setCurrentAction,
          "wetland",
          wetlandBirdCount,
          setResourceQuantity,
          setDisableClick
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

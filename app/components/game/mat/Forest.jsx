import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
  forestBirdCountAtom,
  playBirdAtom,
  playerEggSupplyAtom,
  playerBirdHandAtom,
  playerFoodSupplyAtom,
  currentActionTextAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";
import { eggReqCheck } from "../../../utils/gameFunctions/playABirdFunctions";

const Forest = () => {
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);

  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableForest = disableClick.habitats;

  const [forestBirdCount] = useAtom(forestBirdCountAtom);

  const [, setPlayBird] = useAtom(playBirdAtom);

  const [playerEggs, setPlayerEggs] = useAtom(playerEggSupplyAtom);
  const [birdHand] = useAtom(playerBirdHandAtom);
  const [playerFood] = useAtom(playerFoodSupplyAtom);

  const forestClick = () => {
    if (disableForest) console.log("Disabled");
    else {
      if (currentAction === "playBird") {
        eggReqCheck(
          forestBirdCount,
          setDisableClick,
          playerEggs,
          setCurrentActionText,
          setPlayBird,
          "forest",
          birdHand,
          playerFood,
          setResourceQuantity
        );
      } else {
        activateHabitat(
          setCurrentAction,
          "forest",
          forestBirdCount,
          setResourceQuantity,
          setDisableClick
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

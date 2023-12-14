import { useAtom } from "jotai";
import {
  currentActionAtom,
  disableClickAtom,
  resourceQuantityAtom,
  forestBirdCountAtom,
  grasslandBirdCountAtom,
  wetlandBirdCountAtom,
  playerEggSupplyAtom,
  playerBirdHandAtom,
  playerFoodSupplyAtom,
  playBirdAtom,
} from "../../../utils/jotaiStore";
import { checkFoodSupply } from "../../../utils/gameFunctions/playABirdFunctions";

const PlayABird = () => {
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableHabitat = disableClick.habitats;

  const [forestBirdCount] = useAtom(forestBirdCountAtom);
  const [wetlandBirdCount] = useAtom(wetlandBirdCountAtom);
  const [grasslandBirdCount] = useAtom(grasslandBirdCountAtom);
  const [playerEggCount] = useAtom(playerEggSupplyAtom);
  const [birdHand] = useAtom(playerBirdHandAtom);
  const [playerFood] = useAtom(playerFoodSupplyAtom);

  const [, setPlayBird] = useAtom(playBirdAtom);

  const playABirdClick = () => {
    if (disableHabitat) console.log("Disabled");
    else {
      if (!checkFoodSupply(birdHand, playerFood)) {
        setPlayBird((state) => {
          state.playable = false;
        });
      } else {
        setCurrentAction("playBird");
      }
    }
  };

  return (
    <div
      className="bg-violet-700 py-5 rounded-lg text-white font-semibold text-2xl flex flex-col gap-5 items-center justify-center text-center row-start-2 row-span-1 place-self-end w-full h-full"
      onClick={playABirdClick}
    >
      <p>Play a Bird</p>
    </div>
  );
};

export default PlayABird;

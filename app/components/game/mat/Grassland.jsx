import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
  grasslandBirdCountAtom,
  totalBirdCountAtom,
  grasslandPlayableAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";
import DiscardEggs from "../individual/buttons/DiscardEggs";

const Grassland = () => {
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableGrassland = disableClick.habitats;
  const [grasslandBirdCount] = useAtom(grasslandBirdCountAtom);
  const [totalBirdCount] = useAtom(totalBirdCountAtom);
  const [, setGrassLandPlayable] = useAtom(grasslandPlayableAtom);

  const grasslandClick = () => {
    if (disableGrassland) console.log("Disabled");
    else {
      if (totalBirdCount) {
        activateHabitat(
          setCurrentAction,
          "grassland",
          grasslandBirdCount,
          setResourceQuantity,
          setDisableClick
        );
      } else {
        setGrassLandPlayable(false);
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
      {currentAction === "grassland" && <DiscardEggs />}
    </div>
  );
};

export default Grassland;

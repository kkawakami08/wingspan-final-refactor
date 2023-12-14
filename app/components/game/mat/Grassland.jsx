import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";

const Grassland = () => {
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableGrassland = disableClick.habitats;

  const grasslandClick = () => {
    if (disableGrassland) console.log("Disabled");
    else {
      activateHabitat(
        setCurrentAction,
        "grassland",
        setResourceQuantity,
        setDisableClick
      );
    }
  };

  return (
    <div
      className="bg-neutral-600 p-5 rounded-lg text-white font-semibold text-lg col-start-1 row-span-2"
      onClick={grasslandClick}
    >
      <p>Grassland</p>
    </div>
  );
};

export default Grassland;

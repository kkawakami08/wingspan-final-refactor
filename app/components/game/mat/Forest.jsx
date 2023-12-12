import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";

const Forest = () => {
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableForest = disableClick.habitats;

  const forestClick = () => {
    if (disableForest) console.log("Disabled");
    else {
      activateHabitat(
        setCurrentAction,
        "forest",
        setResourceQuantity,
        setDisableClick
      );
    }
  };

  return (
    <div
      className="bg-neutral-600 p-5 rounded-lg text-white font-semibold text-lg"
      onClick={forestClick}
    >
      <p>Forest</p>
    </div>
  );
};

export default Forest;

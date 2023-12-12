import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";

const Wetland = () => {
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableWetland = disableClick.habitats;

  const wetlandClick = () => {
    if (disableWetland) console.log("Disabled");
    else {
      activateHabitat(
        setCurrentAction,
        "wetland",
        setResourceQuantity,
        setDisableClick
      );
    }
  };

  return (
    <div
      className="bg-neutral-600 p-5 rounded-lg text-white font-semibold text-lg"
      onClick={wetlandClick}
    >
      <p>wetland</p>
    </div>
  );
};

export default Wetland;

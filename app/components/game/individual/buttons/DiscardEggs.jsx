import { useAtom } from "jotai";
import {
  resourceQuantityAtom,
  disableClickAtom,
  currentActionAtom,
  currentActionTextAtom,
} from "../../../../utils/jotaiStore";
import { resetFromGrassland } from "../../../../utils/gameFunctions/grasslandFunctions";

const DiscardEggs = () => {
  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);

  const discardEggsClick = () => {
    resetFromGrassland(setDisableClick, setCurrentAction, setCurrentActionText);
    setResourceQuantity(0);
  };

  return (
    <button
      className="bg-amber-300 text-amber-900 text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300 border-2 rounded-lg"
      onClick={discardEggsClick}
    >
      Discard remaining {resourceQuantity} eggs
    </button>
  );
};

export default DiscardEggs;

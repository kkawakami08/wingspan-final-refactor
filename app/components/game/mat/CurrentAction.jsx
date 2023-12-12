import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
} from "../../../utils/jotaiStore";

const CurrentAction = () => {
  const [currentAction] = useAtom(currentActionAtom);
  const [resourceQuantity] = useAtom(resourceQuantityAtom);

  let resource = "";
  switch (currentAction) {
    case "forest":
      resource = resourceQuantity == 1 ? "die" : "dice";
      break;
    case "grassland":
      resource = resourceQuantity == 1 ? "egg" : "eggs";
      break;
    case "wetland":
      resource = resourceQuantity == 1 ? "card" : "cards";
      break;
  }

  return (
    <div className=" text-2xl font-bold text-center flex items-center justify-center">
      {currentAction ? (
        <div>
          <p>The current action is {currentAction}</p>
          <p className="text-lg font-semibold">
            Can gain {resourceQuantity} {resource}
          </p>
        </div>
      ) : (
        <p>Select an action</p>
      )}
    </div>
  );
};

export default CurrentAction;

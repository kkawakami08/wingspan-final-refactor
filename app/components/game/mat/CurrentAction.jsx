import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
  currentActionTextAtom,
} from "../../../utils/jotaiStore";

const CurrentAction = () => {
  const [currentAction] = useAtom(currentActionAtom);
  const [resourceQuantity] = useAtom(resourceQuantityAtom);

  const [disableClick] = useAtom(disableClickAtom);
  const [CurrentActionText] = useAtom(currentActionTextAtom);

  let resource = "";
  let discardResource = "";
  let canDiscard = false;

  switch (currentAction) {
    case "forest":
      resource = resourceQuantity == 1 ? "die" : "dice";
      if (!disableClick.birdHand) {
        canDiscard = true;
        discardResource = "a card";
      }
      break;
    case "grassland":
      resource = "eggs";
      if (!disableClick.playerFood) {
        canDiscard = true;
        discardResource = "a food token";
      }
      break;
    case "wetland":
      resource = resourceQuantity == 1 ? "card" : "cards";
      if (!disableClick.playedBird) {
        canDiscard = true;
        discardResource = "an egg";
      }
      break;
  }
  return (
    <div className=" text-2xl font-bold text-center flex items-center justify-center">
      {currentAction === "wetland" ||
      currentAction === "forest" ||
      currentAction === "grassland" ? (
        <p>
          Gain {resourceQuantity} {resource}.{" "}
          {canDiscard && (
            <span>Can discard {discardResource} for an extra resource</span>
          )}
        </p>
      ) : (
        <p>{CurrentActionText}</p>
      )}
    </div>
  );
};

export default CurrentAction;

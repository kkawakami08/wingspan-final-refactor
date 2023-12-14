import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
  playBirdAtom,
} from "../../../utils/jotaiStore";
import PlayABirdText from "../individual/habitat/PlayABirdText";

const CurrentAction = () => {
  const [currentAction] = useAtom(currentActionAtom);
  const [resourceQuantity] = useAtom(resourceQuantityAtom);

  const [disableClick] = useAtom(disableClickAtom);

  const [playBirdState] = useAtom(playBirdAtom);

  let resource = "";
  let discardResource = "";
  let canDiscard = false;

  switch (currentAction) {
    case "forest":
      resource = resourceQuantity == 1 ? "die " : "dice ";
      if (!disableClick.birdHand) {
        canDiscard = true;
        discardResource = "a card";
      }
      break;
    case "grassland":
      resource = resourceQuantity == 1 ? "egg " : "eggs ";
      if (!disableClick.playerFood) {
        canDiscard = true;
        discardResource = "a food token";
      }
      break;
    case "wetland":
      resource = resourceQuantity == 1 ? "card " : "cards ";
      if (!disableClick.playerEggs) {
        canDiscard = true;
        discardResource = "an egg";
      }
      break;
  }

  return (
    <div className=" text-2xl font-bold text-center flex items-center justify-center">
      {currentAction ? (
        currentAction === "playBird" ? (
          <PlayABirdText />
        ) : (
          <div>
            <p>
              Can gain {resourceQuantity} {resource}
              {canDiscard && (
                <span className="text-lg font-semibold">
                  and discard {discardResource} to gain extra resource
                </span>
              )}
            </p>
          </div>
        )
      ) : playBirdState.playable ? (
        <p>Select an action</p>
      ) : (
        <p>Cannot play a bird. Select a different action.</p>
      )}
    </div>
  );
};

export default CurrentAction;

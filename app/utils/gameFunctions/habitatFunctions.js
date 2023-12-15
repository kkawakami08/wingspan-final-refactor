import {
  forestDisableOptions,
  wetlandDisableOptions,
  grasslandDisableOptions,
} from "../jotaiStore";
import { initialDisableClick, initialPlayBird } from "../jotaiStore";

export const activateHabitat = (
  setCurrentAction,
  location,
  birdCount,
  setResourceQuantity,
  setDisableClick,
  setCurrentActionText
) => {
  let disableOptions;
  let discardOptions;
  let resourceQuantity = 1;

  switch (location) {
    case "forest":
      disableOptions = forestDisableOptions;
      discardOptions = { birdHand: false };
      break;
    case "wetland":
      disableOptions = wetlandDisableOptions;
      discardOptions = { playerEggs: false };
      break;
    case "grassland":
      resourceQuantity = 2;
      disableOptions = grasslandDisableOptions;
      discardOptions = { playerFood: false };
      break;
  }

  if (birdCount <= 1) {
    setResourceQuantity(resourceQuantity);
  } else if (birdCount >= 2 && birdCount <= 3) {
    setResourceQuantity(resourceQuantity + 1);
  } else {
    setResourceQuantity(resourceQuantity + 3);
  }

  if (birdCount % 2 !== 0) {
    console.log("can discard for extra resource");
    setDisableClick((state) => ({
      ...state,
      ...discardOptions,
    }));
  }

  setCurrentAction(location);

  setDisableClick((state) => ({
    ...state,
    habitats: true,
    ...disableOptions,
  }));
};

export const resetAction = (
  setDisableClick,
  setResourceQuantity,
  setCurrentAction,
  setPlayBirdState,
  setCurrentActionText
) => {
  setDisableClick(initialDisableClick);
  setResourceQuantity(0);
  setCurrentAction("");
  setPlayBirdState((state) => {
    state = initialPlayBird;
    return state;
  });
  setCurrentActionText("Select an action");
};

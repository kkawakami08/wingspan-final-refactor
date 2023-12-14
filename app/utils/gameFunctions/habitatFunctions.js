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
  setDisableClick
) => {
  let disableOptions;
  let discardOptions;
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
      disableOptions = grasslandDisableOptions;
      discardOptions = { playerFood: false };
      break;
  }

  if (birdCount <= 1) {
    setResourceQuantity(1);
  } else if (birdCount >= 2 && birdCount <= 3) {
    setResourceQuantity(2);
  } else {
    setResourceQuantity(3);
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
  setPlayBirdState
) => {
  setDisableClick(initialDisableClick);
  setResourceQuantity(0);
  setCurrentAction("");
  setPlayBirdState((state) => {
    state = initialPlayBird;
    return state;
  });
};

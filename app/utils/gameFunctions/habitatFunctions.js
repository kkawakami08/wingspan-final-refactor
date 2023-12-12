import {
  forestDisableOptions,
  wetlandDisableOptions,
  grasslandDisableOptions,
} from "../jotaiStore";
import { initialDisableClick } from "../jotaiStore";

export const activateHabitat = (
  setCurrentAction,
  location,
  setResourceQuantity,
  setDisableClick
) => {
  let disableOptions;
  switch (location) {
    case "forest":
      disableOptions = forestDisableOptions;
      break;
    case "wetland":
      disableOptions = wetlandDisableOptions;
      break;
    case "grassland":
      disableOptions = grasslandDisableOptions;
      break;
  }
  setCurrentAction(location);

  setResourceQuantity((resource) => resource + 1);
  setDisableClick((state) => ({
    ...state,
    habitats: true,
    ...disableOptions,
  }));
};

export const resetAction = (
  setDisableClick,
  setResourceQuantity,
  setCurrentAction
) => {
  setDisableClick(initialDisableClick);
  setResourceQuantity(0);
  setCurrentAction("");
};

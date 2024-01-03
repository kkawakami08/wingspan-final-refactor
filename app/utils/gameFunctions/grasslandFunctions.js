import { initialDisableClick } from "../jotaiStore";

export const layEgg = (
  setHabitat,
  space,
  setResourceQuantity,
  setPlayerEggs
) => {
  setHabitat((habitat) => {
    habitat[space].eggCount = habitat[space].eggCount + 1;
  });
  setPlayerEggs((eggs) => eggs + 1);
  setResourceQuantity((amount) => amount - 1);
};

export const resetFromGrassland = (
  setDisableClick,

  setCurrentAction,
  setCurrentActionText
) => {
  setDisableClick(initialDisableClick);
  setCurrentActionText("Select an action");
  setCurrentAction("");
};

export const checkBirdEggCapacity = (forest, grassland, wetland) => {
  for (const space in forest) {
    if (!forest[space].bird) break;
    else {
      if (forest[space].eggCount < forest[space].bird.egg_limit) {
        return false;
      }
    }
  }
  for (const space in grassland) {
    if (!grassland[space].bird) break;
    else {
      if (grassland[space].eggCount < grassland[space].bird.egg_limit) {
        return false;
      }
    }
  }
  for (const space in wetland) {
    if (!wetland[space].bird) break;
    else {
      if (wetland[space].eggCount < wetland[space].bird.egg_limit) {
        return false;
      }
    }
  }
  return true;
};

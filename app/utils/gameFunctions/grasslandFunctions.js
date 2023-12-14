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

  setCurrentAction
) => {
  setDisableClick(initialDisableClick);

  setCurrentAction("");
};

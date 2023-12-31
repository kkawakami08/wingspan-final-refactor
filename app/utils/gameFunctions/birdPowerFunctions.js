import { enableRolling } from "./birdFeederFunctions";
import { resetAction } from "./habitatFunctions";
import {
  power1,
  power2,
  power3_4,
  power6_8,
  power9,
  power10,
  power13,
  power12,
  power17,
} from "./brownPowerFunctions";
import { initialDisableClick } from "../jotaiStore";
import { checkOtherEggs } from "./brownPowerHelperFunctions";

const birdFeederPowers = [1, 3, 4, 13];
const foodPowers = [6, 8, 9, 10];
const cachePowers = [12];

export const activateBrownPowers = (
  habitat,
  habitatBrownBirds,
  brownBirdSupply
) => {
  resetBrownPower(
    brownBirdSupply.setResourceQuantity,
    brownBirdSupply.setBrownBirdVariable,
    brownBirdSupply.setDisableClick
  );
  let tempCopy = [...habitatBrownBirds];

  while (tempCopy.length) {
    let lastSpace = tempCopy.pop();
    //if false, do stuff, come back around to same bird
    const continuePower = brownPowerCheck(
      habitat[lastSpace],
      lastSpace,
      brownBirdSupply
    );
    if (continuePower) {
      console.log("power was true");
      brownBirdSupply.setBrownBirdCopy((state) => ({
        ...state,
        copy: tempCopy,
      }));
      return;
    } else if (continuePower === undefined) {
      brownBirdSupply.setBrownBirdCopy((state) => ({
        ...state,
        copy: [...habitatBrownBirds],
        sameBird: true,
      }));

      return;
    } // continuePower = false -> continues to next brown Power bird
  }
  brownBirdSupply.setBrownPowerContinueBtn(false);
  resetAction(
    brownBirdSupply.setDisableClick,
    brownBirdSupply.setResourceQuantity,
    brownBirdSupply.setCurrentAction,
    brownBirdSupply.setCurrentActionText
  );
  //stops looping after all brown birds are checked
};

export const brownPowerCheck = (currentSpace, space, brownBirdSupply) => {
  console.log(`Checking ${currentSpace.bird.common_name}'s brown power`);

  if (birdFeederPowers.includes(currentSpace.bird.power.id)) {
    brownBirdSupply.setCurrentAction("brownFeeder");
    if (
      enableRolling(brownBirdSupply.birdFeeder) &&
      !brownBirdSupply.brownBirdCopy.sameBird
    ) {
      brownBirdSupply.setCurrentActionText(
        "do you want to roll the birdFeeder before checking this birds power?"
      );
      brownBirdSupply.setBrownBirdCopy((state) => ({
        ...state,
        dialog: "roll",
      }));
      brownBirdSupply.setBrownPowerContinueBtn(true);
      return;
    }
  }
  if (foodPowers.includes(currentSpace.bird.power.id)) {
    brownBirdSupply.setCurrentAction("brownFood");
  }
  brownBirdSupply.setBrownBirdCopy((state) => ({
    ...state,
    sameBird: false,
  }));
  switch (currentSpace.bird.power.id) {
    case 1:
      console.log("checking power 1");
      return power1(
        currentSpace.bird.power.variable,
        brownBirdSupply.birdFeeder,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable
      );
    case 2:
      console.log("checking power 2");
      return power2(
        currentSpace.bird.power.variable,
        brownBirdSupply.birdFeeder,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable
      );
    case 3:
      console.log("checking power 3");
      return power3_4(
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable
      );
    case 4:
      console.log("checking power 4");
      return power3_4(
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable
      );
    case 6:
      console.log("checking power 6");
      return power6_8(
        currentSpace.bird.power.variable,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable
      );
    case 8:
      console.log("checking power 8");
      return power6_8(
        currentSpace.bird.power.variable,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable
      );
    case 9:
      console.log("checking power 9");
      return power9(
        brownBirdCopy.sameBird,
        brownBirdSupply.setDisableClick,

        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdVariable
      );
    case 10:
      console.log("checking power 10");
      if (checkOtherEggs(playerEggs, currentSpace.eggCount)) {
        return power10(
          brownBirdCopy.sameBird,
          currentSpace.bird.power.variable,
          space,

          brownBirdSupply.setDisableClick,
          brownBirdSupply.setBrownBirdCopy,
          brownBirdSupply.setResourceQuantity,
          brownBirdSupply.setCurrentActionText,
          brownBirdSupply.setBrownBirdVariable
        );
      } else return false;
    case 12:
      console.log("checking power 12");
      setCurrentAction("brownCache");
      return power12(
        space,
        brownBirdSupply.setDisableClick,

        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setBrownBirdCopy
      );

    case 13:
      console.log("checking power 13");
      return power13(
        space,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setBrownPowerContinueBtn,
        brownBirdSupply.setBrownBirdCopy,
        brownBirdSupply.birdFeeder,

        brownBirdSupply.setSelectedFood
      );
    case 17:
      setCurrentAction("brownEgg");
      console.log("checking power 17");
      return power17(
        currentSpace.bird.power.variable,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText
      );
    default:
      console.log("default case");
      return false;
  }
};

export const resetBrownPower = (
  setResourceQuantity,
  setBrownBirdVariable,
  setDisableClick
) => {
  setResourceQuantity(0);
  setBrownBirdVariable("");
  setDisableClick((state) => ({
    ...initialDisableClick,

    habitats: true,
  }));
};

export const continueBrownPower = (brownBirdSupply) => {
  if (brownBirdSupply.brownBirdCopy.copy.length) {
    switch (brownBirdSupply.brownBirdCopy.location) {
      case "forest":
        brownBirdSupply.setBrownBirdCopy((state) => ({
          ...state,
          dialog: "",
        }));
        activateBrownPowers(
          brownBirdSupply.forest,
          brownBirdSupply.brownBirdCopy.copy,

          brownBirdSupply
        );
        return;
    }
  } else {
    resetAction(
      brownBirdSupply.setDisableClick,
      brownBirdSupply.setResourceQuantity,
      brownBirdSupply.setCurrentAction,

      brownBirdSupply.setCurrentActionText
    );
    return;
  }
};

export const cacheToken = (
  brownBirdCopy,
  setForest,
  setGrassland,
  setWetland,
  setSelectedFood
) => {
  switch (brownBirdCopy.location) {
    case "forest":
      setForest((forest) => {
        forest[brownBirdCopy.currentSpace].cacheCount += 1;
        return forest;
      });
      setSelectedFood([]);
    default:
      break;
  }
};

import { enableRolling } from "./birdFeederFunctions";
import { resetAction } from "./habitatFunctions";
import {
  power1,
  power3_4,
  power6_8,
  power9,
  power10,
  power13,
  power12,
  power17,
  power18,
  power19,
  power22,
  power23,
  power24,
  power20_25_26,
  power30,
  power31,
  power32,
  power33,
  power34,
  power35,
  power36_37,
  power38,
  power39,
} from "./brownPowerFunctions";
import {
  power16,
  power2,
  power21,
  power27,
  power28,
  power42,
  power7,
} from "./whitePowerFunctions";
import { initialDisableClick } from "../jotaiStore";
import { checkOtherEggs, moveBirdSource } from "./brownPowerHelperFunctions";

const birdFeederPowers = [1, 2, 3, 4, 13];
const foodPowers = [6, 7, 8, 9, 10];
const cachePowers = [12, 36, 37];
const eggPowers = [18, 19];
const cardPowers = [20, 21, 22, 23, 24, 25, 26, 28, 41];
const nestPowers = [16, 17];

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
    const continuePower = brownPowerCheck(habitat, lastSpace, brownBirdSupply);
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

export const currentActionNamer = (powerID, powerColor, brownBirdSupply) => {
  if (birdFeederPowers.includes(powerID)) {
    let enableRoll = enableRolling(brownBirdSupply.birdFeeder);
    brownBirdSupply.setCurrentAction(`${powerColor}Feeder`);
    if (powerColor === "brown") {
      enableRoll = enableRoll && !brownBirdSupply.brownBirdCopy.sameBird;
    }
    if (enableRoll) {
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
  if (foodPowers.includes(powerID)) {
    brownBirdSupply.setCurrentAction(`${powerColor}Food`);
  }
  if (cachePowers.includes(powerID)) {
    brownBirdSupply.setCurrentAction(`${powerColor}Cache`);
  }
  if (eggPowers.includes(powerID)) {
    brownBirdSupply.setCurrentAction(`${powerColor}Egg`);
  }
  if (cardPowers.includes(powerID)) {
    brownBirdSupply.setCurrentAction(`${powerColor}Card`);
  }
  if (nestPowers.includes(powerID)) {
    brownBirdSupply.setCurrentAction(`${powerColor}Nest`);
  }
};

export const whitePowerCheck = (
  playedBirdState,
  brownBirdSupply,
  moveBirdSupply,
  birdDeck,
  birdHand
) => {
  console.log(`Checking ${playedBirdState.bird.common_name}'s white power`);

  currentActionNamer(
    playedBirdState.bird.power.id,
    playedBirdState.bird.power.color,
    brownBirdSupply
  );
  switch (playedBirdState.bird.power.id) {
    case 2:
      console.log("checking power 2");
      return power2(
        playedBirdState.bird.power.variable,
        brownBirdSupply.birdFeeder,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable
      );
    case 7:
      console.log("checking power 7");
      return power7(
        playedBirdState.bird.power.variable,

        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable
      );
    case 16:
      console.log("checking power 16");
      return power16(brownBirdSupply, playedBirdState.bird.power.variable);
    case 21:
      console.log("checking power 21");
      return power21(
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setDisableClick
      );
    case 27:
      console.log("checking power 27");
      brownBirdSupply.setCurrentAction("whiteSelect");
      return power27(
        birdDeck,
        brownBirdSupply.setSelectedCards,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setResourceQuantity
      );
    case 28:
      console.log("checking power 28");
      return power28(
        brownBirdSupply.setDisableClick,

        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentActionText
      );
    case 42:
      console.log("checking power 42");
      return power42(
        playedBirdState.habitat,
        brownBirdSupply,
        moveBirdSupply,
        birdHand
      );
  }
};

export const brownPowerCheck = (habitat, space, brownBirdSupply) => {
  const currentSpace = habitat[space];
  console.log(`Checking ${currentSpace.bird.common_name}'s brown power`);

  currentActionNamer(
    currentSpace.bird.power.id,
    currentSpace.bird.power.color,
    brownBirdSupply
  );
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
        brownBirdSupply.brownBirdCopy.sameBird,
        brownBirdSupply.setDisableClick,

        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdVariable
      );
    case 10:
      console.log("checking power 10");
      if (checkOtherEggs(playerEggs, currentSpace.eggCount)) {
        return power10(
          brownBirdSupply.brownBirdCopy.sameBird,
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
      console.log("checking power 17");
      return power17(
        currentSpace.bird.power.variable,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText
      );
    case 18:
      console.log("checking power 18");
      return power18(
        brownBirdSupply.setResourceQuantity,

        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText
      );
    case 19:
      console.log("checking power 19");
      return power19(
        space,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setBrownBirdCopy,

        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText
      );
    case 20:
      console.log("checking power 20");
      return power20_25_26(
        brownBirdSupply.setResourceQuantity,

        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText
      );
    case 22:
      console.log("checking power 22");
      return power22(
        brownBirdSupply.setResourceQuantity,

        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdCopy,
        brownBirdSupply.setBrownPowerContinueBtn
      );
    case 23:
      console.log("checking power 23");
      return power23(
        brownBirdSupply.setResourceQuantity,

        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdCopy,
        brownBirdSupply.setBrownPowerContinueBtn
      );
    case 24:
      console.log("checking power 24");
      return power24(
        brownBirdSupply.brownBirdCopy.sameBird,
        brownBirdSupply.playerEggs,
        brownBirdSupply.setResourceQuantity,

        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setDisableClick
      );
    case 25:
      console.log("checking power 25");
      return power20_25_26(
        brownBirdSupply.setResourceQuantity,

        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText
      );
    case 26:
      console.log("checking power 26");
      return power20_25_26(
        brownBirdSupply.setResourceQuantity,

        brownBirdSupply.setDisableClick,
        brownBirdSupply.setCurrentActionText
      );
    case 30:
      console.log("checking power 30");
      return power30(
        currentSpace.eggCount,
        currentSpace.bird.egg_limit,
        brownBirdSupply.brownBirdCopy.sameBird,
        space,
        brownBirdSupply.setBrownPowerContinueBtn,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdCopy,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setCurrentAction,
        brownBirdSupply.setDisableClick
      );
    case 31:
      console.log("checking power 31");
      return power31(
        brownBirdSupply.brownBirdCopy.sameBird,
        space,
        brownBirdSupply.setBrownPowerContinueBtn,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdCopy,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setCurrentAction,
        brownBirdSupply.setDisableClick
      );
    case 32:
      console.log("checking power 32");
      return power32(
        currentSpace.bird.power.variable,
        brownBirdSupply.brownBirdCopy.sameBird,
        space,
        brownBirdSupply.setBrownPowerContinueBtn,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdCopy,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setCurrentAction,
        brownBirdSupply.setDisableClick
      );
    case 33:
      console.log("checking power 33");

      return power33(
        currentSpace.bird.power.variable,
        brownBirdSupply.brownBirdCopy.sameBird,
        space,
        brownBirdSupply.playerFood,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdCopy,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentAction,
        brownBirdSupply.setBrownPowerContinueBtn
      );
    case 34:
      console.log("checking power 34");
      return power34(
        currentSpace.bird.power.variable,
        brownBirdSupply.brownBirdCopy.sameBird,
        space,
        brownBirdSupply.setBrownPowerContinueBtn,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setBrownBirdCopy,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setCurrentAction,
        brownBirdSupply.setDisableClick
      );
    case 35:
      console.log("checking power 35");
      brownBirdSupply.setCurrentAction("brownWing");
      return power35(
        space,
        currentSpace.bird.power.variable,
        brownBirdSupply.setDisableClick,

        brownBirdSupply.setCurrentActionText,

        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setBrownBirdCopy
      );
    case 36:
      console.log("checking power 36");
      return power36_37(
        "fish",
        space,
        brownBirdSupply.birdFeeder,

        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setBrownBirdCopy
      );
    case 37:
      console.log("checking power 37");
      return power36_37(
        "rodent",
        space,
        brownBirdSupply.birdFeeder,

        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setBrownBirdVariable,
        brownBirdSupply.setBrownBirdCopy
      );
    case 38:
      console.log("checking power 38");
      brownBirdSupply.setCurrentAction("brownMove");
      return power38(
        habitat,
        space,

        brownBirdSupply.setBrownPowerContinueBtn,
        brownBirdSupply.setCurrentActionText,

        brownBirdSupply.setBrownBirdCopy
      );
    case 39:
      console.log("checking power 39");
      brownBirdSupply.setCurrentAction("brownRepeat");
      return power39(
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setBrownBirdCopy,
        space
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
    brownBirdSupply.setBrownBirdCopy((state) => ({
      ...state,
      dialog: "",
    }));
    switch (brownBirdSupply.brownBirdCopy.location) {
      case "forest":
        activateBrownPowers(
          brownBirdSupply.forest,
          brownBirdSupply.brownBirdCopy.copy,

          brownBirdSupply
        );
        return;
      case "grassland":
        activateBrownPowers(
          brownBirdSupply.grassland,
          brownBirdSupply.brownBirdCopy.copy,

          brownBirdSupply
        );
        return;
      case "wetland":
        activateBrownPowers(
          brownBirdSupply.wetland,
          brownBirdSupply.brownBirdCopy.copy,

          brownBirdSupply
        );
        return;
    }
  } else {
    if (brownBirdSupply.brownPowerEnd) {
      brownBirdSupply.setCurrentActionText(
        `Discard ${brownBirdSupply.discardQuantity} bird cards from your hand`
      );
      brownBirdSupply.setDisableClick((state) => ({
        ...state,
        birdHand: false,
      }));
      brownBirdSupply.setResourceQuantity(1);
      brownBirdSupply.setCurrentAction("discard");
      brownBirdSupply.setBrownPowerEnd(false);
    } else {
      resetAction(
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentAction,

        brownBirdSupply.setCurrentActionText
      );
      return;
    }
  }
};

export const cacheToken = (brownBirdSupply, setSelectedFood) => {
  switch (brownBirdSupply.brownBirdCopy.location) {
    case "forest":
      brownBirdSupply.setForest((forest) => {
        forest[brownBirdSupply.brownBirdCopy.currentSpace].cacheCount += 1;
        return forest;
      });

    case "wetland":
      brownBirdSupply.setWetland((wetland) => {
        wetland[brownBirdSupply.brownBirdCopy.currentSpace].cacheCount += 1;
        return wetland;
      });

    case "grassland":
      brownBirdSupply.setGrassland((grassland) => {
        grassland[brownBirdSupply.brownBirdCopy.currentSpace].cacheCount += 1;
        return grassland;
      });
  }
  setSelectedFood([]);
};

export const tuckCard = (brownBirdSupply) => {
  switch (brownBirdSupply.brownBirdCopy.location) {
    case "forest":
      brownBirdSupply.setForest((forest) => {
        forest[brownBirdSupply.brownBirdCopy.currentSpace].tuckedCount += 1;
        return forest;
      });
      break;
    case "grassland":
      brownBirdSupply.setGrassland((grassland) => {
        grassland[brownBirdSupply.brownBirdCopy.currentSpace].tuckedCount += 1;
        return grassland;
      });
      break;
    case "wetland":
      brownBirdSupply.setWetland((wetland) => {
        wetland[brownBirdSupply.brownBirdCopy.currentSpace].tuckedCount += 1;
        return wetland;
      });
      break;
  }
};

export const moveBird = (brownBirdSupply, moveBirdSupply) => {
  switch (brownBirdSupply.brownBirdCopy.location) {
    case "forest":
      moveBirdSource(
        brownBirdSupply.setForest,
        brownBirdSupply.brownBirdCopy.currentSpace,
        moveBirdSupply.setForestBirdCount,
        moveBirdSupply.setForestBrownBirds
      );
      break;
    case "grassland":
      moveBirdSource(
        brownBirdSupply.setGrassland,
        brownBirdSupply.brownBirdCopy.currentSpace,
        moveBirdSupply.setGrasslandBirdCount,
        moveBirdSupply.setGrasslandBrownBirds
      );
      break;
    case "wetland":
      moveBirdSource(
        brownBirdSupply.setWetland,
        brownBirdSupply.brownBirdCopy.currentSpace,
        moveBirdSupply.setWetlandBirdCount,
        moveBirdSupply.setWetlandBrownBirds
      );
      break;
  }
};

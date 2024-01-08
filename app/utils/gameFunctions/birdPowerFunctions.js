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

  {
    birdFeeder,
    setBirdFeeder,
    setDisableClick,
    setCurrentActionText,
    setResourceQuantity,
    setBrownBirdVariable,
    setBrownPowerContinueBtn,
    brownPowerContinueBtn,
    setCurrentAction,
    setBrownBirdCopy,
    brownBirdCopy,
    setSelectedFood,
    playerEggs,
  }
) => {
  resetBrownPower(setResourceQuantity, setBrownBirdVariable, setDisableClick);
  let tempCopy = [...habitatBrownBirds];

  while (tempCopy.length) {
    let lastSpace = tempCopy.pop();
    //if false, do stuff, come back around to same bird
    const continuePower = brownPowerCheck(habitat[lastSpace], lastSpace, {
      birdFeeder,
      setBirdFeeder,
      setDisableClick,
      setCurrentActionText,
      setResourceQuantity,
      setBrownBirdVariable,
      setBrownPowerContinueBtn,
      brownPowerContinueBtn,
      setCurrentAction,
      setBrownBirdCopy,
      brownBirdCopy,
      setSelectedFood,
      playerEggs,
    });
    if (continuePower) {
      console.log("power was true");
      setBrownBirdCopy((state) => ({
        ...state,
        copy: tempCopy,
      }));
      return;
    } else if (continuePower === undefined) {
      setBrownBirdCopy((state) => ({
        ...state,
        copy: [...habitatBrownBirds],
        sameBird: true,
      }));

      return;
    } // continuePower = false -> continues to next brown Power bird
  }
  console.log("end");
  setBrownPowerContinueBtn(false);
  resetAction(
    setDisableClick,
    setResourceQuantity,
    setCurrentAction,
    setCurrentActionText
  );
  //stops looping after all brown birds are checked
};

export const brownPowerCheck = (
  currentSpace,
  lastSpace,
  {
    birdFeeder,
    setBirdFeeder,
    setDisableClick,
    setCurrentActionText,
    setResourceQuantity,
    setBrownBirdVariable,
    setBrownPowerContinueBtn,
    brownPowerContinueBtn,
    setCurrentAction,
    setBrownBirdCopy,
    brownBirdCopy,
    setSelectedFood,
    playerEggs,
  }
) => {
  console.log(`Checking ${currentSpace.bird.common_name}'s brown power`);

  if (birdFeederPowers.includes(currentSpace.bird.power.id)) {
    console.log(brownBirdCopy);
    console.log("birdfeeder", birdFeeder);
    setCurrentAction("brownFeeder");
    if (enableRolling(birdFeeder) && !brownBirdCopy.sameBird) {
      console.log("can reroll before turn");
      setCurrentActionText(
        "do you want to roll the birdFeeder before checking this birds power?"
      );
      setBrownBirdCopy((state) => ({
        ...state,
        dialog: "roll",
      }));
      setBrownPowerContinueBtn(true);
      return;
    }
  }
  if (foodPowers.includes(currentSpace.bird.power.id)) {
    setCurrentAction("brownFood");
  }
  setBrownBirdCopy((state) => ({
    ...state,
    sameBird: false,
  }));
  switch (currentSpace.bird.power.id) {
    case 1:
      console.log("checking power 1");
      return power1(currentSpace.bird.power.variable, {
        birdFeeder,
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable,
      });
    case 2:
      console.log("checking power 2");
      return power2(currentSpace.bird.power.variable, {
        birdFeeder,
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable,
      });
    case 3:
      console.log("checking power 3");
      return power3_4({
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable,
      });
    case 4:
      console.log("checking power 4");
      return power3_4({
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable,
      });
    case 6:
      console.log("checking power 6");
      return power6_8(currentSpace.bird.power.variable, {
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable,
      });
    case 8:
      console.log("checking power 8");
      return power6_8(currentSpace.bird.power.variable, {
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable,
      });
    case 9:
      console.log("checking power 9");
      return power9(brownBirdCopy.sameBird, {
        setDisableClick,

        setResourceQuantity,
        setCurrentActionText,
        setBrownBirdVariable,
      });
    case 10:
      console.log("checking power 10");
      if (checkOtherEggs(playerEggs, currentSpace.eggCount)) {
        return power10(
          brownBirdCopy.sameBird,
          currentSpace.bird.power.variable,
          lastSpace,
          {
            setDisableClick,
            setBrownBirdCopy,
            setResourceQuantity,
            setCurrentActionText,
            setBrownBirdVariable,
          }
        );
      } else return false;
    case 12:
      console.log("checking power 12");
      setCurrentAction("brownCache");
      return power12(lastSpace, {
        setDisableClick,

        setResourceQuantity,
        setCurrentActionText,
        setBrownBirdVariable,
        setBrownBirdCopy,
      });

    case 13:
      console.log("checking power 13");
      return power13({
        lastSpace,
        setCurrentActionText,
        setDisableClick,
        setBrownPowerContinueBtn,
        setBrownBirdCopy,
        birdFeeder,

        setSelectedFood,
      });
    case 17:
      setCurrentAction("brownEgg");
      console.log("checking power 17");
      return power17(currentSpace.bird.power.variable, {
        setResourceQuantity,
        setBrownBirdVariable,
        setDisableClick,
        setCurrentActionText,
      });
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

export const continueBrownPower = (
  brownBirdCopy,
  setBrownBirdCopy,
  forest,
  grassland,
  wetland,
  brownBirdSupply
) => {
  if (brownBirdCopy.copy.length) {
    switch (brownBirdCopy.location) {
      case "forest":
        setBrownBirdCopy((state) => ({
          ...state,
          dialog: "",
        }));
        activateBrownPowers(
          forest,
          brownBirdCopy.copy,

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

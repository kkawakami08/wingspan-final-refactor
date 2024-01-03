import { enableRolling } from "./birdFeederFunctions";
import { resetAction } from "./habitatFunctions";
import { power1, power2, power3_4, power13 } from "./brownPowerFunctions";
import { initialDisableClick } from "../jotaiStore";

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
  }
) => {
  resetBrownPower(setResourceQuantity, setBrownBirdVariable, setDisableClick);
  let tempCopy = [...habitatBrownBirds];

  while (tempCopy.length) {
    let lastSpace = tempCopy.pop();
    //if false, do stuff, come back around to same bird
    const continuePower = continueBrownBirdPowers(
      habitat[lastSpace].bird,
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
      }
    );
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
      setBrownPowerContinueBtn(true);
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

const birdFeederPowers = [1, 2, 3, 4, 5, 13];

export const continueBrownBirdPowers = (
  currentBrownBird,
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
  }
) => {
  console.log(`Checking ${currentBrownBird.common_name}'s brown power`);
  if (birdFeederPowers.includes(currentBrownBird.power.id)) {
    setCurrentAction("brownFood");
    console.log(brownBirdCopy);
    console.log("birdfeeder", birdFeeder);
    if (enableRolling(birdFeeder) && !brownBirdCopy.sameBird) {
      console.log("can reroll before turn");
      setCurrentActionText(
        "do you want to roll the birdFeeder before checking this birds power?"
      );
      setBrownBirdCopy((state) => ({
        ...state,
        dialog: "roll",
      }));
      return;
    }
  }
  setBrownBirdCopy((state) => ({
    ...state,
    sameBird: false,
  }));
  switch (currentBrownBird.power.id) {
    case 1:
      console.log("checking power 1");
      return power1(currentBrownBird.power.variable, {
        birdFeeder,
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable,
      });
    case 2:
      console.log("checking power 2");
      return power2(currentBrownBird.power.variable, {
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
    case 13:
      console.log("checking power 13");
      return power13({
        lastSpace,
        setCurrentActionText,

        setBrownPowerContinueBtn,
        setBrownBirdCopy,
        birdFeeder,

        setSelectedFood,
      });
    default:
      console.log("default case");
      break;
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
    selectedFood: true,
    habitats: true,
  }));
};

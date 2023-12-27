import { enableRolling } from "./birdFeederFunctions";
import { resetAction } from "./habitatFunctions";

export const activateBrownPowers = (
  habitat,
  habitatBrownBirds,
  setBrownBirdCopy,
  {
    birdFeeder,
    setDisableClick,
    setCurrentActionText,
    setResourceQuantity,
    setBrownBirdVariable,
    setBrownPowerContinueBtn,
    brownPowerContinueBtn,
    setCurrentAction,
  }
) => {
  let tempCopy = [...habitatBrownBirds];

  while (tempCopy.length) {
    let lastSpace = tempCopy.pop();
    //if false, do stuff, come back around to same bird
    const continuePower = continueBrownBirdPowers(habitat[lastSpace].bird, {
      birdFeeder,
      setDisableClick,
      setCurrentActionText,
      setResourceQuantity,
      setBrownBirdVariable,
      setBrownPowerContinueBtn,
      brownPowerContinueBtn,
      setCurrentAction,
    });
    if (continuePower) {
      setBrownBirdCopy((state) => ({
        ...state,
        copy: tempCopy,
      }));
      return;
    } else if (continuePower === undefined) {
      console.log("Undefined birdfeeder");
      setBrownBirdCopy((state) => ({
        ...state,
        copy: [...habitatBrownBirds],
      }));
      setBrownPowerContinueBtn(true);
      return;
    }
  }
  setBrownPowerContinueBtn(false);
  resetAction(
    setDisableClick,
    setResourceQuantity,
    setCurrentAction,
    setCurrentActionText
  );
  //stops looping after all brown birds are checked
};

export const continueBrownBirdPowers = (
  currentBrownBird,
  {
    birdFeeder,
    setDisableClick,
    setCurrentActionText,
    setResourceQuantity,
    setBrownBirdVariable,
    setBrownPowerContinueBtn,
    brownPowerContinueBtn,
    setCurrentAction,
  }
) => {
  console.log(`Checking ${currentBrownBird.common_name}'s brown power`);

  switch (currentBrownBird.power.id) {
    case 1:
      setCurrentAction("brownFood");
      console.log(birdFeeder);
      //check birdfeeder can reroll before activating power 1
      if (enableRolling(birdFeeder) && !brownPowerContinueBtn) {
        console.log("can roll &&", !brownPowerContinueBtn);
        setCurrentActionText(
          "do you want to roll the birdFeeder before checking this birds power?"
        );

        return;
      } else {
        console.log("Checking power 1");
        return power1(currentBrownBird.power.variable, {
          birdFeeder,
          setDisableClick,
          setCurrentActionText,
          setResourceQuantity,
          setBrownBirdVariable,
        });
      }
  }
};

const power1 = (
  powerVariable,
  {
    birdFeeder,
    setDisableClick,
    setCurrentActionText,
    setResourceQuantity,
    setBrownBirdVariable,
  }
) => {
  let continuePower1 = false;
  if (powerVariable === "die") {
    setCurrentActionText("Select any die from the bird feeder");
    setBrownBirdVariable("");
    continuePower1 = true;
  } else {
    if (birdFeederCheck(powerVariable, birdFeeder)) {
      setCurrentActionText("Found in birdFeeder, enabling corresponding areas");
      setBrownBirdVariable(powerVariable);
      continuePower1 = true;
    } else {
      setCurrentActionText("not found in birdFeeder");
    }
  }
  if (continuePower1) {
    setDisableClick((state) => ({
      ...state,
      birdFeeder: false,
    }));
    setResourceQuantity(1);
  }
  return continuePower1;
};

//returns true if powerVariable is in birdFeeder
export const birdFeederCheck = (powerVariable, birdFeeder) => {
  if (Array.isArray(powerVariable)) {
    return birdFeeder.some((item) =>
      powerVariable.some((checkItem) => item.type.includes(checkItem))
    );
  } else if (!powerVariable) {
    return true;
  } else {
    return birdFeeder.some((item) => item.type === powerVariable);
  }
};

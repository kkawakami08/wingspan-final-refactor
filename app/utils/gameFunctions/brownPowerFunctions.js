import { birdFeederCheck } from "./brownPowerHelperFunctions";

//global variables

//birdFeeder
//setDisableClick,
//setCurrentActionText,
//setResourceQuantity,
//setBrownBirdVariable,

export const power1 = (
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

export const power2 = (
  powerVariable,
  {
    birdFeeder,
    setDisableClick,
    setCurrentActionText,
    setResourceQuantity,
    setBrownBirdVariable,
  }
) => {
  //gain all [type] in bird feeder
  //invertebrate/fish
  if (birdFeederCheck(powerVariable, birdFeeder)) {
    let dieCount = 0;
    for (const die of birdFeeder) {
      if (die.type === powerVariable) dieCount++;
    }
    setResourceQuantity(dieCount);
    setDisableClick((state) => ({
      ...state,
      birdFeeder: false,
    }));
    setBrownBirdVariable(powerVariable);
    setCurrentActionText(`Select all ${powerVariable} from bird Feeder`);
    return true;
  } else {
    setCurrentActionText(
      `${powerVariable} not found in bird Feeder. Continuing on`
    );
    return false;
  }
};

export const power3_4 = ({
  setDisableClick,
  setCurrentActionText,
  setResourceQuantity,
  setBrownBirdVariable,
}) => {
  //Each player gains 1 die from the birdfeeder, starting with the player of your choice.
  // Player(s) with the fewest birds in their forest gain 1 die from birdfeeder.
  //automa doesn't get anything, so user just gets to pick one die
  setDisableClick((state) => ({
    ...state,
    birdFeeder: false,
  }));
  setCurrentActionText("Select a die from the bird feeder");
  setBrownBirdVariable("");
  setResourceQuantity(1);
  return true;
};

export const power13 = ({
  lastSpace,
  setCurrentActionText,

  setBrownPowerContinueBtn,
  setBrownBirdCopy,
  birdFeeder,

  setSelectedFood,
}) => {
  // Gain 1 seed from the birdfeeder, if available. You may cache it on this bird.
  if (birdFeederCheck("seed", birdFeeder)) {
    let seedIndex = birdFeeder.findIndex((die) => die.type.includes("seed"));
    setSelectedFood([birdFeeder[seedIndex]]);
    birdFeeder.splice(seedIndex, 1);
    console.log("spliced", birdFeeder);

    setCurrentActionText("Removed dice. Cache or put in supply?");

    setBrownBirdCopy((state) => ({
      ...state,
      dialog: "cache",
      currentSpace: lastSpace,
    }));
    setBrownPowerContinueBtn(true);
    return true;
  }
  return false;
};

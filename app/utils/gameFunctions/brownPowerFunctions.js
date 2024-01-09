import { birdFeederCheck } from "./brownPowerHelperFunctions";

export const power1 = (
  powerVariable,
  birdFeeder,
  setDisableClick,
  setCurrentActionText,
  setResourceQuantity,
  setBrownBirdVariable
) => {
  let continuePower1 = false;
  if (powerVariable === "die") {
    setCurrentActionText("Select any die from the bird feeder");
    setBrownBirdVariable("");
    continuePower1 = true;
  } else {
    if (birdFeederCheck(powerVariable, birdFeeder)) {
      if (Array.isArray(powerVariable)) {
        setCurrentActionText(
          `Select ${powerVariable[0]} or ${powerVariable[1]} from the bird feeder.`
        );
      } else {
        setCurrentActionText(`Select ${powerVariable} from the birdFeeder`);
      }
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
  birdFeeder,
  setDisableClick,
  setCurrentActionText,
  setResourceQuantity,
  setBrownBirdVariable
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

export const power3_4 = (
  setDisableClick,
  setCurrentActionText,
  setResourceQuantity,
  setBrownBirdVariable
) => {
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

export const power6_8 = (
  powerVariable,

  setDisableClick,
  setCurrentActionText,
  setResourceQuantity,
  setBrownBirdVariable
) => {
  // Gain 1 fruit/invertebrate/seed from the supply.
  setResourceQuantity(1);
  setCurrentActionText(`Select 1 ${powerVariable} from supply`);
  setBrownBirdVariable(powerVariable);
  setDisableClick((state) => ({
    ...state,
    foodSupply: false,
  }));
  return true;
};

export const power9 = (
  sameBird,

  setDisableClick,

  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdVariable
) => {
  // Trade 1 wild for any other type from the supply.
  if (sameBird) {
    setCurrentActionText("Select one token from the supply.");
    setBrownBirdVariable("");
    setResourceQuantity(1);
    setDisableClick((state) => ({
      ...state,
      foodSupply: false,
    }));

    return true;
  } else {
    setResourceQuantity(1);
    setCurrentActionText("Select one of your food tokens to trade.");
    setBrownBirdVariable("");
    setDisableClick((state) => ({
      ...state,
      playerFood: false,
    }));

    return;
  }
};

export const power10 = (
  sameBird,
  powerVariable,
  lastSpace,

  setDisableClick,
  setBrownBirdCopy,
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdVariable
) => {
  // Discard 1 egg from any of your other birds to gain 2 wild from the supply.
  if (sameBird) {
    setResourceQuantity(powerVariable);
    setCurrentActionText(`Gain ${powerVariable} tokens from Food Supply`);
    setDisableClick((state) => ({
      ...state,
      foodSupply: false,
    }));
    setBrownBirdVariable("");
    return true;
  } else {
    setBrownBirdCopy((state) => ({
      ...state,
      currentSpace: lastSpace,
    }));
    setResourceQuantity(1);
    setCurrentActionText("Discard 1 egg from any of your other birds.");
    setDisableClick((state) => ({
      ...state,
      playedBird: false,
    }));
    return;
  }
};

export const power12 = (
  lastSpace,

  setDisableClick,
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdVariable,
  setBrownBirdCopy
) => {
  // Cache 1 seed from the supply on this bird.
  setDisableClick((state) => ({
    ...state,
    foodSupply: false,
  }));
  setResourceQuantity(1);
  setCurrentActionText("Cache 1 seed from the supply on this bird.");
  setBrownBirdVariable("seed");
  setBrownBirdCopy((state) => ({
    ...state,
    currentSpace: lastSpace,
  }));
  return true;
};

export const power13 = (
  lastSpace,
  setCurrentActionText,
  setDisableClick,
  setBrownPowerContinueBtn,
  setBrownBirdCopy,
  birdFeeder,

  setSelectedFood
) => {
  // Gain 1 seed from the birdfeeder, if available. You may cache it on this bird.
  if (birdFeederCheck("seed", birdFeeder)) {
    setDisableClick((state) => ({
      ...state,
      selectedFood: true,
    }));
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

export const power17 = (
  powerVariable,

  setResourceQuantity,
  setBrownBirdVariable,
  setDisableClick,
  setCurrentActionText
) => {
  // All players lay 1 egg on any 1 bowl/cavity/ground next. You may lay 1 egg on 1 additional bowl bird.
  setResourceQuantity(2);
  setBrownBirdVariable(powerVariable);
  setCurrentActionText(
    `Place an egg on any bird with a ${powerVariable} nest.`
  );
  setDisableClick((state) => ({
    ...state,
    playedBird: false,
  }));
  return true;
};

export const power18 = (
  setResourceQuantity,

  setDisableClick,
  setCurrentActionText
) => {
  // Lay 1 egg on any bird.
  setResourceQuantity(1);
  setCurrentActionText(`Place an egg on any bird.`);
  setDisableClick((state) => ({
    ...state,
    playedBird: false,
  }));
  return true;
};

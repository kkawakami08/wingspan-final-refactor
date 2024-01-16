import { birdFeederCheck } from "./brownPowerHelperFunctions";
import { nestTypeCounter } from "./whitePowerHelperFunctions";

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
      if (die.type.includes(powerVariable)) dieCount++;
    }
    setResourceQuantity(dieCount);
    setDisableClick((state) => ({
      ...state,
      birdFeeder: false,
    }));
    setBrownBirdVariable(powerVariable);
    setCurrentActionText(`Select all ${powerVariable} from bird Feeder`);
    console.log("can activate");
    return true;
  } else {
    setCurrentActionText(
      `${powerVariable} not found in bird Feeder. Continue turn.`
    );
    console.log("cant activate");
    return false;
  }
};

export const power7 = (
  powerVariable,
  setDisableClick,
  setCurrentActionText,
  setResourceQuantity,
  setBrownBirdVariable
) => {
  // Gain 3 seed/fish from the supply
  setResourceQuantity(3);
  setCurrentActionText(`Select 3 ${powerVariable} from supply`);
  setBrownBirdVariable(powerVariable);
  setDisableClick((state) => ({
    ...state,
    foodSupply: false,
  }));
  return true;
};

export const power16 = (brownBirdSupply, powerVariable) => {
  // Lay 1 egg on each of your birds with a [nest type] nest
  let nestCount = 1;

  const habitats = [
    brownBirdSupply.forest,
    brownBirdSupply.grassland,
    brownBirdSupply.wetland,
  ];

  for (const habitat of habitats) {
    console.log("checking habitat");
    nestCount += nestTypeCounter(habitat, powerVariable);
  }
  console.log(nestCount);

  brownBirdSupply.setResourceQuantity(nestCount);
  brownBirdSupply.setCurrentActionText(
    `Place ${nestCount} eggs (1 on each bird with a ${powerVariable} nest type.)`
  );
  brownBirdSupply.setDisableClick((state) => ({
    ...state,
    playedBird: false,
  }));
  brownBirdSupply.setBrownBirdVariable(powerVariable);

  return true;
};

export const power21 = (
  setCurrentActionText,
  setResourceQuantity,
  setDisableClick
) => {
  // Draw 2 bird cards
  setCurrentActionText("Draw 2 cards from the bird deck.");
  setResourceQuantity(2);
  setDisableClick((state) => ({
    ...state,
    birdDeck: false,
  }));
  return true;
};

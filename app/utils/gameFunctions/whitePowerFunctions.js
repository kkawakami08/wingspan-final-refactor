import { birdFeederCheck } from "./brownPowerHelperFunctions";

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

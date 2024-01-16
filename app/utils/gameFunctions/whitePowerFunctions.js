import { birdFeederCheck } from "./brownPowerHelperFunctions";
import { eggReqCheck } from "./playABirdFunctions";
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

export const power27 = (
  birdDeck,
  setSelectedCards,
  setCurrentActionText,
  setResourceQuantity
) => {
  // Draw bird cards equal to the number of players +1. Starting with you and proceeding clockwise, each player selects 1 of those cards and places it into their hand. You keep the extra card
  //draw 3, pick 2
  let drawnCards = [];
  for (let i = 0; i < 3; i++) {
    drawnCards.push(birdDeck.pop());
  }
  setSelectedCards([...drawnCards]);
  setCurrentActionText("Select 2 of the 3 drawn bird cards.");
  setResourceQuantity(2);
  return true;
};

export const power28 = (
  setDisableClick,
  setResourceQuantity,
  setCurrentActionText
) => {
  // Draw the 3 face-up bird cards from the bird tray
  setDisableClick((state) => ({
    ...state,
    birdTray: false,
  }));
  setResourceQuantity(3);
  setCurrentActionText("Pick up all 3 bird cards from the bird tray.");
  return true;
};

export const power41 = () => {
  //
};

export const power42 = (
  location,
  brownBirdSupply,
  moveBirdSupply,
  birdHand
) => {
  // Play an additional bird in your [specific habitat]. Pay its normal cost
  console.log("one");
  let canPlay;
  switch (location) {
    case "forest":
      console.log("forest");
      canPlay = eggReqCheck(
        moveBirdSupply.forestBirdCount + 1,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.playerEggs,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setPlayBirdState,
        location,
        birdHand,
        brownBirdSupply.playerFood,
        brownBirdSupply.setResourceQuantity,
        "whiteBird"
      );
      break;
    case "grassland":
      console.log("grassland");
      canPlay = eggReqCheck(
        moveBirdSupply.grasslandBirdCount + 1,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.playerEggs,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setPlayBirdState,
        location,
        birdHand,
        brownBirdSupply.playerFood,
        brownBirdSupply.setResourceQuantity,
        "whiteBird"
      );
      break;
    case "wetland":
      console.log("wetland");
      canPlay = eggReqCheck(
        moveBirdSupply.wetlandBirdCount + 1,
        brownBirdSupply.setDisableClick,
        brownBirdSupply.playerEggs,
        brownBirdSupply.setCurrentActionText,
        brownBirdSupply.setPlayBirdState,
        location,
        birdHand,
        brownBirdSupply.playerFood,
        brownBirdSupply.setResourceQuantity,
        "whiteBird"
      );
      break;
  }
  if (canPlay) {
    console.log("three");
    brownBirdSupply.setBrownPowerContinueBtn(true);
    brownBirdSupply.setCurrentActionText(
      "Do you want to play an additional bird in this habitat (paying its normal costs)?"
    );
    brownBirdSupply.setBrownBirdCopy((state) => ({
      ...state,
      dialog: "skip",
    }));
    brownBirdSupply.setBrownBirdVariable(location);
    return true;
  }
};

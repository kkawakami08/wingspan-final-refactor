import { rollBirdFeeder } from "./birdFeederFunctions";
import { birdFeederCheck, initialTuck } from "./brownPowerHelperFunctions";

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
export const power19 = (
  space,
  setResourceQuantity,
  setBrownBirdVariable,
  setBrownBirdCopy,
  setDisableClick,
  setCurrentActionText
) => {
  // Lay 1 egg on this bird.
  setResourceQuantity(1);
  setBrownBirdVariable("this");
  setBrownBirdCopy((state) => ({
    ...state,
    currentSpace: space,
  }));
  setCurrentActionText(`Place an egg on this bird.`);
  setDisableClick((state) => ({
    ...state,
    playedBird: false,
  }));
  return true;
};

export const power20_25_26 = (
  setResourceQuantity,
  setDisableClick,
  setCurrentActionText
) => {
  // Draw 1 card.
  setCurrentActionText("Draw a card from the bird deck.");
  setResourceQuantity(1);
  setDisableClick((state) => ({
    ...state,
    birdDeck: false,
  }));
  return true;
};

export const power22 = (
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdCopy,
  setBrownPowerContinueBtn
) => {
  // Draw 1 card. If you do, discard 1 card from your hand at the end of your turn.
  setBrownPowerContinueBtn(true);
  setResourceQuantity(1);
  setCurrentActionText(
    "Do you want to draw a bird card? (Have to discard one from your hand at the end of your turn)"
  );
  setBrownBirdCopy((state) => ({
    ...state,
    dialog: "discardLater",
  }));
  return true;
};

export const power23 = (
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdCopy,
  setBrownPowerContinueBtn
) => {
  // Draw 2 card. If you do, discard 1 card from your hand at the end of your turn.
  setBrownPowerContinueBtn(true);
  setResourceQuantity(2);
  setCurrentActionText(
    "Do you want to draw 2 bird cards? (Have to discard one from your hand at the end of your turn)"
  );
  setBrownBirdCopy((state) => ({
    ...state,
    dialog: "discardLater",
  }));
  return true;
};
export const power24 = (
  sameBird,
  playerEggs,
  setResourceQuantity,
  setCurrentActionText,
  setDisableClick
) => {
  // Discard 1 egg to draw 2 card.
  if (playerEggs == 0) {
    console.log("no eggs");
    return false;
  }
  if (sameBird) {
    console.log("returned");
    setDisableClick((state) => ({
      ...state,
      birdDeck: false,
    }));
    setResourceQuantity(2);
    setCurrentActionText("Draw 2 bird cards.");
    return true;
  } else {
    console.log("start");
    setDisableClick((state) => ({
      ...state,
      playedBird: false,
    }));
    setResourceQuantity(1);
    setCurrentActionText("Discard 1 egg to draw 2 bird cards.");

    return;
  }
};

export const power30 = (
  currentBirdEggCount,
  currentBirdEggLimit,
  sameBird,
  space,
  setBrownPowerContinueBtn,
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdCopy,
  setBrownBirdVariable,
  setCurrentAction,
  setDisableClick
) => {
  // Tuck 1 card from your hand behind this bird. If you do, you may also lay 1 egg on this bird.
  if (sameBird) {
    console.log("coming back");
    if (currentBirdEggCount < currentBirdEggLimit) {
      setBrownBirdVariable("this");
      setCurrentAction("brownEgg");
      setCurrentActionText("Can now lay an egg on this bird.");
      setDisableClick((state) => ({
        ...state,
        playedBird: false,
      }));
      setResourceQuantity(1);

      return true;
    } else {
      return false;
    }
  } else {
    initialTuck(
      setCurrentAction,
      setBrownPowerContinueBtn,
      setBrownBirdVariable,
      setResourceQuantity,
      setCurrentActionText,
      setBrownBirdCopy,
      space
    );
    setCurrentActionText(
      (state) => state + " (If you do, you can also lay 1 egg on this bird)"
    );
    return true;
  }
};

export const power31 = (
  sameBird,
  space,
  setBrownPowerContinueBtn,
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdCopy,
  setBrownBirdVariable,
  setCurrentAction,
  setDisableClick
) => {
  //Tuck 1 card from your hand behind this bird. If you do, draw 1 card.
  if (sameBird) {
    console.log("coming back");

    setCurrentAction("brownCard");
    setCurrentActionText("Can now draw a card from the bird deck.");
    setDisableClick((state) => ({
      ...state,
      birdDeck: false,
    }));
    setResourceQuantity(1);

    return true;
  } else {
    initialTuck(
      setCurrentAction,
      setBrownPowerContinueBtn,
      setBrownBirdVariable,
      setResourceQuantity,
      setCurrentActionText,
      setBrownBirdCopy,
      space
    );
    setCurrentActionText(
      (state) =>
        state + " (If you do, you can also draw 1 card from the bird deck)"
    );
    return true;
  }
};
export const power32 = (
  powerVariable,
  sameBird,
  space,
  setBrownPowerContinueBtn,
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdCopy,
  setBrownBirdVariable,
  setCurrentAction,
  setDisableClick
) => {
  //Tuck 1 card from your hand behind this bird. If you do, gain 1 fruit/seed/invertebrate or seed from the supply.
  if (sameBird) {
    console.log("coming back");

    setCurrentAction("brownFood");
    setCurrentActionText(`Can now take a ${powerVariable} from the supply`);
    setDisableClick((state) => ({
      ...state,
      foodSupply: false,
    }));
    setResourceQuantity(1);
    setBrownBirdVariable(powerVariable);

    return true;
  } else {
    initialTuck(
      setCurrentAction,
      setBrownPowerContinueBtn,
      setBrownBirdVariable,
      setResourceQuantity,
      setCurrentActionText,
      setBrownBirdCopy,
      space
    );
    setCurrentActionText(
      (state) =>
        state +
        ` (If you do, you can also gain 1 ${powerVariable} from the supply)`
    );
    return true;
  }
};

export const power33 = (
  powerVariable,
  sameBird,
  space,
  playerFoodSupply,
  setCurrentActionText,
  setBrownBirdCopy,
  setDisableClick,
  setBrownBirdVariable,
  setResourceQuantity,
  setCurrentAction,
  setBrownPowerContinueBtn
) => {
  // Discard 1 fish to tuck 2 card from the deck behind this bird.
  if (sameBird) {
    setCurrentAction("brownTuck");
    setCurrentActionText(
      "Can now tuck 2 cards from the bird deck behind this bird."
    );
    setDisableClick((state) => ({
      ...state,
      birdDeck: false,
    }));
    setResourceQuantity(2);
    return true;
  } else {
    if (birdFeederCheck(powerVariable, playerFoodSupply)) {
      setBrownPowerContinueBtn(true);
      setCurrentAction("brownFood");
      setCurrentActionText(
        `Do you want to discard 1 ${powerVariable} to tuck 2 cards from the deck behind this bird?`
      );

      setBrownBirdCopy((state) => ({
        ...state,
        dialog: "discard",
        currentSpace: space,
      }));

      setBrownBirdVariable(powerVariable);
      setResourceQuantity(1);
      return true;
    } else {
      return false;
    }
  }
};

export const power34 = (
  powerVariable,
  sameBird,
  space,
  setBrownPowerContinueBtn,
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdCopy,
  setBrownBirdVariable,
  setCurrentAction,
  setDisableClick
) => {
  // Tuck 1 card from your hand behind this bird. If you do, lay 1 egg on any bird.
  if (sameBird) {
    console.log("coming back");
    if (powerVariable === "egg") {
      setCurrentAction("brownEgg");
      setCurrentActionText(`Can now lay 1 egg on any bird`);
      setDisableClick((state) => ({
        ...state,
        playedBird: false,
      }));
      setResourceQuantity(1);
    } else {
      setCurrentAction("brownFood");
      setCurrentActionText(`Can now take 1 invertebrate from the supply`);
      setDisableClick((state) => ({
        ...state,
        foodSupply: false,
      }));
      setResourceQuantity(1);
      setBrownBirdVariable("invertebrate");
    }

    return true;
  } else {
    initialTuck(
      setCurrentAction,
      setBrownPowerContinueBtn,
      setBrownBirdVariable,
      setResourceQuantity,
      setCurrentActionText,
      setBrownBirdCopy,
      space
    );
    if (powerVariable === "egg") {
      setCurrentActionText(
        (state) => state + ` (If you do, you can lay 1 egg on any bird.)`
      );
    } else {
      setCurrentActionText(
        (state) =>
          state + ` (If you do, you can gain 1 invertebrate from the supply.)`
      );
    }

    return true;
  }
};

export const power35 = (
  space,
  powerVariable,
  setDisableClick,
  setCurrentActionText,
  setBrownBirdVariable,
  setBrownBirdCopy
) => {
  // Look at a card from the deck. If less than 50cm, tuck it behind this bird. If not, discard it.
  setDisableClick((state) => ({
    ...state,
    birdDeck: false,
  }));
  setCurrentActionText(
    `If the top card of the bird deck has a wingspan less than ${powerVariable}, tuck it behind this bird. Else discard it.`
  );
  setBrownBirdVariable(powerVariable);
  setBrownBirdCopy((state) => ({
    ...state,
    currentSpace: space,
  }));
  return true;
};

export const power36_37 = (
  type,
  space,
  birdFeeder,
  setCurrentActionText,
  setDisableClick,
  setResourceQuantity,
  setBrownBirdVariable,
  setBrownBirdCopy
) => {
  // Roll all dice not in birdfeeder. If any are fish, cache 1 fish from the supply on this bird.
  if (birdFeeder.length == 5) {
    return false;
  }
  let roll = rollBirdFeeder();
  for (let i = birdFeeder.length; i > 0; i--) {
    roll.pop();
  }
  console.log("roll check after pop", roll);
  for (const die of roll) {
    if (die.type == type) {
      setCurrentActionText(
        `Rolled at least 1 ${type} from dice not in bird feeder. Can now cache 1 ${type} from the supply on this bird.`
      );
      setDisableClick((state) => ({
        ...state,
        foodSupply: false,
      }));
      setResourceQuantity(1);
      setBrownBirdVariable(type);
      setBrownBirdCopy((state) => ({
        ...state,
        currentSpace: space,
      }));
      return true;
    }
  }
  return false;
};

export const power38 = (
  habitat,
  space,
  setBrownPowerContinueBtn,
  setCurrentActionText,
  setBrownBirdCopy
) => {
  // If this bird is to the right of all other birds in its habitat, move it to another habitat.
  if (habitat[space + 1].bird == null) {
    setBrownPowerContinueBtn(true);
    setCurrentActionText(
      "Do you want to move this bird to a different location?"
    );
    setBrownBirdCopy((state) => ({
      ...state,
      currentSpace: space,
      dialog: "move",
    }));

    return true;
  } else {
    return false;
  }
};

export const power39 = (
  setCurrentActionText,
  setDisableClick,
  setBrownBirdCopy,
  space
) => {
  // Repeat a brown power on another bird in this habitat.
  setCurrentActionText(
    "Select another bird in this habitat with a brown power to activate."
  );
  setDisableClick((state) => ({
    ...state,
    playedBird: false,
  }));
  setBrownBirdCopy((state) => ({
    ...state,
    currentSpace: space,
  }));
  return true;
};

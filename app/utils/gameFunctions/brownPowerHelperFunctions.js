export const birdFeederCheck = (powerVariable, birdFeeder) => {
  if (Array.isArray(powerVariable)) {
    return birdFeeder.some((item) =>
      powerVariable.some((checkItem) => item.type.includes(checkItem))
    );
  } else if (!powerVariable) {
    return true;
  } else {
    return birdFeeder.some((item) => item.type.includes(powerVariable));
  }
};

export const checkOtherEggs = (playerEggs, currentBirdEggs) => {
  console.log("checkothereggs", playerEggs, currentBirdEggs);
  if (!playerEggs || !(playerEggs - currentBirdEggs)) {
    console.log("false egg check");
    return false;
  } else return true;
};

export const initialTuck = (
  setCurrentAction,
  setBrownPowerContinueBtn,
  setBrownBirdVariable,
  setResourceQuantity,
  setCurrentActionText,
  setBrownBirdCopy,
  space
) => {
  console.log("starting");
  setCurrentAction("brownTuck");
  setBrownPowerContinueBtn(true);
  setBrownBirdVariable("hand");
  setResourceQuantity(1);
  setCurrentActionText(
    "Do you want to tuck a bird from your hand behind this bird or skip to next power?"
  );
  setBrownBirdCopy((state) => ({
    ...state,
    dialog: "tuck",
    currentSpace: space,
  }));
};

export const moveBirdSource = (
  setSourceHabitat,
  currentSpace,
  setSourceBirdCount,
  setSourceBrownBirds
) => {
  setSourceHabitat((state) => {
    state[currentSpace].bird = null;
    state[currentSpace].eggCount = 0;
    state[currentSpace].cacheCount = 0;
    state[currentSpace].tuckedCount = 0;
    return state;
  });
  setSourceBirdCount((state) => state - 1);
  setSourceBrownBirds((state) => {
    state.pop();
    return state;
  });
};

export const moveBirdDestination = (
  setDestination,
  destinationBirdCount,
  setDestinationBrownBirds,
  setDestinationBirdCount,
  brownBirdSupply
) => {
  let birdSource;
  switch (brownBirdSupply.brownBirdCopy.location) {
    case "forest":
      birdSource =
        brownBirdSupply.forest[brownBirdSupply.brownBirdCopy.currentSpace];
      break;
    case "grassland":
      birdSource =
        brownBirdSupply.grassland[brownBirdSupply.brownBirdCopy.currentSpace];
      break;
    case "wetland":
      birdSource =
        brownBirdSupply.wetland[brownBirdSupply.brownBirdCopy.currentSpace];
      break;
  }

  setDestination((state) => {
    state[destinationBirdCount].bird = birdSource.bird;
    state[destinationBirdCount].eggCount = birdSource.eggCount;
    state[destinationBirdCount].cacheCount = birdSource.cacheCount;
    state[destinationBirdCount].tuckedCount = birdSource.tuckedCount;
    return state;
  });
  setDestinationBrownBirds((state) => {
    state.push(destinationBirdCount);
    return state;
  });
  setDestinationBirdCount((state) => state + 1);
};

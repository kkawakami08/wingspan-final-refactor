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

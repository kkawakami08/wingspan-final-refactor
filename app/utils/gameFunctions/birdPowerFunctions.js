export const brownBirdPower = (
  habitatBirdCount,
  habitat,
  setBrownBirdSpace,
  {
    birdFeeder,
    setDisableClick,
    setCurrentActionText,
    setResourceQuantity,
    setBrownBirdVariable,
  }
) => {
  //save which spaces in habitat have brown birds
  let brownBirdSpace = [];
  for (let i = 0; i < habitatBirdCount; i++) {
    if (habitat[i].bird.power.color === "brown") {
      console.log("brown bird found");
      brownBirdSpace.push(i);
    }
  }

  while (brownBirdSpace.length) {
    //get rightmost brown bird
    let currentSpace = brownBirdSpace.pop();
    //if false, break out of loop to do brown power
    //if true, could not satisfy brown power, so continue to next brown bird
    const shouldContinue = activateBrownPower(
      habitat[currentSpace].bird.power,
      {
        birdFeeder,
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable,
      }
    );
    if (!shouldContinue) break;
  }
  console.log("after while loop");
  if (!brownBirdSpace.length) {
    console.log("resetting action");
    return true;
  } else {
    //saves remaining spaces so can continue after current bird
    setBrownBirdSpace(brownBirdSpace);
    return false;
  }
};

const activateBrownPower = (
  birdPower,
  {
    birdFeeder,
    setDisableClick,
    setCurrentActionText,
    setResourceQuantity,
    setBrownBirdVariable,
  }
) => {
  switch (birdPower.id) {
    case 1:
      console.log("Activated power 1");
      return power1(
        birdPower.variable,
        birdFeeder,
        setDisableClick,
        setCurrentActionText,
        setResourceQuantity,
        setBrownBirdVariable
      );
  }
};

const power1 = (
  variable,
  birdFeeder,
  setDisableClick,
  setCurrentActionText,
  setResourceQuantity,
  setBrownBirdVariable
) => {
  let canTake = false;
  if (variable === "die") {
    setCurrentActionText("Select any die from the bird feeder");
    canTake = true;
  } else {
    for (let die of birdFeeder) {
      if (Array.isArray(variable)) {
        if (
          die.type.includes(variable[[0]]) ||
          die.type.includes(variable[1])
        ) {
          canTake = true;
          setCurrentActionText(
            `Select 1 ${variable[0]} or ${variable[1]} from the bird feeder`
          );
          break;
        }
      } else {
        if (die.type.includes(variable)) {
          setCurrentActionText(`Select 1 ${variable} from the bird feeder`);
          canTake = true;
          break;
        }
      }
    }
  }
  if (canTake) {
    setBrownBirdVariable(variable);
    setResourceQuantity(1);
    setDisableClick((state) => ({
      ...state,
      birdFeeder: false,
      habitats: true,
    }));
    return false;
  } else
    setCurrentActionText(
      `Specified food not found in birdFeeder. Continuing on...`
    );
  return true;
};

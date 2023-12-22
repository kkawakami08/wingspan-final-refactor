import { enableRolling } from "./birdFeederFunctions";

export const activateBrownPowers = (
  habitat,
  habitatBrownBirds,
  setBrownBirdCopy,
  { birdFeeder }
) => {
  if (!habitatBrownBirds.length) {
    return false;
  } else {
    //function that uses the last item from habitatBrownBirds
    //save everything (but last item) to brownbird copy
    let tempCopy = [...habitatBrownBirds];
    let lastSpace = tempCopy.pop();
    continueBrownBirdPowers(habitat[lastSpace].bird, { birdFeeder });

    setBrownBirdCopy([...tempCopy]);
    return true;
  }
};

export const continueBrownBirdPowers = (currentBrownBird, { birdFeeder }) => {
  console.log(`Checking ${currentBrownBird.common_name}'s brown power`);
  switch (currentBrownBird.power.id) {
    case 1:
      //check birdfeeder can reroll before activating power 1
      if (enableRolling(birdFeeder)) {
        console.log(
          "do you want to roll the birdFeeder before checking this birds power?"
        );
        break;
      } else {
        console.log("Checking power 1");
        break;
      }
  }
};

const power1 = () => {
  //gain 1 [type] from birdFeeder
};

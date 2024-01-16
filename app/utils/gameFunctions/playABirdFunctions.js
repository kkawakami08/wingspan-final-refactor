import { initialDisableClick, initialPlayBird } from "../jotaiStore";

export const eggReqCheck = (
  birdCount,
  setDisableClick,
  playerEggs,
  setCurrentActionText,
  setPlayBirdState,
  location,
  birdHand,
  playerFoodSupply,
  setResourceQuantity
) => {
  let eggReq = 0;
  if (birdCount == 1 || birdCount == 2) {
    eggReq = 1;
  } else if (birdCount == 3 || birdCount == 4) {
    eggReq = 2;
  }
  setResourceQuantity(eggReq);
  if (playerEggs < eggReq) {
    if (currentAction == "whiteBird") {
      setCurrentActionText(
        `Not enough eggs to play in ${location}. Click Skip Bird's power.`
      );
    } else {
      setCurrentActionText(
        `Not enough eggs to play in ${location}. Select a different habitat`
      );
    }
    return;
  }
  if (checkFoodSupply(birdHand, playerFoodSupply, location)) {
    if (eggReq == 0) {
      setCurrentActionText(`Selected ${location}. Now Select a bird`);
      setDisableClick((state) => ({
        ...state,
        birdHand: false,
        habitats: true,
      }));
    } else {
      setCurrentActionText(`Remove ${eggReq} eggs from your played Birds`);
      setDisableClick((state) => ({
        ...state,
        playedBird: false,
        habitats: true,
      }));
    }
    setPlayBirdState((state) => {
      state.habitat = location;
      state.eggReq = eggReq;
    });
    return true;
  } else {
    if (currentAction == "whiteBird") {
      setCurrentActionText(
        `Not enough food to play in ${location}. Click Skip Bird's power.`
      );
    } else {
      setCurrentActionText(
        `Not enough food to play in ${location}. Select a different habitat`
      );
    }
    return false;
  }
};

export const checkFoodSupply = (birdHand, playerFoodSupply, location) => {
  let canPlayABird = false;

  const playerSupply = {};
  for (const { type } of playerFoodSupply) {
    playerSupply[type] = playerSupply[type] + 1 || 1;
  }

  for (const bird of birdHand) {
    //go through each bird in birdhand
    //if current bird doesn't live in location, skip over
    if (!bird.habitat.includes(location)) {
      console.log(`Current bird doesn't live in ${location}. Skipping`);
      continue;
    }

    //if current bird does live in location, document food req
    let birdFoodReq = {};
    for (const grub of bird.food) {
      birdFoodReq[grub] = birdFoodReq[grub] + 1 || 1;
    }

    //copy content of original food supply
    let playerCheck = { ...playerSupply };

    //loop through birdFoodReq to see if player has current iteration's food type
    //if yes, will subtract from playerCheck
    //if not, will add type and quantity of req food to checkLater
    //if wild, will also add to checkLater
    let checkLater = {};
    let canContinue = true;

    for (const food in birdFoodReq) {
      if (food === "wild") {
        checkLater["wild"] = birdFoodReq["wild"];

        //set canContinue to false because have to checkLater
        canContinue = false;
      } else if (food === "seed" || food === "invertebrate") {
        //if player has invertebrate_seed token, will use it
        if (playerCheck["invertebrate_seed"]) {
          playerCheck["invertebrate_seed"] =
            playerCheck["invertebrate_seed"] - 1;
        } else {
          if (!playerCheck[food] || playerCheck[food] < birdFoodReq[food]) {
            checkLater[food] = birdFoodReq[food];
            canContinue = false;
          } else {
            playerCheck[food] = playerCheck[food] - 1;
          }
        }
      } else {
        if (!playerCheck[food] || playerCheck[food] < birdFoodReq[food]) {
          checkLater[food] = birdFoodReq[food];
          canContinue = false;
        } else {
          playerCheck[food] = playerCheck[food] - 1;
        }
      } // end of food type check
    } // end of food loop for one bird

    if (canContinue) {
      //can play this bird, move on to next bird
      canPlayABird = true;
      console.log("1. can play this bird. break to end");
      break;
    } else {
      //bird still needs more food! either for wild or 2 for 1
      let playerRemaining = 0;
      for (const food in playerCheck) {
        playerRemaining += playerCheck[food];
      }

      //remove "wild" req from player
      if (checkLater["wild"]) {
        playerRemaining -= checkLater["wild"];
        checkLater["wild"] = 0;
      }
      //puts values from checklater into an array [0,1,0] etc
      let fufilled = Object.values(checkLater);
      //if every value in array = 0 (have submitted req food for bird) then true, else false
      canContinue = fufilled.every((item) => item === 0);

      if (canContinue) {
        canPlayABird = true;
        console.log("2. can play this bird. break to end");
        break;
      } else {
        // check if user can apply 2 for 1 on remaining req bird food
        playerRemaining = Math.floor(playerRemaining / 2);
        if (playerRemaining <= 0) {
          console.log("3. can't play this bird. break to end");
          break;
        } else {
          for (const food in checkLater) {
            playerRemaining -= checkLater[food];

            if (playerRemaining < 0) {
              console.log("4. can't play this bird. break to end");
              break;
            }
          }
          console.log("5. can play this bird. ");
          canPlayABird = true;
        }
      }
    }
  } //end of bird loop
  console.log("this is the end");
  return canPlayABird;
};

export const placeBird = (
  playBirdState,
  { setHabitat, birdCount, setBirdCount, setBrownBirds }
) => {
  setHabitat((habitat) => {
    habitat[birdCount].bird = playBirdState.bird;
  });
  if (playBirdState.bird.power.color === "brown")
    setBrownBirds((state) => [...state, birdCount]);
  setBirdCount((count) => count + 1);
};

export const playBird = (selectedFood, selectedBird) => {
  if (!selectedFood.length) return false;
  let foodCount = [];
  let neededTokens = 0;
  let wildCount = 0;

  //documenting what selected food
  for (const { type } of selectedFood) {
    foodCount.push(type);
  }
  //checks each food bird req vs what is in selected food
  //if missing food, adds to needed token count else removes from selected food

  for (let i = 0; i < selectedBird.food.length; i++) {
    let currentItem = selectedBird.food[i];
    if (currentItem === "wild") {
      wildCount++;
      continue;
    }
    if (
      foodCount.includes("invertebrate_seed") &&
      (currentItem === "seed" || currentItem === "invertebrate")
    ) {
      console.log("using invertebrate_seed token for ", currentItem);
      const index = foodCount.indexOf("invertebrate_seed");
      foodCount.splice(index, 1);
      continue;
    }

    const index = foodCount.indexOf(currentItem);

    if (index >= 0) {
      foodCount.splice(index, 1);
    } else {
      console.log(`no ${currentItem} found`);
      neededTokens++;
    }
  }

  let continueAction = false;

  if (wildCount) {
    if (foodCount.length === wildCount) {
      console.log("you have enough tokens. placed bird");
      continueAction = true;
    }
  } else {
    console.log(
      `missing ${neededTokens} more tokens for bird. so ${
        neededTokens * 2
      } total`
    );
    if (foodCount.length === neededTokens * 2) {
      console.log("enough tokens to play bird");
      continueAction = true;
    }
  }
  return continueAction;
  //
};

export const removeEgg = (
  setHabitat,
  space,
  setPlayerEggs,
  setCurrentActionText,
  setDisableClick,
  setResourceQuantity,
  resourceQuantity
) => {
  setHabitat((habitat) => {
    habitat[space].eggCount = habitat[space].eggCount - 1;
  });
  setPlayerEggs((eggs) => eggs - 1);
  setResourceQuantity((state) => state - 1);
  if (resourceQuantity - 1 == 0) {
    setCurrentActionText("Completed Egg Requirements. Now select a bird");
    setDisableClick((state) => ({
      ...state,
      birdHand: false,
      playedBird: true,
    }));
  } else {
    setCurrentActionText(`Remove ${resourceQuantity - 1} more egg`);
  }
};

export const replaceEggs = (
  removedEggList,
  setForest,
  setGrassland,
  setWetland
) => {
  for (const habitat in removedEggList) {
    switch (habitat) {
      case "forest":
        for (const space of removedEggList[habitat]) {
          setForest((forest) => {
            forest[space].eggCount = forest[space].eggCount + 1;
          });
        }
        break;
      case "grassland":
        for (const space of removedEggList[habitat]) {
          setGrassland((grassland) => {
            grassland[space].eggCount = grassland[space].eggCount + 1;
          });
        }
        break;
    }
  }
};

export const resetPlayBirdAction = (
  setDisableClick,
  setResourceQuantity,
  setCurrentAction,
  setPlayBirdState,
  setCurrentActionText
) => {
  setDisableClick(initialDisableClick);
  setResourceQuantity(0);
  setCurrentAction("");
  setPlayBirdState((state) => {
    state = initialPlayBird;
    return state;
  });
  setCurrentActionText("Select an action");
};

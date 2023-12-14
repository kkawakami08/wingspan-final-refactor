import { initialPlayBird } from "../jotaiStore";

export const activatePlayBird = (
  setPlayBird,
  location,
  birdCount,
  setDisableClick,
  playerEggs
) => {
  let eggReq = 0;
  if (birdCount == 1 || birdCount == 2) {
    eggReq = 1;
  } else if (birdCount == 3 || birdCount == 4) {
    eggReq = 2;
  }

  if (playerEggs < eggReq) {
    setPlayBird((state) => {
      state.confirmHabitat = false;
    });
  } else {
    setPlayBird((state) => {
      state.habitat = location;
      state.eggReq = eggReq;
      return state;
    });
    setDisableClick((state) => ({
      ...state,
      habitats: true,
      birdHand: false,
    }));
  }
};

export const checkFoodSupply = (birdHand, playerFoodSupply) => {
  //document player's current food supply
  const playerSupply = {};
  for (const { type } of playerFoodSupply) {
    playerSupply[type] = playerSupply[type] + 1 || 1;
  }

  //going through each bird in birdhand
  for (const bird of birdHand) {
    //documenting current bird's food req
    let playedBirdFoodCount = {};
    for (const grub of bird.food) {
      playedBirdFoodCount[grub] = playedBirdFoodCount[grub] + 1 || 1;
    }

    let playerCheck = { ...playerSupply };
    //if player food doesn't have enough specified tokens, or if bird food req has "wild", adds to check later to see if can use 2 for 1 or any token for "wild"
    let checkLater = {};
    let canContinue = true;

    for (const food in playedBirdFoodCount) {
      if (food === "wild") {
        checkLater["wild"] = playedBirdFoodCount["wild"];
        canContinue = false;
      } else if (food === "seed" || food === "invertebrate") {
        console.log(`Checking ${food}`);
        if (playerCheck["invertebrate_seed"]) {
          console.log("Can use invertebrate_seed here");
          playerCheck["invertebrate_seed"] =
            playerCheck["invertebrate_seed"] - 1;
        } else {
          if (
            !playerCheck[food] ||
            playerCheck[food] < playedBirdFoodCount[food]
          ) {
            console.log(
              `Not enough ${food} in your supply. Adding to checkLater`
            );
            checkLater[food] = playedBirdFoodCount[food];
            canContinue = false;
          } else {
            playerCheck[food] = playerCheck[food] - 1;
          }
        }
      } else {
        //cheecks for fish, fruit, rodent
        console.log(`Checking ${food}`);

        if (
          !playerCheck[food] ||
          playerCheck[food] < playedBirdFoodCount[food]
        ) {
          console.log(
            `Not enough ${food} in your supply. Adding to checkLater`
          );
          checkLater[food] = playedBirdFoodCount[food];
          canContinue = false;
        } else {
          playerCheck[food] = playerCheck[food] - 1;
        }
      }

      if (canContinue) {
        continue;
      } else {
        //counts remaining tokens in player food supply to use for wild or 2 for 1
        let playerRemaining = 0;
        for (const food in playerCheck) {
          playerRemaining += playerCheck[food];
        }
        console.log(playerRemaining, " available tokens");
        //removes a token for each "wild" food req of bird
        if (checkLater["wild"]) {
          playerRemaining -= checkLater["wild"];
          console.log(
            `Removed ${checkLater["wild"]} for wild. remaining tokens: ${playerRemaining}`
          );
          checkLater["wild"] = 0;
        }
        //checks if bird has any remaining food req
        let fufilled = Object.values(checkLater);

        //can continue = true if bird food req are fulfilled
        canContinue = fufilled.every((item) => item === 0);

        if (canContinue) {
          continue;
        } else {
          //sees if remaining player food tokens can be used for 2 for 1
          playerRemaining = Math.floor(playerRemaining / 2);

          for (const food in checkLater) {
            console.log(`Checking ${food} with ${checkLater[food]} amount`);
            playerRemaining -= checkLater[food];

            if (playerRemaining >= 0) {
              continue;
            } else {
              return false;
            }
          }
        }
      }
    }
  }

  return true;
};

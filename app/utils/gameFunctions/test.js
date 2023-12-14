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
          if (
            !playerCheck[food] ||
            playerCheck[food] < playedBirdFoodCount[food]
          ) {
            checkLater[food] = playedBirdFoodCount[food];
            canContinue = false;
          } else {
            playerCheck[food] = playerCheck[food] - 1;
          }
        }
      } else {
        if (
          !playerCheck[food] ||
          playerCheck[food] < playedBirdFoodCount[food]
        ) {
          checkLater[food] = playedBirdFoodCount[food];
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

import { useAtom } from "jotai";
import {
  disableClickAtom,
  playerEggSupplyAtom,
  removedEggListAtom,
  grasslandBrownBirdsAtom,
  eggTrackerAtom,
} from "../../../../utils/jotaiStore";
import {
  layEgg,
  resetFromGrassland,
} from "../../../../utils/gameFunctions/grasslandFunctions";
import {
  removeEgg,
  resetPlayBirdAction,
} from "../../../../utils/gameFunctions/playABirdFunctions";
import { discardEgg } from "../../../../utils/gameFunctions/wetlandFunctions";
import {
  activateBrownPowers,
  brownPowerCheck,
  continueBrownPower,
} from "../../../../utils/gameFunctions/birdPowerFunctions";
import BirdLayout from "./BirdLayout";

const PlayedBirdCard = ({
  habitat,
  setHabitat,
  space,
  location,
  brownBirdSupply,
}) => {
  const bird = habitat[space].bird;
  const currentEggs = habitat[space].eggCount;
  const currentTucked = habitat[space].tuckedCount;

  const [, setPlayerEggs] = useAtom(playerEggSupplyAtom);
  const [, setRemovedEggList] = useAtom(removedEggListAtom);
  const [grasslandBrownBirds] = useAtom(grasslandBrownBirdsAtom);
  const [eggTracker, setEggTracker] = useAtom(eggTrackerAtom);

  const [disableClick] = useAtom(disableClickAtom);
  const disableBirdCard = disableClick.playedBird;

  const currentActionDivider = ["grassland", "brownEgg", "brownNest"];

  let noMoreEggsConditions =
    !eggTracker.includes(bird.common_name) && bird.egg_limit !== currentEggs;

  const thisVariableCheck =
    brownBirdSupply.brownBirdCopy.currentSpace == Number(space) &&
    brownBirdSupply.brownBirdCopy.location == location;

  const birdCardClick = () => {
    if (!disableBirdCard) {
      //can click on playedBird
      if (currentActionDivider.includes(brownBirdSupply.currentAction)) {
        //current action == grassland/brownEgg/brownNest
        if (brownBirdSupply.currentAction == "brownNest") {
          //verifies that current bird has specified nest to lay eggs
          noMoreEggsConditions =
            noMoreEggsConditions &&
            bird.nest == brownBirdSupply.brownBirdVariable;
          //false &&
        }
        if (noMoreEggsConditions) {
          //current bird not in egg tracker / bird nest == brownbirdvariable / egg_limit < egg Count
          if (brownBirdSupply.brownBirdVariable == "this") {
            if (!thisVariableCheck) {
              //if current bird is not specified bird
              brownBirdSupply.setCurrentActionText(
                "Must place on specified bird."
              );
              return;
            }
          }
          //either specified bird or meets egg laying req
          layEgg(
            setHabitat,
            space,
            brownBirdSupply.setResourceQuantity,
            setPlayerEggs
          );

          if (brownBirdSupply.currentAction !== "grassland") {
            setEggTracker((state) => [...state, bird.common_name]);
          }
          if (brownBirdSupply.resourceQuantity - 1 == 0) {
            setEggTracker([]);

            if (brownBirdSupply.currentAction.includes("brown")) {
              //brown nest / brown egg

              continueBrownPower(brownBirdSupply);
            } else if (brownBirdSupply.currentAction == "grassland") {
              if (grasslandBrownBirds.length) {
                brownBirdSupply.setBrownBirdCopy((state) => ({
                  ...state,
                  location: "grassland",
                }));
                activateBrownPowers(
                  brownBirdSupply.grassland,
                  grasslandBrownBirds,

                  brownBirdSupply
                );
              } else {
                resetFromGrassland(
                  brownBirdSupply.setDisableClick,
                  brownBirdSupply.setCurrentAction,
                  brownBirdSupply.setCurrentActionText
                );
              }
              //end of grassland
            } else {
              resetPlayBirdAction(
                brownBirdSupply.setDisableClick,
                brownBirdSupply.setResourceQuantity,
                brownBirdSupply.setCurrentAction,
                brownBirdSupply.setPlayBirdState,
                brownBirdSupply.setCurrentActionText
              );
              //end of white power
            }
            //end of resourceQuantity > 0 check
          } else {
            brownBirdSupply.setCurrentActionText(
              "Select another bird to lay an egg on."
            );
          }
          //end of noMoreEggsCheck
        } else {
          brownBirdSupply.setCurrentActionText("Can't lay eggs on this bird.");
        }
      } else {
        //current action !== grassland / brownEgg / brownNest
        switch (brownBirdSupply.currentAction) {
          case "brownFood":
            if (brownBirdSupply.brownBirdCopy.currentSpace == space) {
              brownBirdSupply.setCurrentActionText(
                "Can't remove egg from this bird."
              );
            } else {
              removeEgg(
                setHabitat,
                space,

                setPlayerEggs,
                brownBirdSupply.setCurrentActionText,
                brownBirdSupply.setDisableClick,
                brownBirdSupply.setResourceQuantity,
                brownBirdSupply.resourceQuantity
              );
              continueBrownPower(brownBirdSupply);
            }

            break;
          case "playBird":
            if (currentEggs == 0) {
              brownBirdSupply.setCurrentActionText(
                "This bird doesn't have any eggs. Select a different bird."
              );
            } else {
              removeEgg(
                setHabitat,
                space,

                setPlayerEggs,
                brownBirdSupply.setCurrentActionText,
                brownBirdSupply.setDisableClick,
                brownBirdSupply.setResourceQuantity,
                brownBirdSupply.resourceQuantity
              );
              setRemovedEggList((state) => {
                state[location].push(space);
              });
            }
            break;
          case "wetland":
            if (currentEggs > 0) {
              discardEgg(
                setHabitat,
                space,

                setPlayerEggs,

                brownBirdSupply.setDisableClick,
                brownBirdSupply.setResourceQuantity
              );
            }
            break;

          case "brownRepeat":
            if (brownBirdSupply.brownBirdCopy.location !== location) {
              brownBirdSupply.setCurrentActionText(
                `Select a bird in the ${brownBirdSupply.brownBirdCopy.location} habitat.`
              );
            } else if (bird.power.color !== "brown") {
              brownBirdSupply.setCurrentActionText(
                `Select a bird with a brown power.`
              );
            } else {
              if (brownBirdSupply.brownBirdCopy.currentSpace == space) {
                brownBirdSupply.setCurrentActionText(
                  "Can't select the same bird..."
                );
              } else {
                brownPowerCheck(habitat, space, brownBirdSupply);
              }
            }
            break;
        }
      }
      return;
    }
  };

  return (
    <div className="col-span-2  " onClick={birdCardClick}>
      <p>Eggs on bird: {currentEggs}</p>
      <p>Tucked Cards: {currentTucked}</p>
      <BirdLayout bird={bird} />
    </div>
  );
};

export default PlayedBirdCard;

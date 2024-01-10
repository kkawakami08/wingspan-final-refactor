import { useAtom } from "jotai";
import {
  currentActionAtom,
  disableClickAtom,
  resourceQuantityAtom,
  playerEggSupplyAtom,
  currentActionTextAtom,
  removedEggListAtom,
  grasslandBrownBirdsAtom,
  brownBirdCopyAtom,
  grasslandAtom,
  brownBirdVariableAtom,
  brownPowerContinueBtnAtom,
  birdFeederAtom,
  forestAtom,
  wetlandAtom,
  selectedFoodAtom,
  eggTrackerAtom,
} from "../../../../utils/jotaiStore";
import {
  layEgg,
  resetFromGrassland,
} from "../../../../utils/gameFunctions/grasslandFunctions";
import { removeEgg } from "../../../../utils/gameFunctions/playABirdFunctions";
import { discardEgg } from "../../../../utils/gameFunctions/wetlandFunctions";
import {
  activateBrownPowers,
  continueBrownPower,
} from "../../../../utils/gameFunctions/birdPowerFunctions";

const PlayedBirdCard = ({
  habitat,
  setHabitat,
  space,
  location,
  brownBirdSupply,
}) => {
  const bird = habitat[space].bird;
  const currentEggs = habitat[space].eggCount;
  const currentCache = habitat[space].cacheCount;

  const [resourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setPlayerEggs] = useAtom(playerEggSupplyAtom);
  const [, setRemovedEggList] = useAtom(removedEggListAtom);
  const [grasslandBrownBirds] = useAtom(grasslandBrownBirdsAtom);
  const [eggTracker, setEggTracker] = useAtom(eggTrackerAtom);
  const [brownBirdVariable] = useAtom(brownBirdVariableAtom);

  const [disableClick] = useAtom(disableClickAtom);
  const disableBirdCard = disableClick.playedBird;

  const birdCardClick = () => {
    if (disableBirdCard) console.log("Disabled");
    else {
      switch (brownBirdSupply.currentAction) {
        case "grassland":
          if (currentEggs == bird.egg_limit) {
            brownBirdSupply.setCurrentActionText(
              "Can't place any more eggs on this bird."
            );
          } else {
            layEgg(
              setHabitat,
              space,
              brownBirdSupply.setResourceQuantity,
              setPlayerEggs
            );
            if (resourceQuantity - 1 == 0) {
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
            }
          }

          break;
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
              resourceQuantity
            );
            continueBrownPower(brownBirdSupply);
          }

          break;
        case "brownEgg":
          if (bird.egg_limit == currentEggs) {
            brownBirdSupply.setCurrentActionText(
              "Cannot place an egg on this bird. "
            );
          } else {
            if (brownBirdVariable === "this") {
              if (
                brownBirdSupply.brownBirdCopy.currentSpace !== Number(space) &&
                brownBirdSupply.brownBirdCopy.location === location
              ) {
                brownBirdSupply.setCurrentActionText(
                  "Must place egg on correct bird."
                );
                break;
              }
            }
            layEgg(
              setHabitat,
              space,
              brownBirdSupply.setResourceQuantity,
              setPlayerEggs
            );
            continueBrownPower(brownBirdSupply);
          }

          break;
        case "brownNest":
          if (
            eggTracker.includes(bird.common_name) ||
            bird.nest !== brownBirdVariable ||
            bird.egg_limit == currentEggs
          ) {
            brownBirdSupply.setCurrentActionText(
              "Cannot place an egg on this bird. Select a different one."
            );
          } else {
            layEgg(
              setHabitat,
              space,
              brownBirdSupply.setResourceQuantity,
              setPlayerEggs
            );
            setEggTracker((state) => [...state, bird.common_name]);
            if (resourceQuantity - 1 == 0) {
              setEggTracker([]);
              continueBrownPower(brownBirdSupply);
            } else {
              brownBirdSupply.setCurrentActionText(
                "Select another bird to lay an egg on."
              );
            }
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
              resourceQuantity
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
      }
    }
  };

  const foodContent = bird.food.map((food, index) => (
    <p className="bg-emerald-900 text-white p-2 rounded-lg" key={index}>
      {food}
    </p>
  ));
  const habitatContent = bird.habitat.map((habitat, index) => (
    <p className="bg-white text-emerald-900 p-2 rounded-lg" key={index}>
      {habitat}
    </p>
  ));

  let powerCSS = "";
  let powerPrefix = "";
  switch (bird.power.color) {
    case "brown":
      powerCSS = "p-2 w-full bg-amber-500";
      powerPrefix = "When Activated: ";
      break;
    case "pink":
      powerCSS = "p-2 w-full bg-pink-500";
      powerPrefix = "Once Between Turns: ";
      break;
    case "white":
      powerCSS = "p-2 w-full bg-white";
      powerPrefix = "When Played: ";
      break;
  }

  return (
    <div
      className="col-span-2 w-full h-full bg-emerald-500  rounded-lg  flex flex-col text-center"
      onClick={birdCardClick}
    >
      <div className="p-3 flex flex-col gap-2">
        <p className="text-xl font-semibold text-emerald-900">
          {bird.common_name}
        </p>
        {/* <div className="flex gap-3 justify-center flex-wrap">{foodContent}</div>
      <div>{habitatContent}</div> */}
        <p className="text-white text-lg">Nest Type: {bird.nest}</p>
        <p className="text-white text-lg">Eggs laid: {currentEggs}</p>
        <p className="text-white text-lg">Egg limit: {bird.egg_limit}</p>
        <p className="text-white text-lg">Cache Count: {currentCache}</p>
      </div>
      <div className={powerCSS}>
        <p className="font-semibold text-lg text-black">
          {powerPrefix}
          <span className="font-normal text-md">{bird.power.description}</span>
        </p>
      </div>
    </div>
  );
};

export default PlayedBirdCard;

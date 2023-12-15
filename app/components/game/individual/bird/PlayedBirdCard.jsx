import { useAtom } from "jotai";
import {
  currentActionAtom,
  disableClickAtom,
  resourceQuantityAtom,
  playerEggSupplyAtom,
  currentActionTextAtom,
  removedEggListAtom,
} from "../../../../utils/jotaiStore";
import {
  layEgg,
  resetFromGrassland,
} from "../../../../utils/gameFunctions/grasslandFunctions";
import { removeEgg } from "../../../../utils/gameFunctions/playABirdFunctions";
import { discardEgg } from "../../../../utils/gameFunctions/wetlandFunctions";

const PlayedBirdCard = ({ habitat, setHabitat, space, location }) => {
  const bird = habitat[space].bird;
  const currentEggs = habitat[space].eggCount;

  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setPlayerEggs] = useAtom(playerEggSupplyAtom);
  const [removedEggList, setRemovedEggList] = useAtom(removedEggListAtom);

  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableBirdCard = disableClick.playedBird;

  const birdCardClick = () => {
    if (disableBirdCard) console.log("Disabled");
    else {
      switch (currentAction) {
        case "grassland":
          if (currentEggs == bird.egg_limit) {
            console.log(currentEggs, bird.egg_limit);
          } else {
            layEgg(setHabitat, space, setResourceQuantity, setPlayerEggs);
            if (resourceQuantity - 1 == 0) {
              resetFromGrassland(
                setDisableClick,
                setCurrentAction,
                setCurrentActionText
              );
            }
          }

          break;
        case "playBird":
          if (currentEggs == 0) {
            setCurrentActionText(
              "This bird doesn't have any eggs. Select a different bird."
            );
          } else {
            removeEgg(
              setHabitat,
              space,

              setPlayerEggs,
              setCurrentActionText,
              setDisableClick,
              setResourceQuantity,
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

              setDisableClick,
              setResourceQuantity
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

  return (
    <div
      className="col-span-2  border-2 flex flex-col items-center p-3 rounded-lg text-lg font-semibold justify-center text-center h-full w-full bg-emerald-500 gap-2"
      onClick={birdCardClick}
    >
      <p className="text-xl font-semibold text-white">{bird.common_name}</p>
      {/* <div className="flex gap-3 justify-center flex-wrap">{foodContent}</div>
      <div>{habitatContent}</div> */}
      <p className="text-white text-lg">Eggs laid: {currentEggs}</p>
      <p className="text-white text-lg">Egg limit: {bird.egg_limit}</p>
    </div>
  );
};

export default PlayedBirdCard;

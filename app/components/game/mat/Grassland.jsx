import { useAtom } from "jotai";
import {
  currentActionAtom,
  resourceQuantityAtom,
  disableClickAtom,
  grasslandBirdCountAtom,
  currentActionTextAtom,
  playBirdAtom,
  playerEggSupplyAtom,
  playerBirdHandAtom,
  playerFoodSupplyAtom,
  forestAtom,
  grasslandAtom,
  wetlandAtom,
  grasslandBrownBirdsAtom,
  brownBirdCopyAtom,
  birdFeederAtom,
  brownBirdVariableAtom,
  brownPowerContinueBtnAtom,
} from "../../../utils/jotaiStore";
import { activateHabitat } from "../../../utils/gameFunctions/habitatFunctions";
import DiscardEggs from "../individual/buttons/DiscardEggs";
import { eggReqCheck } from "../../../utils/gameFunctions/playABirdFunctions";
import { checkBirdEggCapacity } from "../../../utils/gameFunctions/grasslandFunctions";
import { activateBrownPowers } from "../../../utils/gameFunctions/birdPowerFunctions";

const Grassland = () => {
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableGrassland = disableClick.habitats;
  const [grasslandBirdCount] = useAtom(grasslandBirdCountAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [, setPlayBird] = useAtom(playBirdAtom);
  const [playerEggs, setPlayerEggs] = useAtom(playerEggSupplyAtom);
  const [birdHand] = useAtom(playerBirdHandAtom);
  const [playerFood] = useAtom(playerFoodSupplyAtom);
  const [forest] = useAtom(forestAtom);
  const [grassland] = useAtom(grasslandAtom);
  const [wetland] = useAtom(wetlandAtom);
  const [birdFeeder] = useAtom(birdFeederAtom);

  const [grasslandBrownBirds] = useAtom(grasslandBrownBirdsAtom);
  const [, setBrownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [, setBrownBirdVariable] = useAtom(brownBirdVariableAtom);
  const [brownPowerContinueBtn, setBrownPowerContinueBtn] = useAtom(
    brownPowerContinueBtnAtom
  );

  const brownBirdSupply = {
    birdFeeder: birdFeeder,
    setDisableClick: setDisableClick,
    setCurrentActionText: setCurrentActionText,
    setResourceQuantity: setResourceQuantity,
    setBrownBirdVariable: setBrownBirdVariable,
    setBrownPowerContinueBtn: setBrownPowerContinueBtn,
    brownPowerContinueBtn: brownPowerContinueBtn,
    setCurrentAction: setCurrentAction,
  };

  const grasslandClick = () => {
    if (disableGrassland) console.log("Disabled");
    else {
      if (currentAction === "playBird") {
        eggReqCheck(
          grasslandBirdCount,
          setDisableClick,
          playerEggs,
          setCurrentActionText,
          setPlayBird,
          "grassland",
          birdHand,
          playerFood,
          setResourceQuantity
        );
      } else {
        if (checkBirdEggCapacity(forest, grassland, wetland)) {
          setCurrentActionText(
            "There are no birds to lay eggs. Continuing with brown birds"
          );
          if (grasslandBrownBirds.length) {
            setBrownBirdCopy((state) => ({
              ...state,
              location: "grassland",
            }));
            activateBrownPowers(
              grassland,
              grasslandBrownBirds,
              setBrownBirdCopy,
              brownBirdSupply
            );
          }
        } else {
          activateHabitat(
            setCurrentAction,
            "grassland",
            grasslandBirdCount,
            setResourceQuantity,
            setDisableClick
          );
        }
      }
    }
  };

  return (
    <div
      className="bg-amber-700 p-5 rounded-lg text-white font-semibold text-2xl row-start-5 row-span-2 flex flex-col gap-5 items-center justify-center text-center"
      onClick={grasslandClick}
    >
      <p>Grassland</p>
      <p className="font-normal text-lg">Lay eggs</p>
      {currentAction === "grassland" ||
        (currentAction === "brownEgg" && <DiscardEggs />)}
    </div>
  );
};

export default Grassland;

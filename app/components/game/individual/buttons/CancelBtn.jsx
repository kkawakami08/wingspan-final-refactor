import { useAtom } from "jotai";
import {
  playBirdAtom,
  currentActionAtom,
  selectedBirdsAtom,
  playerBirdHandAtom,
  disableClickAtom,
  resourceQuantityAtom,
  playerEggSupplyAtom,
  currentActionTextAtom,
  removedEggListAtom,
  forestAtom,
  grasslandAtom,
  wetlandAtom,
} from "../../../../utils/jotaiStore";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";
import { replaceEggs } from "../../../../utils/gameFunctions/playABirdFunctions";

const CancelBtn = () => {
  const [playBirdState, setPlayBirdState] = useAtom(playBirdAtom);
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);

  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setPlayerEggs] = useAtom(playerEggSupplyAtom);
  const [removedEggList, setRemovedEggList] = useAtom(removedEggListAtom);
  const [, setForest] = useAtom(forestAtom);
  const [, setGrassland] = useAtom(grasslandAtom);
  const [, setWetland] = useAtom(wetlandAtom);

  const cancelPlayBirdClick = () => {
    if (selectedBirds.length) {
      setBirdHand((hand) => {
        hand.push(...selectedBirds);
        return hand;
      });
      setSelectedBirds((state) => {
        state = [];
        return state;
      });
    }
    if (resourceQuantity == 0) {
      setPlayerEggs((eggs) => eggs + playBirdState.eggReq);
    } else {
      setPlayerEggs((eggs) => eggs + 1);
    }
    replaceEggs(removedEggList, setForest, setGrassland, setWetland);
    setRemovedEggList((list) => {
      list = { forest: [], grassland: [], wetland: [] };
      return list;
    });
    resetAction(
      setDisableClick,
      setResourceQuantity,
      setCurrentAction,
      setPlayBirdState,
      setCurrentActionText
    );
  };

  return (
    <button
      className="bg-violet-300 text-violet-900 text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300 border-2 rounded-lg"
      onClick={cancelPlayBirdClick}
    >
      Cancel Play a bird Action
    </button>
  );
};

export default CancelBtn;

import { useAtom } from "jotai";
import {
  playBirdAtom,
  currentActionAtom,
  selectedBirdsAtom,
  playerBirdHandAtom,
  disableClickAtom,
  resourceQuantityAtom,
  playerEggSupplyAtom,
  grasslandPlayableAtom,
} from "../../../../utils/jotaiStore";
import { resetAction } from "../../../../utils/gameFunctions/habitatFunctions";

const CancelBtn = () => {
  const [playBirdState, setPlayBirdState] = useAtom(playBirdAtom);
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [, setDisableClick] = useAtom(disableClickAtom);
  const [, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [, setPlayerEggs] = useAtom(playerEggSupplyAtom);
  const [, setGrassLandPlayable] = useAtom(grasslandPlayableAtom);

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
    setPlayerEggs((eggs) => eggs + playBirdState.eggReq);

    resetAction(
      setDisableClick,
      setResourceQuantity,
      setCurrentAction,
      setPlayBirdState,
      setGrassLandPlayable
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

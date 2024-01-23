import { useAtom } from "jotai";
import {
  playBirdAtom,
  selectedBirdsAtom,
  playerBirdHandAtom,
  playerEggSupplyAtom,
  removedEggListAtom,
} from "../../../../utils/jotaiStore";
import { resetPlayBirdAction } from "../../../../utils/gameFunctions/playABirdFunctions";
import { replaceEggs } from "../../../../utils/gameFunctions/playABirdFunctions";

const CancelBtn = ({ brownBirdSupply }) => {
  const [playBirdState] = useAtom(playBirdAtom);

  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [, setPlayerEggs] = useAtom(playerEggSupplyAtom);
  const [removedEggList, setRemovedEggList] = useAtom(removedEggListAtom);

  const cancelPlayBirdClick = () => {
    if (selectedBirds.length) {
      setBirdHand((hand) => {
        hand.push(...selectedBirds);
        return hand;
      });
      setSelectedBirds([]);
    }
    if (brownBirdSupply.resourceQuantity == 0) {
      setPlayerEggs((eggs) => eggs + playBirdState.eggReq);
    } else {
      setPlayerEggs((eggs) => eggs + 1);
    }
    replaceEggs(
      removedEggList,
      brownBirdSupply.setForest,
      brownBirdSupply.setGrassland,
      brownBirdSupply.setWetland
    );
    setRemovedEggList((list) => {
      list = { forest: [], grassland: [], wetland: [] };
      return list;
    });
    resetPlayBirdAction(
      brownBirdSupply.setDisableClick,
      brownBirdSupply.setResourceQuantity,
      brownBirdSupply.setCurrentAction,
      brownBirdSupply.setPlayBirdState,
      brownBirdSupply.setCurrentActionText
    );
  };

  return (
    <button
      className="bg-violet-300 text-violet-900 text-lg font-semibold rounded-lg p-3  border-2 rounded-lg"
      onClick={cancelPlayBirdClick}
    >
      Cancel Play a bird Action
    </button>
  );
};

export default CancelBtn;

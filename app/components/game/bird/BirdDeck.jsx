import { useAtom } from "jotai";
import {
  birdDeckAtom,
  playerBirdHandAtom,
  disableClickAtom,
  resourceQuantityAtom,
  birdTrayAtom,
  selectedBirdsAtom,
  currentActionAtom,
  currentActionTextAtom,
} from "../../../utils/jotaiStore";

import { drawBirdDeck } from "../../../utils/gameFunctions/wetlandFunctions";

const BirdDeck = () => {
  const [birdDeck] = useAtom(birdDeckAtom);
  const [, setBirdTray] = useAtom(birdTrayAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setPlayerBirdHand] = useAtom(playerBirdHandAtom);

  const [disableClick, setDisableClick] = useAtom(disableClickAtom);
  const disableBirdDeck = disableClick.birdDeck;

  const [resourceQuantity, setResourceQuantity] = useAtom(resourceQuantityAtom);
  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);

  const wetlandAction = {
    birdDeck,
    setPlayerBirdHand,
    resourceQuantity,
    setResourceQuantity,
    selectedBirds,
    setSelectedBirds,
    setBirdTray,
    setCurrentAction,
    setDisableClick,
    setCurrentActionText,
  };

  const birdDeckClick = () => {
    if (disableBirdDeck) console.log("Disabled");
    else {
      switch (currentAction) {
        case "wetland":
          drawBirdDeck(wetlandAction);
          break;
      }
    }
  };

  return (
    <div
      className="bg-emerald-900 w-56 h-72 rounded-lg text-white font-bold text-2xl flex items-center justify-center col-span-2"
      onClick={birdDeckClick}
    >
      BirdDeck
    </div>
  );
};

export default BirdDeck;

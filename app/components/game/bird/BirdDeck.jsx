import { useAtom } from "jotai";
import {
  birdDeckAtom,
  playerBirdHandAtom,
  disableClickAtom,
  resourceQuantityAtom,
  birdTrayAtom,
  selectedBirdsAtom,
  wetlandBrownBirdsAtom,
} from "../../../utils/jotaiStore";

import { drawBirdDeck } from "../../../utils/gameFunctions/wetlandFunctions";
import { resetAction } from "../../../utils/gameFunctions/habitatFunctions";
import { activateBrownPowers } from "../../../utils/gameFunctions/birdPowerFunctions";

const BirdDeck = ({ brownBirdSupply }) => {
  const [birdDeck] = useAtom(birdDeckAtom);
  const [, setBirdTray] = useAtom(birdTrayAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setPlayerBirdHand] = useAtom(playerBirdHandAtom);

  const [disableClick] = useAtom(disableClickAtom);
  const disableBirdDeck = disableClick.birdDeck;

  const [resourceQuantity] = useAtom(resourceQuantityAtom);
  const [wetlandBrownBirds] = useAtom(wetlandBrownBirdsAtom);

  const wetlandAction = {
    birdDeck: birdDeck,
    setPlayerBirdHand: setPlayerBirdHand,
    resourceQuantity: resourceQuantity,
    setResourceQuantity: brownBirdSupply.setResourceQuantity,
    selectedBirds: selectedBirds,
    setSelectedBirds: setSelectedBirds,
    setBirdTray: setBirdTray,
  };

  const birdDeckClick = () => {
    if (disableBirdDeck) {
      console.log("Disabled");
    } else {
      switch (brownBirdSupply.currentAction) {
        case "wetland":
          const continueDrawing = drawBirdDeck(wetlandAction);
          if (continueDrawing) {
            return;
          } else {
            if (!wetlandBrownBirds.length) {
              break;
            } else {
              brownBirdSupply.setBrownBirdCopy((state) => ({
                ...state,
                location: "wetland",
              }));

              activateBrownPowers(
                brownBirdSupply.wetland,
                wetlandBrownBirds,
                brownBirdSupply
              );
              return;
            }
          }
      }
      resetAction(
        brownBirdSupply.setDisableClick,
        brownBirdSupply.setResourceQuantity,
        brownBirdSupply.setCurrentAction,
        brownBirdSupply.setCurrentActionText
      );
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

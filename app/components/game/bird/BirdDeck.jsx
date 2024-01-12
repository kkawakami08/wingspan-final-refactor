import { useAtom } from "jotai";
import {
  birdDeckAtom,
  playerBirdHandAtom,
  disableClickAtom,
  birdTrayAtom,
  selectedBirdsAtom,
  wetlandBrownBirdsAtom,
} from "../../../utils/jotaiStore";
import { drawCard } from "../../../utils/gameFunctions/cardFunctions";

import { drawBirdDeck } from "../../../utils/gameFunctions/wetlandFunctions";
import { resetAction } from "../../../utils/gameFunctions/habitatFunctions";
import {
  activateBrownPowers,
  continueBrownPower,
} from "../../../utils/gameFunctions/birdPowerFunctions";

const BirdDeck = ({ brownBirdSupply }) => {
  const [birdDeck] = useAtom(birdDeckAtom);
  const [, setBirdTray] = useAtom(birdTrayAtom);
  const [selectedBirds, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setPlayerBirdHand] = useAtom(playerBirdHandAtom);

  const [disableClick] = useAtom(disableClickAtom);
  const disableBirdDeck = disableClick.birdDeck;

  const [wetlandBrownBirds] = useAtom(wetlandBrownBirdsAtom);

  const wetlandAction = {
    birdDeck: birdDeck,
    setPlayerBirdHand: setPlayerBirdHand,
    resourceQuantity: brownBirdSupply.resourceQuantity,
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
            if (wetlandBrownBirds.length) {
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
            } else break;
          }
        case "brownCard":
          //1 resource quantity

          drawCard(birdDeck, setPlayerBirdHand);
          brownBirdSupply.setResourceQuantity((state) => state - 1);
          if (brownBirdSupply.resourceQuantity - 1 == 0) {
            continueBrownPower(brownBirdSupply);
          } else {
            return;
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

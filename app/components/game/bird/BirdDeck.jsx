import { useAtom } from "jotai";
import {
  birdDeckAtom,
  playerBirdHandAtom,
  disableClickAtom,
  birdTrayAtom,
  selectedBirdsAtom,
  wetlandBrownBirdsAtom,
  birdDiscardAtom,
} from "../../../utils/jotaiStore";
import { drawCard } from "../../../utils/gameFunctions/cardFunctions";

import { drawBirdDeck } from "../../../utils/gameFunctions/wetlandFunctions";
import { resetAction } from "../../../utils/gameFunctions/habitatFunctions";
import {
  activateBrownPowers,
  continueBrownPower,
  tuckCard,
} from "../../../utils/gameFunctions/birdPowerFunctions";
import { resetPlayBirdAction } from "../../../utils/gameFunctions/playABirdFunctions";

const BirdDeck = ({ brownBirdSupply }) => {
  const [birdDeck] = useAtom(birdDeckAtom);
  const [, setBirdDiscard] = useAtom(birdDiscardAtom);
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
    if (!disableBirdDeck) {
      if (brownBirdSupply.currentAction.includes("Card")) {
        //1 resource quantity
        drawCard(birdDeck, setPlayerBirdHand);
        brownBirdSupply.setResourceQuantity((state) => state - 1);
        if (brownBirdSupply.resourceQuantity - 1 == 0) {
          if (brownBirdSupply.currentAction.includes("brown")) {
            continueBrownPower(brownBirdSupply);
          } else {
            resetPlayBirdAction(
              brownBirdSupply.setDisableClick,
              brownBirdSupply.setResourceQuantity,
              brownBirdSupply.setCurrentAction,
              brownBirdSupply.setPlayBirdState,
              brownBirdSupply.setCurrentActionText
            );
          }
        }
        return;
      } else {
        switch (brownBirdSupply.currentAction) {
          case "wetland":
            const continueDrawing = drawBirdDeck(wetlandAction);
            if (!continueDrawing) {
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
              } else {
                resetAction(
                  brownBirdSupply.setDisableClick,
                  brownBirdSupply.setResourceQuantity,
                  brownBirdSupply.setCurrentAction,
                  brownBirdSupply.setCurrentActionText
                );
              }
            }
            return;

          case "brownWing":
            const currentCard = birdDeck.pop();
            setSelectedBirds([currentCard]);
            if (currentCard.wingspan < brownBirdSupply.brownBirdVariable) {
              tuckCard(brownBirdSupply);

              brownBirdSupply.setCurrentActionText(
                `Tucked ${currentCard.common_name} under bird. Click next power to continue.`
              );
            } else {
              setBirdDiscard((state) => [...state, currentCard]);
              brownBirdSupply.setCurrentActionText(
                `${currentCard.common_name} has a bigger wingspan. Click next power to continue.`
              );
            }
            return;

          case "brownTuck":
            //1 resource quantity

            tuckCard(brownBirdSupply);
            setSelectedBirds([]);
            brownBirdSupply.setResourceQuantity((state) => state - 1);
            if (brownBirdSupply.resourceQuantity - 1 == 0) {
              continueBrownPower(brownBirdSupply);
            }
            return;
        }
      }
    }
  };

  return (
    <div
      className=" bg-emerald-900  rounded-lg text-white font-bold text-2xl flex items-center justify-center "
      onClick={birdDeckClick}
    >
      BirdDeck
    </div>
  );
};

export default BirdDeck;

import { drawCard } from "./cardFunctions";
import { resetAction } from "./habitatFunctions";

export const drawBirdDeck = ({
  birdDeck,
  setPlayerBirdHand,
  resourceQuantity,
  setResourceQuantity,
  selectedBirds,
  setSelectedBirds,
  setBirdTray,
  setCurrentAction,
  setDisableClick,
}) => {
  drawCard(birdDeck, setPlayerBirdHand);
  setResourceQuantity((prev) => prev - 1);
  if (resourceQuantity - 1 === 0) {
    if (selectedBirds.length > 0) {
      setBirdTray((tray) => {
        tray.push(...selectedBirds);
        return tray;
      });
      setSelectedBirds((birds) => {
        birds = [];
        return birds;
      });
    }
    resetAction(setDisableClick, setResourceQuantity, setCurrentAction);
  }
};

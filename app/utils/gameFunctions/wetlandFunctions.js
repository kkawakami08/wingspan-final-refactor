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
    return false;
  }
  return true;
};

export const discardEgg = (
  setHabitat,
  space,
  setPlayerEggs,
  setDisableClick,
  setResourceQuantity
) => {
  setHabitat((habitat) => {
    habitat[space].eggCount = habitat[space].eggCount - 1;
  });
  setPlayerEggs((eggs) => eggs - 1);
  setResourceQuantity((state) => state + 1);

  setDisableClick((state) => ({
    ...state,

    playedBird: true,
  }));
};

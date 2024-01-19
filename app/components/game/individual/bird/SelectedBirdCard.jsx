import { useAtom } from "jotai";
import {
  birdTrayAtom,
  currentActionAtom,
  playerBirdHandAtom,
  selectedCardsAtom,
} from "../../../../utils/jotaiStore";
import GeneralBirdCard from "./GeneralBirdCard";

const SelectedBirdCard = ({ bird }) => {
  const [, setBirdTray] = useAtom(birdTrayAtom);
  const [, setSelectedCards] = useAtom(selectedCardsAtom);
  const [, setBirdHand] = useAtom(playerBirdHandAtom);
  const [currentAction] = useAtom(currentActionAtom);

  const selectedBirdCardType = () => {
    switch (currentAction) {
      case "wetland":
        return (
          <GeneralBirdCard bird={bird} type={setBirdTray} selected={true} />
        );
      case "whiteSelect":
        return (
          <GeneralBirdCard
            bird={bird}
            type={setSelectedCards}
            selected={true}
          />
        );
      case "whiteCard":
        return;
      default:
        return (
          <GeneralBirdCard bird={bird} type={setBirdHand} selected={true} />
        );
    }
  };

  return (
    <div className="bg-emerald-300 w-72 h-96 rounded-lg  flex flex-col gap-3 text-center shrink">
      {selectedBirdCardType()}
    </div>
  );
};

export default SelectedBirdCard;

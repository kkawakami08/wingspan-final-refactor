import { useAtom } from "jotai";
import { selectedBirdsAtom } from "../../../../utils/jotaiStore";
import { selectCard } from "../../../../utils/gameFunctions/cardFunctions";
import BirdLayout from "./BirdLayout";

const GeneralBirdCard = ({ bird, type, disabled, selected }) => {
  const [, setSelectedBirds] = useAtom(selectedBirdsAtom);

  const birdCardClick = () => {
    if (selected) {
      selectCard(setSelectedBirds, type, "common_name", bird.common_name, bird);
    } else {
      if (!disabled) {
        selectCard(
          type,
          setSelectedBirds,
          "common_name",
          bird.common_name,
          bird
        );
      }
    }
  };

  return (
    <div onClick={birdCardClick} className="w-[17rem]">
      <BirdLayout bird={bird} />
    </div>
  );
};

export default GeneralBirdCard;

import { useAtom } from "jotai";
import { selectedCardsAtom } from "../../../utils/jotaiStore";
import BrownDiscardBtn from "../individual/buttons/brownDiscardBtn";
BrownDiscardBtn;
import OptionBirdCard from "../individual/bird/OptionBirdCard";

const BirdCardOptions = ({}) => {
  const [selectedCards] = useAtom(selectedCardsAtom);

  const birdCardOptionsContent = selectedCards.map((bird) => (
    <OptionBirdCard key={bird.common_name} bird={bird} />
  ));

  return (
    <div className=" col-start-1 col-span-5 row-start-6 bg-slate-200 rounded-lg p-3 flex flex-col items-center justify-between gap-3">
      <p className="text-emerald-900 font-semibold text-lg text-center pb-3">
        Bird Choices
      </p>
      <div className=" flex flex-wrap gap-5 justify-center ">
        {birdCardOptionsContent}
      </div>
    </div>
  );
};

export default BirdCardOptions;

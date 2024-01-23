import { useAtom } from "jotai";
import { selectedCardsAtom } from "../../../utils/jotaiStore";
import GeneralBirdCard from "../individual/bird/GeneralBirdCard";

const BirdCardOptions = ({}) => {
  const [selectedCards, setSelectedCards] = useAtom(selectedCardsAtom);

  const birdCardOptionsContent = selectedCards.map((bird) => (
    <GeneralBirdCard
      key={bird.common_name}
      bird={bird}
      type={setSelectedCards}
      disabled={false}
      selected={false}
    />
  ));

  return (
    <div className="  bg-slate-200 rounded-lg p-3 flex flex-col items-center justify-between gap-3">
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

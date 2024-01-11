import { useAtom } from "jotai";
import { selectedBirdsAtom, playBirdAtom } from "../../../utils/jotaiStore";
import SelectedBirdCard from "../individual/bird/SelectedBirdCard";
import DiscardBtn from "../individual/buttons/DiscardBtn";
import SelectBtn from "../individual/buttons/SelectBtn";
import BrownDiscardBtn from "../individual/buttons/brownDiscardBtn";
BrownDiscardBtn;

const SelectedBirds = ({ brownBirdSupply }) => {
  const [selectedBirds] = useAtom(selectedBirdsAtom);
  const [playBirdState] = useAtom(playBirdAtom);

  const selectedBirdsContent = selectedBirds.map((bird) => (
    <SelectedBirdCard key={bird.common_name} bird={bird} />
  ));

  const btnDisplay = () => {
    switch (brownBirdSupply.currentAction) {
      case "forest":
        return <DiscardBtn brownBirdSupply={brownBirdSupply} />;
      case "wetland":
        return <SelectBtn brownBirdSupply={brownBirdSupply} />;
      case "playBird":
        return <SelectBtn brownBirdSupply={brownBirdSupply} />;
      case "discard":
        return <BrownDiscardBtn brownBirdSupply={brownBirdSupply} />;
      default:
        break;
    }
  };

  return (
    <div className=" col-start-8 col-span-5 row-start-1 bg-slate-200 rounded-lg p-3 flex flex-col items-center justify-between gap-3">
      <p className="text-emerald-900 font-semibold text-lg text-center pb-3">
        Selected Birds
      </p>
      <div className=" flex flex-wrap gap-5 justify-center ">
        {selectedBirdsContent}
      </div>
      {!playBirdState.bird && btnDisplay()}
    </div>
  );
};

export default SelectedBirds;

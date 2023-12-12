import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  currentActionAtom,
} from "../../../utils/jotaiStore";
import SelectedBirdCard from "../individual/bird/SelectedBirdCard";
import DiscardBtn from "../individual/buttons/DiscardBtn";
import SelectBtn from "../individual/buttons/SelectBtn";

const SelectedBirds = () => {
  const [selectedBirds] = useAtom(selectedBirdsAtom);
  const [currentAction] = useAtom(currentActionAtom);

  const selectedBirdsContent = selectedBirds.map((bird) => (
    <SelectedBirdCard key={bird.common_name} bird={bird} />
  ));

  const btnDisplay = () => {
    switch (currentAction) {
      case "forest":
        return <DiscardBtn />;
      case "wetland":
        return <SelectBtn />;
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
      {btnDisplay()}
    </div>
  );
};

export default SelectedBirds;

import { useAtom } from "jotai";
import { selectedBirdsAtom, playBirdAtom } from "../../../utils/jotaiStore";
import SelectedBirdCard from "../individual/bird/SelectedBirdCard";
import DiscardBtn from "../individual/buttons/DiscardBtn";
import SelectBtn from "../individual/buttons/SelectBtn";
import BrownDiscardBtn from "../individual/buttons/brownDiscardBtn";
import BrownSelectBtn from "../individual/buttons/brownSelectBtn";
BrownDiscardBtn;
import WhiteSelectBtn from "../individual/buttons/WhiteSelectBtn";

const SelectedBirds = ({ brownBirdSupply, moveBirdSupply }) => {
  const [selectedBirds] = useAtom(selectedBirdsAtom);
  const [playBirdState] = useAtom(playBirdAtom);

  const selectedBirdsContent = selectedBirds.map((bird) => (
    <SelectedBirdCard key={bird.common_name} bird={bird} />
  ));

  const btnDisplay = () => {
    switch (brownBirdSupply.currentAction) {
      case "forest":
        return (
          <DiscardBtn
            brownBirdSupply={brownBirdSupply}
            moveBirdSupply={moveBirdSupply}
          />
        );
      case "wetland":
        return <SelectBtn brownBirdSupply={brownBirdSupply} />;
      case "playBird":
        return <SelectBtn brownBirdSupply={brownBirdSupply} />;

      case "discard":
        return <BrownDiscardBtn brownBirdSupply={brownBirdSupply} />;
      case "brownTuck":
        return <BrownSelectBtn brownBirdSupply={brownBirdSupply} />;
      case "whiteSelect":
        return <WhiteSelectBtn brownBirdSupply={brownBirdSupply} />;
      case "whiteCard":
        return <WhiteSelectBtn brownBirdSupply={brownBirdSupply} />;
      default:
        break;
    }
  };

  return (
    <div className="col-span-6  bg-slate-200 rounded-lg p-3 flex flex-col items-center justify-between gap-3">
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

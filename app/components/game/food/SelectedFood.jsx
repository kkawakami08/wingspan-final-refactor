import { useAtom } from "jotai";
import { selectedFoodAtom } from "../../../utils/jotaiStore";
import DiscardBtn from "../individual/buttons/DiscardBtn";
import SelectBtn from "../individual/buttons/SelectBtn";
import BrownSelectBtn from "../individual/buttons/brownSelectBtn";
import SelectedFoodToken from "../individual/food/SelectedFoodToken";
import BrownDiscardBtn from "../individual/buttons/brownDiscardBtn";

const SelectedFood = ({ brownBirdSupply }) => {
  const [selectedFood] = useAtom(selectedFoodAtom);

  const selectedFoodContent = selectedFood.map((food) => (
    <SelectedFoodToken key={food.id} food={food} />
  ));

  const btnDisplay = () => {
    switch (brownBirdSupply.currentAction) {
      case "forest":
        return <SelectBtn brownBirdSupply={brownBirdSupply} />;

      case "grassland":
        return <DiscardBtn brownBirdSupply={brownBirdSupply} />;
      case "playBird":
        return <DiscardBtn />;
      case "brownFeeder":
        return <BrownSelectBtn brownBirdSupply={brownBirdSupply} />;
      case "brownFood":
        return <BrownDiscardBtn brownBirdSupply={brownBirdSupply} />;
      default:
        break;
    }
  };

  return (
    <div className=" col-start-8 col-span-5 row-start-3 row-span-2 bg-slate-200 rounded-lg p-3 flex flex-col items-center justify-between gap-3">
      <p className="text-indigo-900 font-semibold text-lg text-center pb-3">
        Selected Food
      </p>
      <div className=" flex flex-wrap gap-5 justify-center ">
        {selectedFoodContent}
      </div>
      {btnDisplay()}
    </div>
  );
};

export default SelectedFood;

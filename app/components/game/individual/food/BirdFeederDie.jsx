import { useAtom } from "jotai";
import {
  disableClickAtom,
  birdFeederAtom,
  selectedFoodAtom,
} from "../../../../utils/jotaiStore";
import { foodSelection } from "../../../../utils/gameFunctions/foodFunctions";

const BirdFeederDie = ({ die }) => {
  const [disableClick] = useAtom(disableClickAtom);
  const disableBirdFeeder = disableClick.birdFeeder;

  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [, setSelectedFood] = useAtom(selectedFoodAtom);

  const birdFeederClick = () => {
    if (disableBirdFeeder) console.log("disabled");
    else {
      foodSelection(birdFeeder, setSelectedFood, setBirdFeeder, die.id);
    }
  };

  return (
    <div
      className="bg-indigo-500 p-3 rounded-lg text-white"
      onClick={birdFeederClick}
    >
      <p className="font-semibold text-lg">{die.type}</p>
    </div>
  );
};

export default BirdFeederDie;

import { useAtom } from "jotai";
import { birdFeederAtom, selectedFoodAtom } from "../../../../utils/jotaiStore";
import {
  enableRolling,
  rollBirdFeeder,
} from "../../../../utils/gameFunctions/birdFeederFunctions";

const RollBirdFeederBtn = () => {
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [selectedFood] = useAtom(selectedFoodAtom);

  let disableRolling;

  if (!birdFeeder.length) {
    disableRolling = true;
  } else {
    disableRolling =
      selectedFood.length == 0 ? enableRolling(birdFeeder) : false;
  }

  const rollBirdFeederClick = () => {
    setBirdFeeder(rollBirdFeeder());
  };

  return (
    <button
      className="bg-indigo-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
      disabled={!disableRolling}
      onClick={rollBirdFeederClick}
    >
      Roll Bird Feeder
    </button>
  );
};

export default RollBirdFeederBtn;

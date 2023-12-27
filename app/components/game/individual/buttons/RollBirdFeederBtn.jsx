import { useAtom } from "jotai";
import {
  birdFeederAtom,
  selectedFoodAtom,
  brownPowerContinueBtnAtom,
} from "../../../../utils/jotaiStore";
import {
  enableRolling,
  rollBirdFeeder,
} from "../../../../utils/gameFunctions/birdFeederFunctions";
import { useEffect } from "react";

const RollBirdFeederBtn = () => {
  const [birdFeeder, setBirdFeeder] = useAtom(birdFeederAtom);
  const [selectedFood] = useAtom(selectedFoodAtom);
  const [brownContinue] = useAtom(brownPowerContinueBtnAtom);

  let disableRolling;

  const updateDisable = () => {
    if (!birdFeeder.length) {
      disableRolling = true;
    } else if (brownContinue) {
      disableRolling = false;
    } else {
      disableRolling =
        selectedFood.length == 0 ? enableRolling(birdFeeder) : false;
    }
  };

  const rollBirdFeederClick = () => {
    setBirdFeeder(rollBirdFeeder());
  };
  updateDisable();

  useEffect(() => {
    updateDisable();
  }, [brownContinue]);
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

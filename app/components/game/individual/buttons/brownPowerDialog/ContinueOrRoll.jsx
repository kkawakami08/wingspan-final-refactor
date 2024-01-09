import { useAtom } from "jotai";
import { birdFeederAtom } from "../../../../../utils/jotaiStore";
import { rollBirdFeeder } from "../../../../../utils/gameFunctions/birdFeederFunctions";
import { continueBrownPower } from "../../../../../utils/gameFunctions/birdPowerFunctions";

const ContinueOrRoll = ({ brownBirdSupply }) => {
  const [, setBirdFeeder] = useAtom(birdFeederAtom);

  const continueBrownBirds = () => {
    brownBirdSupply.setBrownPowerContinueBtn(false);
    continueBrownPower(brownBirdSupply);
  };

  const rollBirdFeederClick = () => {
    setBirdFeeder(rollBirdFeeder());
    brownBirdSupply.setCurrentActionText("click continue");
  };

  return (
    <div className="flex gap-5">
      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={continueBrownBirds}
      >
        Continue checking brown powers
      </button>

      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={rollBirdFeederClick}
      >
        Roll Bird Feeder
      </button>
    </div>
  );
};

export default ContinueOrRoll;

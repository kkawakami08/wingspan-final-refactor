import { useAtom } from "jotai";
import { playerBirdHandAtom } from "../../../../utils/jotaiStore";
import {
  eggReqCheck,
  resetPlayBirdAction,
} from "../../../../utils/gameFunctions/playABirdFunctions";

const SkipWhitePower = ({ brownBirdSupply, moveBirdSupply }) => {
  const [birdHand] = useAtom(playerBirdHandAtom);

  const skipWhitePower = () => {
    brownBirdSupply.setBrownPowerContinueBtn(false);
    resetPlayBirdAction(
      brownBirdSupply.setDisableClick,
      brownBirdSupply.setResourceQuantity,
      brownBirdSupply.setCurrentAction,
      brownBirdSupply.setPlayBirdState,
      brownBirdSupply.setCurrentActionText
    );
  };

  const playBirdClick = () => {
    // brownBirdSupply.setCurrentAction("playBird");
    brownBirdSupply.setPlayBirdState((state) => {
      state.bird = null;
      return state;
    });
    brownBirdSupply.setDisableClick((state) => ({
      ...state,
      birdHand: false,
    }));
    console.log("playing additional bird");
    brownBirdSupply.setCurrentActionText(
      `Select a bird to play in ${brownBirdSupply.brownBirdVariable}.`
    );
    brownBirdSupply.setBrownPowerContinueBtn(false);
  };

  return (
    <div>
      <button
        className="bg-purple-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={skipWhitePower}
      >
        Skip this bird's power
      </button>
      <button
        className="bg-purple-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={playBirdClick}
      >
        Play additional bird
      </button>
    </div>
  );
};

export default SkipWhitePower;

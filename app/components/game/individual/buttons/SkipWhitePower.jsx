import { useAtom } from "jotai";
import { playBirdAtom } from "../../../../utils/jotaiStore";
import { resetPlayBirdAction } from "../../../../utils/gameFunctions/playABirdFunctions";

const SkipWhitePower = ({ brownBirdSupply }) => {
  const [playBirdState] = useAtom(playBirdAtom);

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

    if (playBirdState.eggReq) {
      brownBirdSupply.setCurrentActionText(
        `Discard ${playBirdState.eggReq} eggs.`
      );
      brownBirdSupply.setDisableClick((state) => ({
        ...state,
        playedBird: false,
      }));
    } else {
      brownBirdSupply.setDisableClick((state) => ({
        ...state,
        birdHand: false,
      }));
      brownBirdSupply.setCurrentActionText(
        `Select a bird to play in ${brownBirdSupply.brownBirdVariable}.`
      );
    }
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

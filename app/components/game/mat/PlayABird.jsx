import { useAtom } from "jotai";
import { disableClickAtom, playBirdAtom } from "../../../utils/jotaiStore";
import CancelBtn from "../individual/buttons/CancelBtn";

const PlayABird = ({ brownBirdSupply }) => {
  const [disableClick] = useAtom(disableClickAtom);
  const [playBirdState] = useAtom(playBirdAtom);
  const disableHabitat = disableClick.habitats;

  const playABirdClick = () => {
    if (disableHabitat) console.log("Disabled");
    else {
      brownBirdSupply.setCurrentAction("playBird");
      brownBirdSupply.setCurrentActionText("Select a location");
    }
  };
  return (
    <div
      className="bg-violet-700 py-5 rounded-lg text-white font-semibold text-2xl flex flex-col gap-5 items-center justify-center text-center row-start-2 row-span-1 place-self-end w-full h-full"
      onClick={playABirdClick}
    >
      <p>Play a Bird</p>
      {brownBirdSupply.currentAction === "playBird" && !playBirdState.bird && (
        <CancelBtn brownBirdSupply={brownBirdSupply} />
      )}
    </div>
  );
};

export default PlayABird;

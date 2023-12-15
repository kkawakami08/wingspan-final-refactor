import { useAtom } from "jotai";
import {
  currentActionAtom,
  disableClickAtom,
  currentActionTextAtom,
} from "../../../utils/jotaiStore";

const PlayABird = () => {
  const [, setCurrentAction] = useAtom(currentActionAtom);
  const [, setCurrentActionText] = useAtom(currentActionTextAtom);
  const [disableClick] = useAtom(disableClickAtom);
  const disableHabitat = disableClick.habitats;

  const playABirdClick = () => {
    if (disableHabitat) console.log("Disabled");
    else {
      setCurrentAction("playBird");
      setCurrentActionText("Select a location");
    }
  };

  return (
    <div
      className="bg-violet-700 py-5 rounded-lg text-white font-semibold text-2xl flex flex-col gap-5 items-center justify-center text-center row-start-2 row-span-1 place-self-end w-full h-full"
      onClick={playABirdClick}
    >
      <p>Play a Bird</p>
    </div>
  );
};

export default PlayABird;

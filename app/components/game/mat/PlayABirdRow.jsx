import EggReq from "../individual/habitat/EggReq";
import CancelBtn from "../individual/buttons/CancelBtn";
import { useAtom } from "jotai";
import { currentActionAtom } from "../../../utils/jotaiStore";

const PlayABirdRow = () => {
  const [currentAction] = useAtom(currentActionAtom);

  return (
    <div className="row-start-2 col-start-2 col-span-6 bg-violet-900 text-white rounded-lg grid grid-cols-11 items-center justify-items-center p-3 gap-3 place-self-end w-full">
      <EggReq count={0} />
      <EggReq count={1} />
      <EggReq count={1} />
      <EggReq count={2} />
      <EggReq count={2} />
      {currentAction === "playBird" && <CancelBtn />}
    </div>
  );
};

export default PlayABirdRow;

import { useAtom } from "jotai";
import {
  playerBirdHandAtom,
  disableClickAtom,
} from "../../../utils/jotaiStore";
import GeneralBirdCard from "../individual/bird/GeneralBirdCard";

const PlayerBirdHand = () => {
  const [birdHand, setBirdHand] = useAtom(playerBirdHandAtom);
  const [disableClick] = useAtom(disableClickAtom);

  const birdHandContent = birdHand.map((bird) => (
    <GeneralBirdCard
      key={bird.common_name}
      bird={bird}
      type={setBirdHand}
      disabled={disableClick.birdHand}
      selected={false}
    />
  ));

  return (
    <div className="col-span-12">
      <p className="text-emerald-900 font-semibold text-lg text-center pb-3">
        Player Bird Hand
      </p>

      <div className="flex gap-5 flex-wrap items-center justify-center">
        {birdHandContent}
      </div>
    </div>
  );
};

export default PlayerBirdHand;

import { useAtom } from "jotai";
import { playerBirdHandAtom } from "../../../utils/jotaiStore";
import BirdCard from "../individual/bird/BirdCard";

const PlayerBirdHand = () => {
  const [birdHand] = useAtom(playerBirdHandAtom);

  const birdHandContent = birdHand.map((bird) => (
    <BirdCard key={bird.common_name} bird={bird} />
  ));

  return (
    <div className="col-span-7 ">
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

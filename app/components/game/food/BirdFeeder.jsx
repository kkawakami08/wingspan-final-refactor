import { useAtom } from "jotai";
import { birdFeederAtom } from "../../../utils/jotaiStore";
import BirdFeederDie from "../individual/food/BirdFeederDie";
import RollBirdFeederBtn from "../individual/buttons/RollBirdFeederBtn";

const BirdFeeder = () => {
  const [birdFeeder] = useAtom(birdFeederAtom);

  const birdFeederContent = birdFeeder.map((die) => (
    <BirdFeederDie key={die.id} die={die} />
  ));

  return (
    <div className="col-span-4 flex flex-col items-center gap-3 ">
      <p className="text-indigo-900 font-semibold text-lg text-center   ">
        Bird Feeder
      </p>

      <div className="flex gap-3 flex-wrap w-2/3 justify-center">
        {birdFeederContent}
      </div>
      <RollBirdFeederBtn />
    </div>
  );
};

export default BirdFeeder;

import Forest from "./Forest";
import Grassland from "./Grassland";
import Wetland from "./Wetland";
import PlayABird from "./PlayABird";
import CurrentAction from "./CurrentAction";
import ForestRow from "./ForestRow";
import PlayABirdRow from "./PlayABirdRow";
import GrasslandRow from "./GrasslandRow";
import WetlandRow from "./WetlandRow";
import { useAtom } from "jotai";
import {
  playerEggSupplyAtom,
  forestBrownBirdsAtom,
  brownBirdCopyAtom,
  brownPowerContinueBtnAtom,
} from "../../../utils/jotaiStore";
import BrownPowerContinueBtn from "../individual/buttons/BrownPowerContinueBtn";
BrownPowerContinueBtn;

const HabitatMat = () => {
  const [playerEggSupply] = useAtom(playerEggSupplyAtom);
  const [forestBrownBirds] = useAtom(forestBrownBirdsAtom);
  const [brownBirdCopy] = useAtom(brownBirdCopyAtom);
  const [brownPowerContinue] = useAtom(brownPowerContinueBtnAtom);
  return (
    <div className="row-start-5 col-span-12 flex flex-col gap-3">
      <p className="text-emerald-900 font-semibold text-lg text-center  ">
        Habitat mat
      </p>
      <p>forest brown birds {forestBrownBirds.join()}</p>
      <p>copy brown birds {brownBirdCopy.copy.join()}</p>
      {brownPowerContinue && <BrownPowerContinueBtn />}

      <div className="flex gap-20 items-center justify-center">
        <CurrentAction />
        <p className="text-xl font-bold"> Egg Count: {playerEggSupply}</p>
      </div>

      <div className="grid grid-cols-7 gap-5 ">
        <PlayABird />
        <PlayABirdRow />
        <Forest />
        <Grassland />
        <Wetland />
        <ForestRow />
        <GrasslandRow />
        <WetlandRow />
      </div>
    </div>
  );
};

export default HabitatMat;

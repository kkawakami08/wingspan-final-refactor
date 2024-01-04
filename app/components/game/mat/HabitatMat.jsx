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
  brownPowerContinueBtnAtom,
  brownBirdCopyAtom,
  currentActionAtom,
} from "../../../utils/jotaiStore";
import BrownPowerDialog from "./BrownPowerDialog";
import NextPower from "../individual/buttons/NextPower";

const HabitatMat = () => {
  const [playerEggSupply] = useAtom(playerEggSupplyAtom);
  const [brownPowerContinue] = useAtom(brownPowerContinueBtnAtom);
  const [currentAction] = useAtom(currentActionAtom);
  return (
    <div className="row-start-6 col-span-12 flex flex-col gap-3">
      <p className="text-emerald-900 font-semibold text-lg text-center  ">
        Habitat mat
      </p>
      {currentAction.includes("brown") && <NextPower />}
      {brownPowerContinue && <BrownPowerDialog />}

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

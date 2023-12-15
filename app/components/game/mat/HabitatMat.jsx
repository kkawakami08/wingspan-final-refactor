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
import { playerEggSupplyAtom } from "../../../utils/jotaiStore";

const HabitatMat = () => {
  const [playerEggSupply] = useAtom(playerEggSupplyAtom);
  return (
    <div className="row-start-5 col-span-12 flex flex-col gap-3">
      <p className="text-emerald-900 font-semibold text-lg text-center  ">
        Habitat mat
      </p>
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

import Forest from "./Forest";
import Grassland from "./Grassland";
import Wetland from "./Wetland";
import PlayABird from "./PlayABird";
import CurrentAction from "./CurrentAction";
import ForestRow from "./ForestRow";
import PlayABirdRow from "./PlayABirdRow";
import GrasslandRow from "./GrasslandRow";
import WetlandRow from "./WetlandRow";
import BrownPowerDialog from "./BrownPowerDialog";
import NextPower from "../individual/buttons/NextPower";

const HabitatMat = ({ brownBirdSupply, moveBirdSupply }) => {
  return (
    <div className="col-span-12 flex flex-col gap-3">
      <p className="text-emerald-900 font-semibold text-lg text-center  ">
        Habitat mat
      </p>
      {brownBirdSupply.currentAction.includes("brown") && (
        <NextPower brownBirdSupply={brownBirdSupply} />
      )}
      {brownBirdSupply.brownPowerContinueBtn && (
        <BrownPowerDialog brownBirdSupply={brownBirdSupply} />
      )}

      <div className="flex gap-20 items-center justify-center">
        <CurrentAction brownBirdSupply={brownBirdSupply} />
        <p className="text-xl font-bold">
          {" "}
          Egg Count: {brownBirdSupply.playerEggs}
        </p>
      </div>

      <div className="grid grid-cols-7 gap-5 ">
        <PlayABird brownBirdSupply={brownBirdSupply} />
        <PlayABirdRow />
        <Forest
          brownBirdSupply={brownBirdSupply}
          moveBirdSupply={moveBirdSupply}
        />
        <Grassland
          brownBirdSupply={brownBirdSupply}
          moveBirdSupply={moveBirdSupply}
        />
        <Wetland
          brownBirdSupply={brownBirdSupply}
          moveBirdSupply={moveBirdSupply}
        />
        <ForestRow brownBirdSupply={brownBirdSupply} />
        <GrasslandRow brownBirdSupply={brownBirdSupply} />
        <WetlandRow brownBirdSupply={brownBirdSupply} />
      </div>
    </div>
  );
};

export default HabitatMat;

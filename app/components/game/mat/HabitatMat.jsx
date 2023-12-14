import Forest from "./Forest";
import Grassland from "./Grassland";
import Wetland from "./Wetland";
import PlayABird from "./PlayABird";
import CurrentAction from "./CurrentAction";
import ForestRow from "./ForestRow";
import PlayABirdRow from "./PlayABirdRow";

const HabitatMat = () => {
  return (
    <div className="row-start-5 col-span-12 flex flex-col gap-3">
      <p className="text-emerald-900 font-semibold text-lg text-center  ">
        Habitat mat
      </p>
      <CurrentAction />
      <div className="grid grid-cols-7 gap-5 ">
        <PlayABird />
        <PlayABirdRow />
        <Forest />
        <Grassland />
        <Wetland />
        <ForestRow />
      </div>
    </div>
  );
};

export default HabitatMat;

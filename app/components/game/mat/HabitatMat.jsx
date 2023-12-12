import Forest from "./Forest";
import Grassland from "./Grassland";
import Wetland from "./Wetland";
import PlayABird from "./PlayABird";
import CurrentAction from "./CurrentAction";

const HabitatMat = () => {
  return (
    <div className="row-start-5 col-span-12 flex flex-col gap-3">
      <p className="text-emerald-900 font-semibold text-lg text-center  ">
        Habitat mat
      </p>
      <CurrentAction />
      <div className="flex gap-5 justify-around">
        <PlayABird />
        <Forest />
        <Grassland />
        <Wetland />
      </div>
    </div>
  );
};

export default HabitatMat;

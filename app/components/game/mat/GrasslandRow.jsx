import ActionSpace from "../individual/habitat/ActionSpace";
import PlayedBirdCard from "../individual/bird/PlayedBirdCard";

const GrasslandRow = ({ brownBirdSupply }) => {
  const grasslandArray = Object.keys(brownBirdSupply.grassland);

  const grasslandContent = grasslandArray.map((space) => {
    if (brownBirdSupply.grassland[space].bird) {
      return (
        <PlayedBirdCard
          key={brownBirdSupply.grassland[space].bird.common_name}
          habitat={brownBirdSupply.grassland}
          setHabitat={brownBirdSupply.setGrassland}
          space={space}
          location={"grassland"}
          brownBirdSupply={brownBirdSupply}
        />
      );
    } else {
      return (
        <ActionSpace
          key={space}
          space={brownBirdSupply.grassland[space]}
          num={space}
        />
      );
    }
  });

  return (
    <div className="row-start-5 col-span-6 bg-amber-900 text-white rounded-lg grid grid-cols-11 items-center justify-items-center p-3 gap-3 row-span-2 ">
      {grasslandContent}
    </div>
  );
};

export default GrasslandRow;

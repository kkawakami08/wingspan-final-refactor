import ActionSpace from "../individual/habitat/ActionSpace";
import PlayedBirdCard from "../individual/bird/PlayedBirdCard";

const ForestRow = ({ brownBirdSupply }) => {
  const forestArray = Object.keys(brownBirdSupply.forest);

  const forestContent = forestArray.map((space) => {
    if (brownBirdSupply.forest[space].bird) {
      return (
        <PlayedBirdCard
          key={brownBirdSupply.forest[space].bird.common_name}
          habitat={brownBirdSupply.forest}
          setHabitat={brownBirdSupply.setForest}
          space={space}
          location={"forest"}
          brownBirdSupply={brownBirdSupply}
        />
      );
    } else {
      return (
        <ActionSpace
          key={space}
          space={brownBirdSupply.forest[space]}
          num={space}
        />
      );
    }
  });

  return (
    <div className="row-start-3 col-span-6 bg-emerald-900 text-white rounded-lg grid grid-cols-11 items-center justify-items-center p-3 gap-3 row-span-2 ">
      {forestContent}
    </div>
  );
};

export default ForestRow;

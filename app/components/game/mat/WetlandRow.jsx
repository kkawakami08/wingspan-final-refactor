import ActionSpace from "../individual/habitat/ActionSpace";
import PlayedBirdCard from "../individual/bird/PlayedBirdCard";

const WetlandRow = ({ brownBirdSupply }) => {
  const wetlandArray = Object.keys(brownBirdSupply.wetland);

  const wetlandContent = wetlandArray.map((space) => {
    if (brownBirdSupply.wetland[space].bird) {
      return (
        <PlayedBirdCard
          key={brownBirdSupply.wetland[space].bird.common_name}
          habitat={brownBirdSupply.wetland}
          setHabitat={brownBirdSupply.setWetland}
          space={space}
          location={"wetland"}
          brownBirdSupply={brownBirdSupply}
        />
      );
    } else {
      return (
        <ActionSpace
          key={space}
          space={brownBirdSupply.wetland[space]}
          num={space}
        />
      );
    }
  });

  return (
    <div className="row-start-7 col-span-6 bg-blue-900 text-white rounded-lg grid grid-cols-11 items-center justify-items-center p-3 gap-3 row-span-2 ">
      {wetlandContent}
    </div>
  );
};

export default WetlandRow;

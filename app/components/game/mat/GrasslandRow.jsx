import ActionSpace from "../individual/habitat/ActionSpace";
import PlayedBirdCard from "../individual/bird/PlayedBirdCard";
import { useAtom } from "jotai";
import { grasslandAtom } from "../../../utils/jotaiStore";

const GrasslandRow = () => {
  const [grassland] = useAtom(grasslandAtom);
  const grasslandArray = Object.keys(grassland);

  const grasslandContent = grasslandArray.map((space) => {
    if (grassland[space].bird) {
      return (
        <PlayedBirdCard
          key={grassland[space].bird.common_name}
          bird={grassland[space].bird}
        />
      );
    } else {
      return <ActionSpace key={space} space={grassland[space]} num={space} />;
    }
  });

  return (
    <div className="row-start-5 col-span-6 bg-amber-900 text-white rounded-lg grid grid-cols-11 items-center justify-items-center p-3 gap-3 row-span-2 ">
      {grasslandContent}
    </div>
  );
};

export default GrasslandRow;

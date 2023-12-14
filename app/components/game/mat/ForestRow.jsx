import ActionSpace from "../individual/habitat/ActionSpace";
import PlayedBirdCard from "../individual/bird/PlayedBirdCard";
import { useAtom } from "jotai";
import { forestAtom } from "../../../utils/jotaiStore";

const ForestRow = () => {
  const [forest] = useAtom(forestAtom);
  const forestArray = Object.keys(forest);

  const forestContent = forestArray.map((space) => {
    if (forest[space].bird) {
      return (
        <PlayedBirdCard
          key={forest[space].bird.common_name}
          bird={forest[space].bird}
        />
      );
    } else {
      return <ActionSpace key={space} space={forest[space]} num={space} />;
    }
  });

  return (
    <div className="row-start-3 col-span-6 bg-emerald-900 text-white rounded-lg grid grid-cols-11 items-center justify-items-center p-3 gap-3 row-span-2 ">
      {forestContent}
    </div>
  );
};

export default ForestRow;

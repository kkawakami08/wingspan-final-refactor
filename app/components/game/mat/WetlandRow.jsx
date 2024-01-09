import ActionSpace from "../individual/habitat/ActionSpace";
import PlayedBirdCard from "../individual/bird/PlayedBirdCard";
import { useAtom } from "jotai";
import { wetlandAtom } from "../../../utils/jotaiStore";

const WetlandRow = ({ brownBirdSupply }) => {
  const [wetland, setWetland] = useAtom(wetlandAtom);
  const wetlandArray = Object.keys(wetland);

  const wetlandContent = wetlandArray.map((space) => {
    if (wetland[space].bird) {
      return (
        <PlayedBirdCard
          key={wetland[space].bird.common_name}
          habitat={wetland}
          setHabitat={setWetland}
          space={space}
          location={"wetland"}
          brownBirdSupply={brownBirdSupply}
        />
      );
    } else {
      return <ActionSpace key={space} space={wetland[space]} num={space} />;
    }
  });

  return (
    <div className="row-start-7 col-span-6 bg-blue-900 text-white rounded-lg grid grid-cols-11 items-center justify-items-center p-3 gap-3 row-span-2 ">
      {wetlandContent}
    </div>
  );
};

export default WetlandRow;

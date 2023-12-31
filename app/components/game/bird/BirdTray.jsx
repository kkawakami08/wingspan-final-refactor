import { useAtom } from "jotai";
import { birdTrayAtom } from "../../../utils/jotaiStore";
import BirdTrayCard from "../individual/bird/BirdTrayCard";

const BirdTray = () => {
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);

  const birdTrayContent = birdTray.map((bird) => (
    <BirdTrayCard key={bird.common_name} bird={bird} />
  ));

  return (
    <div className="flex gap-5 col-span-7 items-center justify-center">
      {birdTrayContent}
    </div>
  );
};

export default BirdTray;

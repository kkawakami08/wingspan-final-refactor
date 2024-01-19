import { useAtom } from "jotai";
import { birdTrayAtom, disableClickAtom } from "../../../utils/jotaiStore";
import GeneralBirdCard from "../individual/bird/GeneralBirdCard";

const BirdTray = ({}) => {
  const [birdTray, setBirdTray] = useAtom(birdTrayAtom);
  const [disableClick] = useAtom(disableClickAtom);

  const birdTrayContent = birdTray.map((bird) => (
    <GeneralBirdCard
      key={bird.common_name}
      bird={bird}
      type={setBirdTray}
      disabled={disableClick.birdTray}
      selected={false}
    />
  ));

  return (
    <div className="flex gap-5 col-span-7 items-center justify-center">
      {birdTrayContent}
    </div>
  );
};

export default BirdTray;

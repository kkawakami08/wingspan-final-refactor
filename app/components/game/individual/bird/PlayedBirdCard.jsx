import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  playerBirdHandAtom,
  disableClickAtom,
} from "../../../../utils/jotaiStore";
import { selectCard } from "../../../../utils/gameFunctions/cardFunctions";

const PlayedBirdCard = ({ bird }) => {
  const [, setSelectedBirds] = useAtom(selectedBirdsAtom);
  const [, setPlayerBirdHand] = useAtom(playerBirdHandAtom);

  const [disableClick] = useAtom(disableClickAtom);
  const disableBirdCard = disableClick.birdHand;

  const birdCardClick = () => {
    if (disableBirdCard) console.log("Disabled");
    else {
      selectCard(
        setPlayerBirdHand,
        setSelectedBirds,
        "common_name",
        bird.common_name,
        bird
      );
    }
  };

  const foodContent = bird.food.map((food, index) => (
    <p className="bg-emerald-900 text-white p-2 rounded-lg" key={index}>
      {food}
    </p>
  ));
  const habitatContent = bird.habitat.map((habitat, index) => (
    <p className="bg-white text-emerald-900 p-2 rounded-lg" key={index}>
      {habitat}
    </p>
  ));
  return (
    <div
      className="col-span-2  border-2 flex flex-col items-center p-3 rounded-lg text-lg font-semibold justify-center text-center h-full w-full bg-emerald-500 gap-2"
      onClick={birdCardClick}
    >
      <p className="text-xl font-semibold text-white">{bird.common_name}</p>
      <div className="flex gap-3 justify-center flex-wrap">{foodContent}</div>
      <div>{habitatContent}</div>
      <p className="text-white text-lg">Egg limit: {bird.egg_limit}</p>
    </div>
  );
};

export default PlayedBirdCard;

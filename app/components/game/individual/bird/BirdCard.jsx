import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  playerBirdHandAtom,
  disableClickAtom,
} from "../../../../utils/jotaiStore";
import { selectCard } from "../../../../utils/gameFunctions/cardFunctions";

const BirdCard = ({ bird }) => {
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
      className="bg-emerald-500 w-56 h-72 rounded-lg p-3 flex flex-col gap-5 text-center"
      onClick={birdCardClick}
    >
      <p className="text-xl font-semibold text-white">{bird.common_name}</p>
      <div className="flex gap-3 justify-center flex-wrap">{foodContent}</div>
      <div>{habitatContent}</div>
      <p className="text-white text-lg">Egg limit: {bird.egg_limit}</p>
    </div>
  );
};

export default BirdCard;

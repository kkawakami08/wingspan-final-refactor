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

  let powerCSS = "";
  let powerPrefix = "";
  switch (bird.power.color) {
    case "brown":
      powerCSS = "p-2 w-full bg-amber-500";
      powerPrefix = "When Activated: ";
      break;
    case "pink":
      powerCSS = "p-2 w-full bg-pink-500";
      powerPrefix = "Once Between Turns: ";
      break;
    case "white":
      powerCSS = "p-2 w-full bg-white";
      powerPrefix = "When Played: ";
      break;
  }

  return (
    <div
      className="bg-emerald-500 w-72 h-96 rounded-lg  flex flex-col justify-around text-center border-2 border-emerald-700"
      onClick={birdCardClick}
    >
      <div className="p-3 flex flex-col gap-5">
        <p className="text-xl font-semibold text-white">{bird.common_name}</p>
        <div className="flex gap-3 justify-center flex-wrap">{foodContent}</div>
        <div>{habitatContent}</div>
        <p className="text-white text-lg">Egg limit: {bird.egg_limit}</p>
        <p className="text-white text-lg">PowerId: {bird.power.id}</p>
      </div>
      <div className={powerCSS}>
        <p className="font-semibold text-lg">
          {powerPrefix}
          <span className="font-normal text-md">{bird.power.description}</span>
        </p>
      </div>
    </div>
  );
};

export default BirdCard;

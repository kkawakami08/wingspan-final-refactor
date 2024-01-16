import { useAtom } from "jotai";
import {
  selectedBirdsAtom,
  selectedCardsAtom,
} from "../../../../utils/jotaiStore";
import { selectCard } from "../../../../utils/gameFunctions/cardFunctions";

const OptionBirdCard = ({ bird }) => {
  const [, setSelectedCards] = useAtom(selectedCardsAtom);
  const [, setSelectedBirds] = useAtom(selectedBirdsAtom);

  const SelectedBirdCardClick = () => {
    selectCard(
      setSelectedCards,
      setSelectedBirds,
      "common_name",
      bird.common_name,
      bird
    );
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
      className="bg-emerald-300 w-72 h-96 rounded-lg  flex flex-col gap-3 text-center shrink"
      onClick={SelectedBirdCardClick}
    >
      <div className="p-3 flex flex-col gap-5">
        <p className="text-xl font-semibold text-emerald-900">
          {bird.common_name}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">{foodContent}</div>
        <div>{habitatContent}</div>
        <p className="text-emerald-900 text-lg">Egg limit: {bird.egg_limit}</p>
        <p className="text-emerald-900 text-lg">Wingspan: {bird.wingspan}</p>
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

export default OptionBirdCard;

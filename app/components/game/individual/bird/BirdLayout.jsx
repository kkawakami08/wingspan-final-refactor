const BirdLayout = ({ bird }) => {
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
      powerCSS = "p-2 w-full bg-amber-500 text-black";
      powerPrefix = "When Activated: ";
      break;
    case "pink":
      powerCSS = "p-2 w-full bg-pink-500 text-black";
      powerPrefix = "Once Between Turns: ";
      break;
    case "white":
      powerCSS = "p-2 w-full bg-white text-black";
      powerPrefix = "When Played: ";
      break;
  }

  // w-72 h-96
  return (
    <div className=" bg-emerald-500  rounded-lg  flex flex-col  text-center border-2 border-emerald-700 ">
      <div className="p-3 flex flex-col gap-3 items-center">
        <p className="text-xl font-semibold text-white">{bird.common_name}</p>
        <div className="flex gap-3 justify-center flex-wrap">{foodContent}</div>
        <div className="flex flex-wrap gap-3">{habitatContent}</div>
        <p className="text-white text-lg">Egg limit: {bird.egg_limit}</p>
        <p className="text-white text-lg">Nest Type: {bird.nest}</p>
      </div>
      <div className={powerCSS}>
        <p className="font-semibold text-lg">
          {powerPrefix}
          <span className="font-normal text-md ">{bird.power.description}</span>
        </p>
      </div>
    </div>
  );
};

export default BirdLayout;

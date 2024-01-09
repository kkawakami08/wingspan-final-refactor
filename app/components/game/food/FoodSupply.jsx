import FoodSupplyBoxes from "../individual/food/FoodSupplyBoxes";

const FoodSupply = ({ brownBirdSupply }) => {
  return (
    <div className="row-start-5 col-span-12 text-center">
      <p className="text-emerald-900 font-semibold text-lg pb-5 ">
        Food Supply
      </p>
      <div className="flex justify-around">
        <FoodSupplyBoxes
          type={"rodent"}
          bg={"bg-gray-600"}
          brownBirdSupply={brownBirdSupply}
        />
        <FoodSupplyBoxes
          type={"fruit"}
          bg={"bg-red-600"}
          brownBirdSupply={brownBirdSupply}
        />
        <FoodSupplyBoxes
          type={"seed"}
          bg={"bg-yellow-600"}
          brownBirdSupply={brownBirdSupply}
        />
        <FoodSupplyBoxes
          type={"invertebrate"}
          bg={"bg-emerald-600"}
          brownBirdSupply={brownBirdSupply}
        />
        <FoodSupplyBoxes
          type={"fish"}
          bg={"bg-blue-600"}
          brownBirdSupply={brownBirdSupply}
        />
      </div>
    </div>
  );
};

export default FoodSupply;

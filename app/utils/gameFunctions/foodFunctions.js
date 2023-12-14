export const foodSelection = (source, setDestination, setSource, foodId) => {
  let initialSupply = source;

  const index = initialSupply.map((e) => e.id).indexOf(foodId);
  const [item] = initialSupply.splice(index, 1);

  setDestination((destination) => [...destination, item]);
  setSource([...initialSupply]);
};

export const saveFoodSelection = (setDestination, source, setSource) => {
  setDestination((destination) => [...destination, ...source]);
  setSource([]);
};

export const discardFoodSelection = (
  setResourceQuantity,

  setSource
) => {
  setResourceQuantity((amount) => amount + 1);

  setSource([]);
};

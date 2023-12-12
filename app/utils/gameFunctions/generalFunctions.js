export const saveSelection = (setDestination, source, setSource) => {
  setDestination((destination) => {
    destination.push(...source);
    return destination;
  });
  setSource((source) => {
    source = [];
    return source;
  });
};

export const discardSelection = (
  setResourceQuantity,
  setDiscard,
  source,
  setSource
) => {
  setResourceQuantity((amount) => {
    amount++;
    return amount;
  });
  setDiscard((prev) => {
    return [...prev, ...source];
  });
  setSource((source) => {
    source = [];
    return source;
  });
};

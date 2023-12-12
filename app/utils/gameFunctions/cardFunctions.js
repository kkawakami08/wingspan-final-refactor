export const drawCard = (mainDeck, setHand) => {
  const card = mainDeck.pop();
  console.log(`Drew "${card.common_name}". Adding to hand.`);
  setHand((hand) => {
    hand.push(card);
    return hand;
  });
};

export const selectCard = (
  setSource,
  setDestination,
  key,
  value,
  targetCard
) => {
  setSource((source) => {
    const index = source.map((card) => card[key]).indexOf(value);
    source.splice(index, 1);
    return source;
  });
  setDestination((destination) => {
    destination.push(targetCard);
    return destination;
  });
};

export const nestTypeCounter = (habitat, powerVariable) => {
  let nestCount = 0;
  for (const space in habitat) {
    console.log(habitat[space]);
    if (habitat[space].bird == null) {
      console.log("no more birds, next habitat");
      break;
    } else {
      if (habitat[space].bird.nest === powerVariable) {
        nestCount++;
        console.log("added to next", nestCount);
      }
    }
  }
  return nestCount;
};

import { nanoid } from "nanoid";
import { rollBirdFeeder } from "../utils/gameFunctions/birdFeederFunctions";
import { forestBirds, grasslandBirds, wetlandBirds } from "./testingBirdCards";

export const playerFoodSupply = [
  { type: "fruit", id: nanoid() },
  { type: "fruit", id: nanoid() },
  { type: "fruit", id: nanoid() },
  { type: "seed", id: nanoid() },
  { type: "seed", id: nanoid() },
  { type: "fish", id: nanoid() },
  { type: "rodent", id: nanoid() },
  { type: "invertebrate", id: nanoid() },
  { type: "invertebrate", id: nanoid() },
  { type: "invertebrate", id: nanoid() },
];

const createInitialHabitat = (resource, discard, startingQuantity) => {
  let habitat = {};
  for (let i = 0; i < 6; i++) {
    if (i === 0 || i % 2 === 0) {
      habitat[i] = {
        action: {
          type: resource,
          quantity: startingQuantity,
          discard: "none",
        },
        bird: null,
        eggCount: 0,
        cacheCount: 0,
        tuckedCount: 0,
      };
    } else {
      habitat[i] = {
        action: {
          type: resource,
          quantity: startingQuantity,
          discard: discard,
        },
        bird: null,
        eggCount: 0,
        cacheCount: 0,
        tuckedCount: 0,
      };
      startingQuantity += 1;
    }
  }
  return habitat;
};

export let initialForest = createInitialHabitat("dice", "card", 1);
// initialForest[0].bird = forestBirds[0];
// initialForest[1].bird = forestBirds[1];
// initialForest[2].bird = forestBirds[2];
// initialForest[3].bird = forestBirds[3];
export let initialGrassland = createInitialHabitat("eggs", "food", 2);
// initialGrassland[0].bird = grasslandBirds[0];
// initialGrassland[1].bird = grasslandBirds[1];
// initialGrassland[2].bird = grasslandBirds[2];
export const initialWetland = createInitialHabitat("cards", "egg", 1);
// initialWetland[0].bird = wetlandBirds[0];
// initialWetland[1].bird = wetlandBirds[1];

const initialRoll = rollBirdFeeder();
const initialDisableRolling = initialRoll.every(
  (die) => die.type === initialRoll[0].type
);

export const initialBirdFeeder = initialRoll;

export const initialDisabledStates = {
  birdDeck: true,
  birdTray: true,

  birdHand: true,
  playerFood: true,
  birdFeeder: true,
  foodSupply: true,
  eggSupply: true,
  playerEggSupply: true,
  habitats: false,
  playedBird: true,
};

export const initialDisableSelectionState = {
  food: true,
  bird: true,
  birdFeeder: !initialDisableRolling,
  playBirdSelection: true,
};

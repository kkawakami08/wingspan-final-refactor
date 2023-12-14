import { atomWithImmer } from "jotai-immer";
import { atom } from "jotai";
import { birdDeck, playerBirdHand, birdTray } from "../data/testingBirdCards";
import { rollBirdFeeder } from "./gameFunctions/birdFeederFunctions";
import {
  playerFoodSupply,
  initialForest,
  initialGrassland,
  initialWetland,
} from "../data/initialData";

export const birdDeckAtom = atom(birdDeck);
export const birdDiscardAtom = atom([]);
export const birdTrayAtom = atomWithImmer(birdTray);
const initialRoll = rollBirdFeeder();
export const birdFeederAtom = atom(initialRoll);

export const forestAtom = atomWithImmer(initialForest);
export const forestBirdCountAtom = atom(0);

export const grasslandAtom = atomWithImmer(initialGrassland);
export const grasslandBirdCountAtom = atom(0);

export const wetlandAtom = atomWithImmer(initialWetland);
export const wetlandBirdCountAtom = atom(0);

export const totalBirdCountAtom = atom(
  (get) =>
    get(forestBirdCountAtom) +
    get(grasslandBirdCountAtom) +
    get(wetlandBirdCountAtom)
);
export const grasslandPlayableAtom = atom(true);

export const playerBirdHandAtom = atomWithImmer(playerBirdHand);
export const playerFoodSupplyAtom = atom(playerFoodSupply);
export const playerEggSupplyAtom = atom(0);

export const selectedBirdsAtom = atomWithImmer([]);
export const selectedFoodAtom = atom([]);

export const currentActionAtom = atom("");
export const resourceQuantityAtom = atom(0);

export const initialDisableClick = {
  birdHand: true,
  birdTray: true,
  birdDeck: true,
  birdFeeder: true,
  habitats: false,
  playerFood: true,
  playedBird: true,
};

export const disableClickAtom = atom(initialDisableClick);

export const forestDisableOptions = {
  birdFeeder: false,
  // birdHand: false,
};
export const wetlandDisableOptions = {
  birdDeck: false,
  birdTray: false,
  // playerEggs: false
};
export const grasslandDisableOptions = {
  // playerFood: false,
  playedBird: false,
};

export const initialPlayBird = {
  habitat: "",
  bird: "",
  eggReq: 0,
  playable: true,
  confirmHabitat: true,
};

export const playBirdAtom = atomWithImmer(initialPlayBird);

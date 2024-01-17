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

export const grasslandAtom = atomWithImmer(initialGrassland);

export const wetlandAtom = atomWithImmer(initialWetland);

export const removedEggListAtom = atomWithImmer({
  forest: [],
  grassland: [],
  wetland: [],
});

export const playerBirdHandAtom = atomWithImmer(playerBirdHand);
export const playerFoodSupplyAtom = atom(playerFoodSupply);
export const playerEggSupplyAtom = atom(0);

export const selectedBirdsAtom = atomWithImmer([]);
export const selectedFoodAtom = atom([]);

export const currentActionAtom = atom("");
export const currentActionTextAtom = atom("Select an action");
export const resourceQuantityAtom = atom(0);

export const initialDisableClick = {
  birdHand: true,
  birdTray: true,
  birdDeck: true,
  birdFeeder: true,
  habitats: false,
  playerFood: true,
  playedBird: true,
  selectedFood: false,
  foodSupply: true,
};

export const disableClickAtom = atom(initialDisableClick);

export const initialPlayBird = {
  habitat: "",
  bird: "",
  eggReq: 0,
  playable: true,
  confirmHabitat: true,
};

export const playBirdAtom = atomWithImmer(initialPlayBird);

export const forestBirdCountAtom = atom(0);
export const grasslandBirdCountAtom = atom(0);
export const wetlandBirdCountAtom = atom(0);

export const forestBrownBirdsAtom = atomWithImmer([]);
export const grasslandBrownBirdsAtom = atomWithImmer([]);
export const wetlandBrownBirdsAtom = atomWithImmer([]);

export const brownBirdCopyAtom = atom({
  location: "",
  copy: [],
  dialog: "",
  sameBird: false,
  currentSpace: null,
});

export const brownPowerContinueBtnAtom = atom(false);
export const brownPowerEndAtom = atom(false);
export const discardQuantityAtom = atom(0);

export const brownBirdVariableAtom = atom(null);

export const eggTrackerAtom = atom([]);
export const selectedCardsAtom = atom([]);

export const totalVPAtom = atom(0);

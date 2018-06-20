import { SEARCH_FLAVOR } from "./types";

export const searchFlavor = flavorKeyword => {
  return {
    type: SEARCH_FLAVOR,
    payload: flavorKeyword
  };
};

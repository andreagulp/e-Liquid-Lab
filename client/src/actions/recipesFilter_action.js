import { SEARCH_RECIPE } from "./types";

export const searchRecipe = recipeKeyword => {
  return {
    type: SEARCH_RECIPE,
    payload: recipeKeyword
  };
};

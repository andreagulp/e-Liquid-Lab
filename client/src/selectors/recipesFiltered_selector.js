import { createSelector } from "reselect";

const getRecipes = state => state.recipes.recipes;
const getKeyword = state => state.recipesFilter.keyword;
const getPublicRecipes = state => state.recipes.publicRecipes;

export const getVisibleRecipes = createSelector(
  [getRecipes, getKeyword],
  (recipes, keyword) => {
    console.log(keyword);
    if (keyword && keyword.length > 0) {
      return recipes.filter(recipe =>
        recipe.name.toUpperCase().includes(keyword.toUpperCase())
      );
    } else {
      return recipes;
    }
  }
);
export const getVisiblePublicRecipes = createSelector(
  [getPublicRecipes, getKeyword],
  (publicRecipes, keyword) => {
    console.log(keyword);
    console.log("publicRecipes from selector", publicRecipes);
    if (keyword && keyword.length > 0) {
      return publicRecipes.filter(publicRecipe =>
        publicRecipe.name.toUpperCase().includes(keyword.toUpperCase())
      );
    } else {
      return publicRecipes;
    }
  }
);

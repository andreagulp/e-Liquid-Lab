import { combineReducers } from 'redux';
import recipes, * as fromRecipes from './recipes_reducer';
import flavors, * as fromFlavors from './flavors_reducer';
import user from './user_reducer';
import reviews from './reviews_reducer';

const rootReducers = combineReducers({
  recipes,
  flavors,
  user,
  reviews
})

export default rootReducers

export const flavorsAutocomplete = (state) => fromFlavors.flavorsAutocomplete(state.flavors)
export const recipeProductionMetrics = (state) => fromRecipes.recipeProductionMetrics(state.recipes)
export const recipeProductionByMonth = (state) => fromRecipes.recipeProductionByMonth(state.recipes)

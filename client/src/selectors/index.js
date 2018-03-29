import { createSelector } from 'reselect'
import _ from 'lodash'

const getFlavorId = (state) => state.flavors.selectedFlavor._id
const getFlavors = (state) => state.flavors
const getRecipes = (state) => state.recipes.recipes

export const getRecipesByFlavor = createSelector(
  [getFlavorId, getRecipes],
  (flavorId, recipes) =>
    _.filter(recipes, { recipeFlavors: [{ _id: flavorId }] })
)

export const flavorUsageMetrics = createSelector(
  [getFlavorId, getRecipesByFlavor],
  (flavorId, recipesByFlavor) => {
    const countRecipesWithFlavor = recipesByFlavor.length
    const mlArray = recipesByFlavor.map(recipe => {
      return recipe.recipeFlavors.filter(flavor => flavor._id === flavorId).reduce((a, b) => a + b.ml, 0)
    })
    const totMlUsed = mlArray.reduce((a, b) => a + b, 0)

    const percArray = recipesByFlavor.map(recipe => {
      return recipe.recipeFlavors.filter(flavor => flavor._id === flavorId).reduce((a, b) => a + b.perc, 0)
    })

    const avgPerc = percArray.reduce((a, b) => a + b, 0) / percArray.length

    const flavorUsageMetrics = {
      countRecipesWithFlavor: countRecipesWithFlavor,
      totMlUsed: totMlUsed,
      percArray: avgPerc
    }
    return flavorUsageMetrics
  })


export const getFlavorAlertList = createSelector(
  [getFlavors],
  (flavors) => flavors.inventoryFlavors.filter(flavor => flavor.alertList === true)
)
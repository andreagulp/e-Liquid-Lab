import {
  FETCH_RECIPES,
  FETCH_PUBLIC_RECIPES,
  FETCH_SINGLE_RECIPE,
  ADD_RECIPE,
  DELETE_RECIPE,
  UPDATE_RECIPE,
  UPDATE_RECIPE_FIELD,
  CLEAN_SELECTED_RECIPE,
  ADD_FLAVOR_TO_RECIPE,
  EDIT_FLAVOR_TO_RECIPE,
  DELETE_FLAVOR_TO_RECIPE,
  UPDATE_RECIPE_WITH_PRODUCTION
} from "../actions/types";
import moment from "moment";
import _ from "lodash";

const initialState = {
  recipes: [],
  publicRecipes: [],
  selectedRecipe: {
    mlToProduce: 10,
    baseVg: 70,
    basePg: 30,
    nicoVg: 50,
    nicoPg: 50,
    nicoStrength: 20,
    desiredNicoStrength: 3,
    rating: 0,
    name: "",
    comment: "",
    recipeFlavors: [],
    production: [],
    _user: {
      googleId: "",
      name: "",
      photo: ""
    },
    isPublic: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return { ...state, recipes: action.payload };
    case FETCH_PUBLIC_RECIPES:
      return { ...state, publicRecipes: action.payload };
    case FETCH_SINGLE_RECIPE:
      return { ...state, selectedRecipe: action.payload };
    case ADD_RECIPE:
      return state;
    case DELETE_RECIPE:
      return { ...state, selectedRecipe: initialState.selectedRecipe };
    case UPDATE_RECIPE:
      return { ...state, selectedRecipe: initialState.selectedRecipe };
    case UPDATE_RECIPE_FIELD:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          [action.fieldName]: action.value
        }
      };
    case CLEAN_SELECTED_RECIPE:
      return { ...state, selectedRecipe: initialState.selectedRecipe };
    case ADD_FLAVOR_TO_RECIPE:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          recipeFlavors: [...state.selectedRecipe.recipeFlavors, action.payload]
        }
      };
    case UPDATE_RECIPE_WITH_PRODUCTION:
      return state;
    case EDIT_FLAVOR_TO_RECIPE:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          recipeFlavors: [
            ...state.selectedRecipe.recipeFlavors.map(flavor => {
              return flavor.flavorId === action.flavorId
                ? { ...flavor, perc: action.perc }
                : flavor;
            })
          ]
        }
      };
    case DELETE_FLAVOR_TO_RECIPE:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          recipeFlavors: [
            ...state.selectedRecipe.recipeFlavors.filter(
              flavor => flavor._id !== action.payload
            )
          ]
        }
      };
    default:
      return state;
  }
}

export const recipeProductionMetrics = state => {
  const countProductionBatches = state.selectedRecipe.production.length;
  const totalMlProduced = state.selectedRecipe.production.reduce(
    (a, b) => a + b.mlProduced,
    0
  );
  const summaryMetrics = {
    countProductionBatches: countProductionBatches,
    totalMlProduced: totalMlProduced
  };
  return summaryMetrics;
};

export const recipeProductionByMonth = state => {
  let monthArray = [];
  let monthNumList = [];
  let byMonthMetrics = [];

  state.selectedRecipe.production.map(productionBatch => {
    return (monthArray = [
      ...monthArray,
      {
        _id: productionBatch._id,
        productionDate: productionBatch.productionDate,
        productionMonth: moment(productionBatch.productionDate).month() + 1,
        productionYear: moment(productionBatch.productionDate).year(),
        productionYearMonth: `${moment(
          productionBatch.productionDate
        ).year()}-${moment(productionBatch.productionDate).month() + 1}`,
        count: 1,
        mlProduced: productionBatch.mlProduced
      }
    ]);
  });

  monthArray.map(x => {
    return (monthNumList = _.union([...monthNumList, x.productionYearMonth]));
  });

  monthNumList.map(n => {
    return (byMonthMetrics = [
      ...byMonthMetrics,
      {
        yearMonth: n,
        count: monthArray.filter(x => x.productionYearMonth === n).length,
        mlProduced: monthArray
          .filter(x => x.productionYearMonth === n)
          .reduce((a, b) => a + b.mlProduced, 0),
        productionDate: monthArray.filter(x => x.productionYearMonth === n)[0]
          .productionDate
      }
    ]);
  });

  return _.sortBy(byMonthMetrics, "productionDate");
};

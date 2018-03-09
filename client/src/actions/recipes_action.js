import axios from 'axios';
import {
  FETCH_RECIPES,
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
} from './types';

import { fetchFlavors } from './flavors_action';

const recipesUrl =
  'https://ff899484-3588-49f7-a59c-c3da656b9f90-bluemix:06ea6140929d10f0ff080b60d3a8ab4d5f9c5898a68954b3f4340007fa5ccb92@ff899484-3588-49f7-a59c-c3da656b9f90-bluemix.cloudant.com/recipes_db/';

export const fetchRecipes = () => {
  const request = axios
    .get(`${recipesUrl}_all_docs?include_docs=true`)
    .then(response => {
      return response.data.rows.map(x => x.doc);
    });

  return {
    type: FETCH_RECIPES,
    payload: request
  };
};

export const fetchSingleRecipe = recipeId => {
  return dispatch => {
    const request = axios.get(`${recipesUrl}${recipeId}`).then(response => {
      return response.data;
    });

    return dispatch({
      type: FETCH_SINGLE_RECIPE,
      payload: request
    }).then(() => dispatch(fetchFlavors()));
  };
};

export const addRecipe = recipe => {
  return dispatch => {
    const request = axios.post(recipesUrl, recipe).then(response => {
      return response;
    });

    return dispatch({
      type: ADD_RECIPE,
      payload: request
    }).then(() => dispatch(fetchRecipes()));
  };
};

export const updateRecipe = (recipeId, newRecipe) => {
  return dispatch => {
    const request = axios
      .put(`${recipesUrl}${recipeId}`, newRecipe)
      .then(response => {
        return response;
      });

    return dispatch({
      type: UPDATE_RECIPE,
      payload: request
    }).then(() => dispatch(fetchRecipes()));
  };
};

export const deleteRecipe = (recipeId, recipeRev) => {
  return dispatch => {
    const request = axios
      .delete(`${recipesUrl}${recipeId}?rev=${recipeRev}`)
      .then(response => {
        return response;
      });

    return dispatch({
      type: DELETE_RECIPE,
      payload: request
    }).then(() => dispatch(fetchRecipes()));
  };
};

export const updateRecipeField = (value, fieldName) => {
  return {
    type: UPDATE_RECIPE_FIELD,
    value,
    fieldName
  };
};

export const cleanSelectedRecipe = () => {
  return {
    type: CLEAN_SELECTED_RECIPE,
    payload: {}
  };
};

export const addFlavorToRecipe = flavor => {
  return {
    type: ADD_FLAVOR_TO_RECIPE,
    payload: flavor
  };
};

export const updateRecipeWithProduction = (recipeId, newRecipe) => {
  return dispatch => {
    const request = axios
      .put(`${recipesUrl}${recipeId}`, newRecipe)
      .then(response => {
        return response;
      });

    return dispatch({
      type: UPDATE_RECIPE_WITH_PRODUCTION,
      payload: request
    }).then(() => dispatch(fetchSingleRecipe(recipeId)));
  };
};

export const editFlavorToRecipe = (flavorId, perc) => {
  return {
    type: EDIT_FLAVOR_TO_RECIPE,
    flavorId,
    perc
  };
};
export const deleteFlavorToRecipe = flavorId => {
  return {
    type: DELETE_FLAVOR_TO_RECIPE,
    payload: flavorId
  };
};

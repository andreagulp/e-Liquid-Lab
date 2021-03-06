import axios from "axios";
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
} from "./types";

import { fetchFlavors } from "./flavors_action";

export const fetchPublicRecipes = () => {
  const request = axios
    .get(`/api/public-recipes`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });

  return {
    type: FETCH_PUBLIC_RECIPES,
    payload: request
  };
};

export const fetchRecipes = () => {
  const request = axios
    .get(`/api/recipes`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });

  return {
    type: FETCH_RECIPES,
    payload: request
  };
};

export const fetchSingleRecipe = recipeId => {
  return dispatch => {
    const request = axios
      .get(`/api/recipes/${recipeId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
        return error;
      });

    return dispatch({
      type: FETCH_SINGLE_RECIPE,
      payload: request
    }).then(() => dispatch(fetchFlavors()));
  };
};

export const addRecipe = recipe => {
  return dispatch => {
    const request = axios.post("/api/newRecipe", recipe).then(response => {
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
      .patch(`/api/recipes/update/${recipeId}`, newRecipe)
      .then(response => {
        return response;
      });

    return dispatch({
      type: UPDATE_RECIPE,
      payload: request
    }).then(() => dispatch(fetchRecipes()));
  };
};

export const deleteRecipe = recipeId => {
  return dispatch => {
    const request = axios
      .delete(`/api/recipes/delete/${recipeId}`)
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
      .patch(`/api/recipes/update/${recipeId}`, newRecipe)
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

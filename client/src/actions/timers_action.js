import axios from "axios";
import {
  UPDATE_TIMER_FIELD,
  UPDATE_STEP_FIELD,
  ADD_STEP_TO_TIMER,
  CLEAN_SELECTED_TIMER,
  CLEAN_SELECTED_STEP,
  ADD_TIMER,
  FETCH_SINGLE_RECIPE_TIMER,
  FETCH_TIMERS,
  EDIT_SINGLE_RECIPE_TIMER,
  UPDATE_TIMER
} from "./types";

// Timer
export const updateTimerField = (value, fieldName) => {
  return {
    type: UPDATE_TIMER_FIELD,
    value,
    fieldName
  };
};

export const updateStepField = (value, fieldName) => {
  return {
    type: UPDATE_STEP_FIELD,
    value,
    fieldName
  };
};

export const addStepToTimer = step => {
  return {
    type: ADD_STEP_TO_TIMER,
    payload: step
  };
};

export const cleanSelectedTimer = () => {
  return {
    type: CLEAN_SELECTED_TIMER,
    payload: {}
  };
};

export const cleanSelectedStep = () => {
  return {
    type: CLEAN_SELECTED_STEP,
    payload: {}
  };
};

export const addTimer = (timer, recipeId) => {
  return dispatch => {
    const request = axios.post("/api/newTimer", timer).then(response => {
      return response;
    });

    return dispatch({
      type: ADD_TIMER,
      payload: request
    }).then(() => dispatch(fetchSingleRecipeTimer(recipeId)));
  };
};

export const fetchSingleRecipeTimer = recipeId => {
  return dispatch => {
    const request = axios
      .get(`/api/timers/${recipeId}`)
      .then(response => {
        console.log("action response fetchSingleRecipeTimer:", response);
        return response.data;
      })
      .catch(error => {
        console.log(error);
        return error;
      });

    return dispatch({
      type: FETCH_SINGLE_RECIPE_TIMER,
      payload: request
    });
  };
};

export const editSingleRecipeTimer = (recipeId, timerId) => {
  console.log("action recipeId:", recipeId);
  console.log("action timerId:", timerId);
  return dispatch => {
    const request = axios
      .get(`/api/timers/${recipeId}`)
      .then(response => {
        console.log(
          "action response editSingleRecipeTimer response:",
          response
        );
        return response.data;
      })
      .then(filteredResult => {
        console.log(
          "action response editSingleRecipeTimer filteredResult:",
          filteredResult
        );
        return filteredResult.filter(x => x._id === timerId)[0];
      })
      .catch(error => {
        console.log(error);
        return error;
      });

    return dispatch({
      type: EDIT_SINGLE_RECIPE_TIMER,
      payload: request
    });
  };
};

export const fetchTimers = () => {
  const request = axios
    .get(`/api/timers`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });

  return {
    type: FETCH_TIMERS,
    payload: request
  };
};

export const updateTimer = (timerId, newTimer, recipeId) => {
  return dispatch => {
    const request = axios
      .patch(`/api/timers/update/${timerId}`, newTimer)
      .then(response => {
        return response;
      });

    return dispatch({
      type: UPDATE_TIMER,
      payload: request
    }).then(() => dispatch(fetchSingleRecipeTimer(recipeId)));
  };
};

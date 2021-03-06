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
  UPDATE_TIMER,
  GET_STEPID,
  EDIT_STEP,
  UPDATE_STEP,
  REFRESH_STEPS,
  DELETE_TIMER,
  DELETE_STEP,
  UPDATE_COMMENT_FIELD,
  ADD_COMMENT,
  CLEAN_SELECTED_COMMENT,
  UPDATE_TIMER_WITH_COMMENT
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
  return dispatch => {
    const request = axios
      .get(`/api/timers/${recipeId}`)
      .then(response => {
        return response.data;
      })
      .then(filteredResult => {
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
  console.log("timers_action updateTimer newTimer", newTimer);
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

export const getStepId = stepId => {
  return {
    type: GET_STEPID,
    payload: stepId
  };
};

export const editStep = stepId => {
  return {
    type: EDIT_STEP,
    payload: stepId
  };
};
export const updateStep = (newStep, stepId) => {
  return {
    type: UPDATE_STEP,
    newStep,
    stepId
  };
};

export const refreshSteps = newSteps => {
  console.log("here refreshSteps action with new Steps", newSteps);
  return {
    type: REFRESH_STEPS,
    payload: newSteps
  };
};

export const deleteTimer = (timerId, recipeId) => {
  return dispatch => {
    const request = axios
      .delete(`/api/timers/delete/${timerId}`)
      .then(response => {
        return response;
      });

    return dispatch({
      type: DELETE_TIMER,
      payload: request
    }).then(() => dispatch(fetchSingleRecipeTimer(recipeId)));
  };
};

export const deleteStep = stepId => {
  return {
    type: DELETE_STEP,
    payload: stepId
  };
};

export const updateCommentField = (value, fieldName) => {
  return {
    type: UPDATE_COMMENT_FIELD,
    value,
    fieldName
  };
};

export const addComment = comment => {
  return {
    type: ADD_COMMENT,
    payload: comment
  };
};

export const cleanSelectedComment = () => {
  return {
    type: CLEAN_SELECTED_COMMENT,
    payload: {}
  };
};

export const updateTimerWithComment = (timerId, newComment) => {
  const request = axios
    .patch(`/api/timers/update/${timerId}`, newComment)
    .then(response => {
      return response;
    });

  return {
    type: UPDATE_TIMER_WITH_COMMENT,
    payload: request
  };
};

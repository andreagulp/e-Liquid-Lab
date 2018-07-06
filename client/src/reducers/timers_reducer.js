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
} from "../actions/types";

const initialState = {
  timersList: [],
  selectedTimer: {
    timerStart: "",
    timerEnd: "",
    recipeId: "",
    name: "",
    recipeTimerName: "", //use for search function
    description: "",
    creationDate: "",
    user: {
      googleId: "",
      name: "",
      photo: ""
    },
    steps: [],
    comments: []
  },
  selectedStep: {
    order: 0,
    name: "",
    days: 0,
    hours: 0,
    startDate: "",
    endDate: "",
    duration: "",
    notificationActive: true
  },
  selectedComment: {
    text: "",
    daysSince: 0
  },
  selectedStepId: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TIMER_FIELD:
      return {
        ...state,
        selectedTimer: {
          ...state.selectedTimer,
          [action.fieldName]: action.value
        }
      };
    case UPDATE_STEP_FIELD:
      return {
        ...state,
        selectedStep: {
          ...state.selectedStep,
          [action.fieldName]: action.value
        }
      };
    case ADD_STEP_TO_TIMER:
      return {
        ...state,
        selectedTimer: {
          ...state.selectedTimer,
          steps: [...state.selectedTimer.steps, action.payload]
        }
      };
    case CLEAN_SELECTED_TIMER:
      return { ...state, selectedTimer: initialState.selectedTimer };
    case CLEAN_SELECTED_STEP:
      return { ...state, selectedStep: initialState.selectedStep };
    case ADD_TIMER:
      return state;
    case FETCH_SINGLE_RECIPE_TIMER:
      return { ...state, timersList: action.payload };
    case EDIT_SINGLE_RECIPE_TIMER:
      return { ...state, selectedTimer: action.payload };
    case FETCH_TIMERS:
      return { ...state, timersList: action.payload };
    case UPDATE_TIMER:
      return { ...state, selectedTimer: initialState.selectedTimer };
    case GET_STEPID:
      return { ...state, selectedStepId: action.payload };
    case EDIT_STEP:
      return {
        ...state,
        selectedStep: state.selectedTimer.steps.filter(
          step => step._id === action.payload
        )[0]
      };
    case UPDATE_STEP:
      return {
        ...state,
        selectedTimer: {
          ...state.selectedTimer,
          steps: [
            ...state.selectedTimer.steps.map(step => {
              return step._id === action.stepId ? action.newStep : step;
            })
          ]
        }
      };
    case REFRESH_STEPS:
      return {
        ...state,
        selectedTimer: {
          ...state.selectedTimer,
          steps: action.payload
        }
      };
    case DELETE_TIMER:
      return { ...state, selectedTimer: initialState.selectedTimer };
    case DELETE_STEP:
      return {
        ...state,
        selectedTimer: {
          ...state.selectedTimer,
          steps: [
            ...state.selectedTimer.steps.filter(
              step => step._id !== action.payload
            )
          ]
        }
      };
    case UPDATE_COMMENT_FIELD:
      return {
        ...state,
        selectedComment: {
          ...state.selectedComment,
          [action.fieldName]: action.value
        }
      };
    case ADD_COMMENT:
      return {
        ...state,
        selectedTimer: {
          ...state.selectedTimer,
          comments: [...state.selectedTimer.comments, action.payload]
        }
      };
    case CLEAN_SELECTED_COMMENT:
      return { ...state, selectedComment: initialState.selectedComment };
    case UPDATE_TIMER_WITH_COMMENT:
      return state;
    default:
      return state;
  }
}

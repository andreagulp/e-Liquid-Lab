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
  REFRESH_STEPS
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
    steps: [
      // {
      //   days: 0,
      //   duration: 0,
      //   endDate: null,
      //   hours: 0,
      //   name: "",
      //   notificationActive: true,
      //   order: 0,
      //   startDate: null,
      //   _id: ""
      // }
    ],
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
    default:
      return state;
  }
}

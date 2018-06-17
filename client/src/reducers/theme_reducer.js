import { TOGGLE_THEME } from "../actions/types";

const initialState = false;

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return action.payload;
    default:
      return state;
  }
}

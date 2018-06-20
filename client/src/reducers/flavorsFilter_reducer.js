import { SEARCH_FLAVOR } from "../actions/types";

const initialState = "";

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FLAVOR:
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
}

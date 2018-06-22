import { SEARCH_RECIPE } from "../actions/types";

const initialState = {
  keyword: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RECIPE:
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
}

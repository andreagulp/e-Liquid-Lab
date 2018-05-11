import { FETCH_USER } from '../actions/types';

const initialState = {
  _id: '',
  googleId: '',
  name: '',
  photo: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false
    default:
      return state
  }
}

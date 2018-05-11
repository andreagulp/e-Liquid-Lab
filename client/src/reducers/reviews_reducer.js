import { FETCH_REVIEWS, ADD_REVIEW } from '../actions/types';

const initialState = [{
    _user: '',
    recipeId: '',
    creationDate: Date.now(),
    text: ''
}]

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_REVIEWS:
            return action.payload
        case ADD_REVIEW:
            return state
        default:
            return state
    }
}
import axios from 'axios'
import { FETCH_REVIEWS, ADD_REVIEW } from './types'


export const fetchRecipeReview = (recipeId) => {
    const request = axios.get(`/api/reviews/${recipeId}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
            return error
        })

    return {
        type: FETCH_REVIEWS,
        payload: request
    }
}

export const addReview = (review, recipeId) => {
    // console.log('action addReview is triggered', review, recipeId)
    return dispatch => {
        const request = axios.post('/api/newReview', review)
            .then(response => {
                // console.log('response addReview arrives', response)
                return response;
            });

        return dispatch({
            type: ADD_REVIEW,
            payload: request
        }).then(() => dispatch(fetchRecipeReview(recipeId)));
    };
};

  //     app.post('/api/newReview', (req, res) => {
//     app.get("/api/reviews/:recipeId", (req, res, next) => {

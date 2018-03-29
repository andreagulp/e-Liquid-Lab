import axios from 'axios'
import {
  FETCH_FLAVORS,
  FETCH_SINGLE_FLAVOR,
  ADD_FLAVOR,
  DELETE_FLAVOR,
  UPDATE_FLAVOR,
  UPDATE_FLAVOR_FIELD,
  CLEAN_SELECTED_FLAVOR,
} from './types';

const flavorsUrl = 'https://ff899484-3588-49f7-a59c-c3da656b9f90-bluemix:06ea6140929d10f0ff080b60d3a8ab4d5f9c5898a68954b3f4340007fa5ccb92@ff899484-3588-49f7-a59c-c3da656b9f90-bluemix.cloudant.com/flavors_db/'


export const fetchFlavors = () => {

  const request = axios.get(`/api/flavors`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
      return error
    })

  return {
    type: FETCH_FLAVORS,
    payload: request
  }
}

export const fetchSingleFlavor = (flavorId) => {
  const request = axios.get(`/api/flavors/${flavorId}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
      return error
    })

  return {
    type: FETCH_SINGLE_FLAVOR,
    payload: request
  }
}

export const addFlavor = (flavor) => {
  return dispatch => {
    const request = axios.post('/api/newflavor', flavor)
      .then(response => {
        return response
      })

    return dispatch({
      type: ADD_FLAVOR,
      payload: request
    }).then(() => dispatch(fetchFlavors()))
      .then(() => dispatch(cleanSelectedFlavor()))
  }
}

export const updateFlavor = (flavorId, newFlavor) => {
  // console.log('action start')
  return dispatch => {
    const request = axios.patch(`/api/flavors/update/${flavorId}`, newFlavor)
      .then(response => {
        // console.log('action result', response)
        return response
      })

    return dispatch({
      type: UPDATE_FLAVOR,
      payload: request
    }).then(() => dispatch(fetchFlavors()))
  }
}

export const deleteFlavor = (flavorId) => {
  return dispatch => {
    const request = axios.delete(`/api/flavors/delete/${flavorId}`)
      .then(response => {
        return response
      })

    return dispatch({
      type: DELETE_FLAVOR,
      payload: request
    }).then(() => dispatch(fetchFlavors()))
  }
}

export const updateFlavorField = (value, fieldName) => {
  return {
    type: UPDATE_FLAVOR_FIELD,
    value,
    fieldName
  }
}

export const cleanSelectedFlavor = () => {
  return {
    type: CLEAN_SELECTED_FLAVOR,
    payload: {}
  }
}

import {
  FETCH_FLAVORS,
  FETCH_SINGLE_FLAVOR,
  ADD_FLAVOR,
  DELETE_FLAVOR,
  UPDATE_FLAVOR,
  UPDATE_FLAVOR_FIELD,
  CLEAN_SELECTED_FLAVOR
} from '../actions/types';

const initialState = {
  inventoryFlavors: [],
  selectedFlavor: {
    brand: '',
    name: '',
    iconUrl: '',
    qty: 10.0,
    rating: 0,
    baseVg: 0,
    basePg: 100,
    comment: '',
    storageLocation: '',
    expirationDate: null,
    minQtyAlert: 0,
    expirationDateAlertActive: false,
    minQtyAlertActive: false,
    alertList: false,
    user: {}
  }
}

export default function (state = initialState, action) {
  // console.log('f;avpr_reducer', state, action)
  switch (action.type) {
    case FETCH_FLAVORS:
      return { ...state, inventoryFlavors: action.payload }
    case FETCH_SINGLE_FLAVOR:
      return { ...state, selectedFlavor: action.payload }
    case ADD_FLAVOR:
      return state
    case DELETE_FLAVOR:
      return { ...state, selectedFlavor: initialState.selectedFlavor }
    case UPDATE_FLAVOR:
      return { ...state, selectedFlavor: initialState.selectedFlavor }
    case UPDATE_FLAVOR_FIELD:
      return { ...state, selectedFlavor: { ...state.selectedFlavor, [action.fieldName]: action.value } }
    case CLEAN_SELECTED_FLAVOR:
      return { ...state, selectedFlavor: initialState.selectedFlavor }
    default:
      return state
  }
}

export const flavorsAutocomplete = (state) => {
  let flavorsList = []
  if (state.inventoryFlavors) {
    state.inventoryFlavors.map(flavor => {
      return flavorsList = [...flavorsList, {
        nameBrand: `${flavor.name} - ${flavor.brand}`,
        _id: flavor._id,
        name: flavor.name,
        brand: flavor.brand,
        iconUrl: flavor.iconUrl,
        vg: flavor.baseVg,
        pg: flavor.basePg,
      }]

    })
  }

  return flavorsList

}

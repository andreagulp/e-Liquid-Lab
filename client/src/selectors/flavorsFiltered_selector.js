import { createSelector } from "reselect";
import { getFlavorAlertList } from "./flavors_selector";

const getFlavors = state => state.flavors.inventoryFlavors;
const getKeyword = state => state.flavorsFilter.keyword;

export const getVisibleFlavors = createSelector(
  [getFlavors, getKeyword],
  (flavors, keyword) => {
    console.log(keyword);
    if (keyword && keyword.length > 0) {
      return flavors.filter(flavor =>
        flavor.nameBrand.toUpperCase().includes(keyword)
      );
    } else {
      return flavors;
    }
  }
);

export const getVisibleFlavorsAlert = createSelector(
  [getFlavorAlertList, getKeyword],
  (flavors, keyword) => {
    console.log(keyword);
    if (keyword && keyword.length > 0) {
      return flavors.filter(flavor =>
        flavor.nameBrand.toUpperCase().includes(keyword.toUpperCase())
      );
    } else {
      return flavors;
    }
  }
);

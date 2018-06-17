import { TOGGLE_THEME } from "./types";

export const toggleTheme = darkThemeFlag => {
  return {
    type: TOGGLE_THEME,
    payload: darkThemeFlag
  };
};

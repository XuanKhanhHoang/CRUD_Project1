import { toEngLanguage, toViLanguage } from "../actions/languageAction";
const initState = { isViLanguage: false };
const languageReducer = (state = initState, action) => {
  switch (action.type) {
    case toEngLanguage:
      return {
        ...state,
        isViLanguage: false,
      };
    case toViLanguage:
      return {
        ...state,
        isViLanguage: true,
      };
    default:
      return state;
  }
};

export default languageReducer;

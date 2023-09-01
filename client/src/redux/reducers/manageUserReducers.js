import {
  CHANGE_FIELD_SEARCH,
  CHANGE_KEYWORD,
  CLEAR_ALL_KEYWORD_AND_FIELD_SEARCH,
} from "../actions/manageUserAction";

const initState = {
  keyword: "",
  fieldSearch: "email",
};
const manageUserReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    case CHANGE_FIELD_SEARCH:
      return {
        ...state,
        fieldSearch: action.payload,
      };
    case CLEAR_ALL_KEYWORD_AND_FIELD_SEARCH:
      return {
        ...state,
        ...initState,
      };
    default:
      return state;
  }
};
export default manageUserReducer;

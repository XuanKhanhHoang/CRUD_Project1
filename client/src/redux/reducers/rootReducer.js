import { combineReducers } from "redux";
import userReducer from "./userReducer";
import languageReducer from "./languageReducer";
import manageUserReducer from "./manageUserReducers";
const rootReducer = combineReducers({
  user: userReducer,
  language: languageReducer,
  manageUser: manageUserReducer,
});

export default rootReducer;

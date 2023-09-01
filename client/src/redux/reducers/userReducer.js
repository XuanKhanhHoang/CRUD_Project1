import { toast } from "react-toastify";
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_FETCHING,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SESSION_VALID,
} from "../actions/userAction";

const initState = {
  account: { email: "", auth: undefined, token: "" },
  isLoading: false,
  isError: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          email: action.payload.account.email,
          token: action.payload.account.token,
          auth: true,
        },
        isLoading: false,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        account: { ...state.account, auth: false },
        isError: true,
        isLoading: false,
      };
    case USER_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        account: { email: "", auth: undefined, token: "" },
      };
    case USER_SESSION_VALID:
      localStorage.clear();
      toast.error("Your session no longer valid ,please to login !");
      return {
        ...state,
        account: { email: "", auth: undefined, token: "" },
      };
    default:
      return state;
  }
};

export default userReducer;

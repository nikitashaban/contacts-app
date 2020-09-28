import { ThunkAction } from "redux-thunk";

import { getUsers } from '../externalApi/auth'
// const
const SET_AUTH_INFO = "SET_AUTH_INFO";
const SET_AUTH_LOADING = "SET_AUTH_LOADING";
const SET_AUTH_ERROR = "SET_AUTH_ERROR";


//initial state

interface State {
  authInfo: {
    info: { token: string; username: string };
    loading: boolean;
    error: boolean;
  };
}

const initialState: State = {
  authInfo: {
    info: {
      token: localStorage.getItem("user") || "",
      username: '',
    },
    error: false,
    loading: false,
  },
};

type Action =
  | { type: typeof SET_AUTH_INFO; payload: State["authInfo"]["info"] }
  | { type: typeof SET_AUTH_LOADING; payload: boolean }
  | { type: typeof SET_AUTH_ERROR; payload: boolean };


//reducer
export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case SET_AUTH_INFO: {
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          info: action.payload,
        },
      };
    }
    case SET_AUTH_LOADING: {
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          loading: action.payload,
        },
      };
    }
    case SET_AUTH_ERROR: {
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          error: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

//actions
export const setAuthInfo = (payload: State["authInfo"]["info"]) => ({
  type: SET_AUTH_INFO,
  payload,
});
export const setAuthLoading = (payload: boolean) => ({
  type: SET_AUTH_LOADING,
  payload,
});
export const setAuthError = (payload: State["authInfo"]["error"]) => ({
  type: SET_AUTH_ERROR,
  payload,
});


//action creators

export const loginHandler = (user: string, password: string): ThunkAction<void, State, unknown, any> => {
  return async (dispatch) => {
    dispatch(setAuthLoading(true));
    try {
      const userList = await getUsers()
      const currentUser = userList.find((u: { password: string, username: string, token: string }) => u.password === password && u.username === user)
      if (currentUser) {
        dispatch(setAuthInfo(currentUser))
        localStorage.setItem("user", currentUser.token)
      } else {
        dispatch(setAuthError(true));
      }
      dispatch(setAuthLoading(false));
    } catch (err) {
      dispatch(setAuthError(true));
      dispatch(setAuthLoading(false));
    }
  };
};


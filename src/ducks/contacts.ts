import { ThunkAction } from "redux-thunk";

import { getContacts } from '../externalApi/contacts'
// const
const SET_CONTACTS = "SET_CONTACTS";
const SET_CONTACTS_LOADING = "SET_CONTACTS_LOADING";
const SET_CONTACTS_ERROR = "SET_CONTACTS_ERROR";

const SET_SEARCH = "SET_SEARCH"


//initial state

interface State {
  search: string;
  contacts: {
    data: Array<{ id: number; name: string, phone: string }> | null;
    loading: boolean;
    error: boolean;
  };
}

const initialState: State = {
  search: '',
  contacts: {
    data: null,
    loading: false,
    error: false,
  },
};

type Action =
  | { type: typeof SET_CONTACTS; payload: State["contacts"]["data"] }
  | { type: typeof SET_CONTACTS_LOADING; payload: boolean }
  | { type: typeof SET_CONTACTS_ERROR; payload: boolean }
  | { type: typeof SET_SEARCH; payload: string };


//reducer
export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case SET_CONTACTS: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          data: action.payload,
        },
      };
    }
    case SET_CONTACTS_LOADING: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          loading: action.payload,
        },
      };
    }
    case SET_CONTACTS_ERROR: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          error: action.payload,
        },
      };
    }
    case SET_SEARCH: {
      return {
        ...state,
        search: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

//actions
export const setContacts = (payload: State["contacts"]["data"]) => ({
  type: SET_CONTACTS,
  payload,
});
export const setContactsLoading = (payload: boolean) => ({
  type: SET_CONTACTS_LOADING,
  payload,
});
export const setContactsError = (payload: boolean) => ({
  type: SET_CONTACTS_ERROR,
  payload,
});
export const setSearch = (payload: string) => ({
  type: SET_SEARCH,
  payload,
});


//action creators

export const getContactsHandler = (): ThunkAction<void, State, unknown, any> => {
  return async (dispatch) => {
    dispatch(setContactsLoading(true));
    try {
      const contactsList = await getContacts()
      dispatch(setContacts(contactsList))
      dispatch(setContactsLoading(false));
    } catch (err) {
      dispatch(setContactsError(true));
      dispatch(setContactsLoading(false));
    }
  };
};


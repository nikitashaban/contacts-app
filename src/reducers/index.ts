import { combineReducers } from "redux";
import { useSelector as _useSelector, TypedUseSelectorHook } from "react-redux";

import auth from "../ducks/auth";
import contacts from "../ducks/contacts";


const rootReducer = combineReducers({
  auth, contacts
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

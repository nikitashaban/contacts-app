import React, { createContext, useReducer } from "react";

interface IState {
  text: string,
  status: "success" | "info" | "warning" | "error" | undefined,
  open: boolean
}


const initialState: IState = {
  text: "",
  status: "success",
  open: false,
};



type Action =
  | { type: "success"; payload: string }
  | { type: "error"; payload: string }
  | { type: "clear" };

const reducer = (state = initialState, action: Action): IState => {
  switch (action.type) {
    case "success":
      return {
        text: action.payload,
        status: action.type,
        open: true,
      };
    case "error":
      return {
        text: action.payload,
        status: action.type,
        open: true,
      };
    case "clear":
      return {
        ...state,
        open: false
      };
    default:
      return {
        ...state,
      };
  }
};



const store = createContext<{ state: IState, dispatch: React.Dispatch<any> }>({ state: initialState, dispatch: () => null });
const { Provider } = store;

const AlertProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AlertProvider };

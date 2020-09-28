import { useContext, useMemo } from "react";
import { store } from "../context/alertContext";

const useAlert = () => {
  const alertState = useContext(store);
  const { dispatch } = alertState;

  const alertActions = useMemo(
    () => ({
      success: function (value: string) {
        dispatch({ type: "success", payload: value || "Success !" });
      },
      error: function (value: string) {
        dispatch({ type: "error", payload: value || "Error !" });
      },
      close: function () {
        dispatch({ type: "clear" });
      },
    }),
    [dispatch]
  );

  return [alertState.state, alertActions] as const
};

export default useAlert;

import React, { createContext, useReducer, useContext } from "react";
import ContextReducer, { initial } from "./../reducers/Music";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContextReducer, initial);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

import React, { createContext, useReducer, useContext, useState } from "react";
import ContextReducer, { initial } from "./../reducers/Music";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContextReducer, initial);
  const [navigator, setNavigator] = useState(() => ({}));
  return (
    <StateContext.Provider
      value={{
        reducer: [state, dispatch],
        navigator: [navigator, setNavigator],
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

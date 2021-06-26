import React, { createContext, useReducer } from 'react';

import AppReducer from './AppReducer';

// initial state
const initialState = {
  userBids: [],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provide COmponent
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  function addUserbid(bid) {
    dispatch({
      type: 'ADD_USERBID',
      payload: bid,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        userBids: state.userBids,
        addUserbid,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

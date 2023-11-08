import { createContext, useReducer } from "react";

const MsgsContext = createContext([]);
const MsgsDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MSGS":
      return action.payload;

    case "ADD_MSG":
      return [...state, `${action.payload.name}: ${action.payload.msg}`];

    case "RESET":
      return [];
  }
};

let msgs;
let msgsDispatch;

const MsgsProvider = ({ children }) => {
  [msgs, msgsDispatch] = useReducer(reducer, []);

  return (
    <MsgsContext.Provider value={msgs}>
      <MsgsDispatchContext.Provider value={msgsDispatch}>
        {children}
      </MsgsDispatchContext.Provider>
    </MsgsContext.Provider>
  );
};

export default MsgsProvider;

export { msgsDispatch, MsgsContext, MsgsDispatchContext };

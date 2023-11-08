import { createContext, useReducer } from "react";

const DataContext = createContext(null);
const DataDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { data: action.payload.data, type: action.payload.type };

    case "RESET":
      return {};
  }
};

let data;
let dataDispatch;

const DataProvider = ({ children }) => {
  [data, dataDispatch] = useReducer(reducer, []);

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dataDispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
};

export default DataProvider;

export { dataDispatch, DataContext, DataDispatchContext };

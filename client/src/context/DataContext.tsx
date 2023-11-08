import { createContext, useReducer } from "react";

const DataContext = createContext({ text: "", file: null });
const DataDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload.text };

    case "SET_FILE":
      return { ...state, file: action.payload.file };

    case "TEXT_RESET":
      return { ...state, text: "" };

    case "FILE_RESET":
      return { ...state, file: null };
  }
};

let data;
let dataDispatch;

const DataProvider = ({ children }) => {
  [data, dataDispatch] = useReducer(reducer, { text: "", file: null });

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

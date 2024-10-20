import React, { useState } from "react";
import { createContext } from "react";

export const AppState = createContext();

function DataContext({children}) {
  const [user, setUser] = useState("");
  return (
    <AppState.Provider value={{user,setUser}}>
     {children}
    </AppState.Provider>
  );
}

export default DataContext;

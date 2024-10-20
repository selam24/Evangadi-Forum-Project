import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DataContext from "./Context/DataContext.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
     <BrowserRouter>
        <DataContext>
          <App />
        </DataContext>
      </BrowserRouter>
  </StrictMode>
 
);

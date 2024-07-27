import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreConextProvider from "./context/storeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreConextProvider>
      <App />
    </StoreConextProvider>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AlexioState from "./Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AlexioState>
    <App />
  </AlexioState>
);

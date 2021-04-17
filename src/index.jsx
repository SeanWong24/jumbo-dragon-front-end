// import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import App from "./components/app/app";

const rootElement = document.getElementById("root");
ReactDOM.render(
  // <StrictMode>
  <Router>
    <App />
  </Router>,
  // </StrictMode>,
  rootElement
);

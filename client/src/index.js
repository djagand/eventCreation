import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { reducers } from "./reducers";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";

const initialState = {
  auth: {
    authenticated: localStorage.getItem("token")
  }
};

ReactDOM.render(
  <Provider
    store={createStore(reducers, initialState, applyMiddleware(reduxThunk))}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

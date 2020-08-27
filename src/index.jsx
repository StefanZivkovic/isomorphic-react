import App from "./App";
import ReactDOM from "react-dom";
import React from "react";
import getStore from "./getStore";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

const store = getStore(history);

const fetchDataForLocation = () => {
  store.dispatch({ type: `REQUEST_FETCH_QUESTIONS` });
};

const render = (_App) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <_App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("AppContainer")
  );
};

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}

// render(App);

store.subscribe(() => {
  const state = store.getState();
  if (state.questions.length > 0) {
    console.log("Mounting app");
    render(App);
  } else {
    console.log("app not yet mounted");
  }
});
fetchDataForLocation();

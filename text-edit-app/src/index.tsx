import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { history, store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();

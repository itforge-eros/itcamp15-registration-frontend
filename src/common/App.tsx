import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "@reach/router";
import { Provider } from "react-redux";

import "normalize.css";

import "../style.sass";

import createStore from "../ducks";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Store, AnyAction } from "redux";
import { PersistedState } from "redux-persist";
import "./icon";

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
    FS: any;
    ga: UniversalAnalytics.ga;
    firebase: firebase.app.App;
    store: Store<PersistedState, AnyAction> & { dispatch: {} };
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    navigate: any;
  }
}

export const MAIN_PAGE = "https://www.jwc.in.th";

export const store = createStore();

if (typeof window !== "undefined") {
  window.store = store;
}
const StaticRoutes = (_: { default: boolean }) => <Routes />;

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Root>
          <Router>
            <StaticRoutes default />
          </Router>
        </Root>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;

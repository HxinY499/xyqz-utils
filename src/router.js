import React from "react";
import { Router, Route, Switch } from "dva/router";
import dynamic from "dva/dynamic";
import { app } from "./index.js";

const IndexPage = dynamic({
  app,
  models: () => [import("./models/example")],
  component: () => import("./routes/IndexPage"),
});

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

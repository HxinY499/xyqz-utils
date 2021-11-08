import dva from "dva";
import { createBrowserHistory } from "history";
import { Router, Route } from "dva/router";
import App from "./App";
import "./index.css";

const history = createBrowserHistory();
// 1. Initialize
const app = dva({
  history,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/global").default);

// 4. Router
app.router(({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
});

// 5. Start
app.start("#root");

export { app };

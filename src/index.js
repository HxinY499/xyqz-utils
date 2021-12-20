import dva from "dva";
import { createBrowserHistory } from "history";
import { Router, Route } from "react-router";
import App from "./App";

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
      <Route children={(props) => <App {...props} />} />
    </Router>
  );
});

// 5. Start
app.start("#root");

export { app };

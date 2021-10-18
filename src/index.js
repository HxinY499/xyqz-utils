import dva from "dva";
import { createBrowserHistory as createHistory } from "history";
import App from "./App";
import "./index.css";

// const { ConnectedRouter } = routerRedux;

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/global").default);
// app.model(require("./models/products").default);

// 4. Router
app.router(() => <App />);

// 5. Start
app.start("#root");

export { app };

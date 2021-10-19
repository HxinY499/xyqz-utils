import React from "react";
import { connect } from "dva";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Route, Switch } from "dva/router";
import styles from "./index.css";
import XYRouter from "./router";

class App extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.init();
  }

  handleRoute = (path) => {
    console.log(path);
    this.props.history.push(path);
  };

  render() {
    const { global, history } = this.props;
    return (
      <>
        <div className={styles.indexHeader}>
          <span className={styles.headerTitle}>xyqz-utils</span>
        </div>
        <div className={styles.indexContent}>
          <div className={styles.indexNavBar}>
            {(global.routerData || []).map((item) => {
              return (
                <div
                  className={styles.indexNavBarItem}
                  onClick={() => this.handleRoute(item.path)}
                >
                  {item.icon}
                  <span className={styles.indexNavBarItemText}>
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={styles.routeContentWrapper}>
            <div className={styles.routeContent}>
              {/* {global.routerData.length > 0 && <XYRouter />} */}
              <Switch>
                <Route
                  path="/"
                  component={require("./routes/IndexPage/index").default}
                  exact={true}
                />
                <Route
                  path="/test"
                  component={require("./routes/Test/index").default}
                  // exact={true}
                />
              </Switch>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps({ global }) {
  return {
    global,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    init() {
      return dispatch({ type: "global/init" });
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

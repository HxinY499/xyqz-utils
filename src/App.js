import React from "react";
import { connect } from "dva";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "dva/router";
import styles from "./index.css";

class App extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { history, global } = this.props;
    return (
      <>
        <div className={styles.indexHeader}>
          <span className={styles.headerTitle}>xyqz-utils</span>
        </div>
        <div className={styles.indexContent}>
          <div className={styles.navBar}>
            {(global.routerData || []).map((item) => {
              return <div>{item.title}</div>;
            })}
          </div>
          <div className={styles.routeContent}>
            {global.routerData.length > 0 && (
              <BrowserRouter history={history}>
                <Switch>
                  {global.routerData?.map((item) => {
                    return (
                      <Route
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                      />
                    );
                  })}
                </Switch>
              </BrowserRouter>
            )}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

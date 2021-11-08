import React from "react";
import { connect } from "dva";
import { Route, Switch } from "dva/router";
import styles from "./index.css";

function App(props) {
  const { init, global, history } = props;
  React.useEffect(() => {
    init();
    console.log(history);
  }, []);

  const handleRoute = (path) => {
    history.push({ pathname: path });
  };

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
                onClick={() => handleRoute(item.path)}
              >
                {item.icon}
                <span className={styles.indexNavBarItemText}>{item.title}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.routeContentWrapper}>
          <div className={styles.routeContent}>
            {/* { history.location.pathname === '/' && <Redirect from="/" to="/index" /> } */}
            {global.routerData.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

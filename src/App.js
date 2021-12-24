import React from "react";
import { connect } from "dva";
// import { Route, Switch, withRouter } from "react-router";
import { CacheRoute, CacheSwitch } from "./components/CacheRoute/index.ts";
import styles from "./index.css";
import "antd/dist/antd.css";

function App(props) {
  const { init, global, history, location } = props;
  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoute = (path) => {
    history.push({ pathname: path });
  };

  const generateClass = (path) => {
    const className = [styles.indexNavBarItem];
    if (path === location.pathname) {
      className.push(styles.indexNavBarItemActive);
    }
    return className.join(" ");
  };

  return (
    <>
      <div className={styles.indexHeader}>
        <span className={styles.headerTitle}>HxinY</span>{" "}
      </div>
      <div className={styles.indexContent}>
        <div className={styles.indexNavBar}>
          {(global.routerData || []).map((item) => {
            return (
              <div
                className={generateClass(item.path)}
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
              <CacheSwitch>
                {global.routerData?.map((item) => {
                  return (
                    <CacheRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      shouldReMount={false}
                      shouldMatchExact={true}
                      shouldDestroyDomWhenNotMatch={false}
                    />
                  );
                })}
              </CacheSwitch>
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

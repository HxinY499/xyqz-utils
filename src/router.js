import React from "react";
import { connect } from "dva";
import { Route, Switch, withRouter } from "dva/router";

function XYRouter(props) {
  return (
    <Switch>
      {props.global.routerData?.map((item) => {
        console.log(item);
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
  );
}

function mapStateToProps({ global }) {
  return {
    global,
  };
}

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(
  withRouter(XYRouter)
);

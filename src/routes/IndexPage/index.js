import React from "react";
import { connect } from "dva";

function IndexPage(props) {
  return (
    <div>
      <h1>Welcome to dva!</h1>
      <button
        onClick={() => {
          console.log(props.test, props.global);
        }}
      >
        index输出
      </button>
      <button
        onClick={() => {
          console.log(window.dvaApp);
        }}
      >
        index输出dva
      </button>
      <button
        onClick={() => {
          props.dispatch({
            type: "test/updateState",
            payload: { testArr: "wwwwwwwwwwwwww" },
          });
        }}
      >
        修改test的值
      </button>
      <button
        onClick={() => {
          props.history.push("/test");
        }}
      >
        路由跳转
      </button>
      <div />
    </div>
  );
}

export default connect(({ global, test }) => ({
  global,
  test,
}))(IndexPage);

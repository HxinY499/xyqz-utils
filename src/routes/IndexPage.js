import React from "react";
import { connect } from "dva";

function IndexPage(props) {
  return (
    <div>
      <button onClick={() => props.history.push("/myfirstpage")}>
        跳转页面
      </button>
      <button
        onClick={() => props.dispatch({ type: "example/save", payload: [4] })}
      >
        添加[4]
      </button>
      <button
        onClick={() => {
          console.log(
            props.dispatch({ type: "products/change", payload: "bbb" })
          );
        }}
      >
        改变products bbb
      </button>
      <button onClick={() => console.log(props.example.test1)}>
        输出example的state
      </button>
      <button onClick={() => console.log(props.products.a)}>
        输出products的state
      </button>
      <h1>Yay! Welcome to dva!</h1>
      <div />
    </div>
  );
}

IndexPage.propTypes = {};

export default connect(({ example }) => ({
  example,
}))(IndexPage);

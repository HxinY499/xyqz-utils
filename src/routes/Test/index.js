import React from "react";
import { connect } from "dva";

function Test(props) {
  console.log(props.test);
  return (
    <div>
      <h1>test</h1>
      <button
        onClick={() => {
          console.log(props.test, props.global);
        }}
      >
        test输出
      </button>
      <div />
    </div>
  );
}

export default connect(({ global, test }) => ({
  global,
  test,
}))(Test);

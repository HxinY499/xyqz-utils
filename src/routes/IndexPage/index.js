import React from "react";
import { connect } from "dva";

function IndexPage() {
  return (
    <div>
      <h1>Welcome to dva!</h1>
    </div>
  );
}

export default connect(({ global }) => ({
  global,
}))(IndexPage);

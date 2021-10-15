import React from "react";
import { connect } from "dva";

function IndexPage(props) {
  return (
    <div>
      <h1>Yay! Welcome to dva!</h1>
      <div />
    </div>
  );
}

IndexPage.propTypes = {};

export default connect(({ global }) => ({
  global,
}))(IndexPage);

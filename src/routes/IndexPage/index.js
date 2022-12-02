import React from 'react';
import { connect } from 'dva';
import styles from './style.css';
import { Button } from 'antd';

function App() {
  return (
    <div>
      <div className={styles.animateWrapper}>
        <h1 className={styles.animate}>welcome to dva</h1>
      </div>
      <Button type="primary">按钮</Button>
    </div>
  );
}

export default connect(({ global }) => {
  return {
    global,
  };
})(App);

import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { connect } from 'dva';
import styles from './style.css';
import { Button } from 'antd';

let root;
function App() {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if (!root) {
      root = document.createElement('div');
      root.className = 'another-root';
      ref.current.appendChild(root);
    }

    const Cmp = () => {
      return <h1>{count}</h1>;
    };
    render(<Cmp />, root);
  }, [])
  // const renderAnother = content => {
  //   requestAnimationFrame(() => {
     
  //   });
  // };

  return (
    <div ref={ref}>
      <div className={styles.animateWrapper}>
        <h1 className={styles.animate}>welcome to dva!</h1>
      </div>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </div>
  );
}

export default connect(({ global }) => {
  return {
    global,
  };
})(App);

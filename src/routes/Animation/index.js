import React, { useState, useRef } from 'react';
import Animate from './Animate';
import styles from './index.less';

export default function CSSAnimate() {
  const [state, setState] = useState([]);
  const count = useRef(0);

  const insert = () => {
    const list = [...state];
    if (list.length > 3) {
      list.splice(2, 0, { value: count.current++ });
    } else {
      list.push({ value: count.current++ });
    }
    setState(list);
  };
  const remove = i => {
    const list = [...state];
    list.splice(i, 1);
    setState(list);
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={insert}>添加</button>
      <Animate component="ul" transitionName="fade">
        {state.map((o, i) => (
          <h1 key={o.value} onClick={() => remove(i)}>
            {o.value}
          </h1>
          // <H1 key={o.value} click={() => remove(i)}>
          //   {o.value}
          // </H1>
        ))}
      </Animate>
    </div>
  );
}
// function H1({ children, click }) {
//   return <h1 onClick={click}>{children}</h1>;
// }

import React, { useState } from 'react';
import Item from './components/Item';
import Son from './Son';
import s from './index.less';

export default function Index() {
  const [flag, setFlag] = useState(true);
  const handleClick = () => {
    setFlag(!flag);
  };
  return (
    <div className={s['wrapper']}>
      <div className={s['root-wrapper']} onClick={handleClick}>
        <Item text="根" />
      </div>

      <div className={s['son-wrapper']}>
        <Son />
      </div>
    </div>
  );
}

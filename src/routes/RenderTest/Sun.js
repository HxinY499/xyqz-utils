import React, { useState } from 'react';
import Item from './components/Item';
import s from './index.less';

export default function Son() {
  const [flag, setFlag] = useState(true);
  const handleClick = () => {
    setFlag(!flag);
  };
  return (
    <div>
      <div className={s['sun-inner-wrapper']} onClick={handleClick}>
        <Item text="孙" />
        <Item text="孙" />
      </div>
    </div>
  );
}

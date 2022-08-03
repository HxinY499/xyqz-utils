import React, { useState } from 'react';
import Item from './components/Item';
import s from './index.less';
import Sun from './Sun';

export default React.memo(function Son() {
  const [flag, setFlag] = useState(true);
  const handleClick = () => {
    setFlag(!flag);
  };
  return (
    <div>
      <div className={s['son-inner-wrapper']} onClick={handleClick}>
        <Item text="子" />
        <Item text="子" />
      </div>

      <div className={s['sun-wrapper']}>
        <Sun />
        <Sun />
      </div>
    </div>
  );
});

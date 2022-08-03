import React, { useEffect, useRef, useState } from 'react';
import s from '../index.less';

export default function Item({ text = '', hash = '' }) {
  const [key, setKey] = useState(true);
  const ref = useRef();

  useEffect(() => {
    ref.current.id = 'highlight';
    setTimeout(() => {
      ref.current.id = '';
    }, 200);
  });

  const refresh = () => {
    setKey(!key);
  };

  return (
    <div
      ref={ref}
      key={key}
      hash={hash}
      className={`find ${s['item-wrapper']}`}
      onClick={refresh}
    >
      {text}
    </div>
  );
}

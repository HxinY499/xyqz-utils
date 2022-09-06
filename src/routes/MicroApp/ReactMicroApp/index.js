// import React from 'react';
import microApp from '@micro-zoe/micro-app';
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';

export default function ReactMicroApp() {
  const sendMessageToMicro = () => {
    microApp.setData('react-app', {
      message: `父给子传的数据 ${Math.random()}`,
    });
  };

  const onDataChange = e => {
    console.log(e);
    alert('子应用传来的消息' + JSON.stringify(e.detail));
  };

  return (
    <>
      <button onClick={sendMessageToMicro}>给Reacr子应用传消息</button>
      <micro-app
        name="react-app"
        url="http://localhost:8002"
        baseroute="/react-app"
        onDataChange={onDataChange}
      />
    </>
  );
}

import React from 'react';

export default function MultipleMicroApp() {
  return (
    <>
      <micro-app
        name="react-app"
        url="http://localhost:8002"
        baseroute="/react-app"
      />
      <micro-app
        name="vue-app"
        url="http://localhost:8001"
        baseroute="/vue-app"
      />
    </>
  );
}

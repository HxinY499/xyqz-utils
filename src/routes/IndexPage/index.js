import React from 'react';

function App(props) {
  // const handleClick = () => {
  //   setArr([...arr].sort(() => Math.random() - 0.5));
  // };
  const handleClick = () => {
    props.history.push('/dto-conver-ds?name=hxy');
  };

  return (
    <>
      <button onClick={handleClick}>跳转</button>
    </>
  );
}

// export default connect(({ global }) => {
//   return { global };
// })(App);

export default App;

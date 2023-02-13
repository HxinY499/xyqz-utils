import React from 'react';
// import React, { Component } from 'react';
import { connect } from 'dva';
// import TweenOne from 'tween-one';
// import styles from './style.css';
import { Button } from 'antd';

// class App extends Component {
//   handleClick = () => {};
//   componentDidMount() {
//     console.log(getRouteState('唯一的键', this.props.history));
//   }
//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.handleClick}>
//           {() => '按钮'}
//         </Button>
//       </div>
//     );
//   }
// }
//渲染生成图片
function App(props) {
  const handleClick = async () => {};
  return (
    <>
      <Button type="primary" onClick={handleClick}>
        按钮
      </Button>
    </>
  );
}
export default connect()(App);

// export default connect(({ global }) => {
//   return {
//     global,
//   };
// })(App);

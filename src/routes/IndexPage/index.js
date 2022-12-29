import React, { Component, useRef } from 'react';
import { connect } from 'dva';
import TweenOne from 'tween-one';
import styles from './style.css';
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
  Button,
  Table,
} from 'antd';

// class App extends Component {
//   handleClick = () => {};
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
const obj = {};
function App() {
  const ref = useRef();
  const handleClick = () => {
    console.log('设置成功，此时name为hxy');
    obj.name = 'hxy';

    // const t = TweenOne(ref.current, {
    //   animation: [
    //     {
    //       x: 300,
    //       duration: 1000,
    //       onUpdate: a => {
    //         // console.log(a);
    //         // console.log(
    //         //   a.vars.style.transform.translateX,
    //         //   '---',
    //         //   ref.current.style.transform
    //         // );
    //       },
    //     },
    //     // {
    //     //   appearTo: 1000,
    //     //   backgroundColor: 'green',
    //     //   duration: 100000,
    //     //   onStart: () => {
    //     //     console.log('动画2执行');
    //     //   },
    //     // },
    //   ],
    // });
  };
  return (
    <>
      <Button type="primary" onClick={handleClick}>
        设置name
      </Button>
      <Button type="primary" onClick={() => console.log(obj)}>
        输出name
      </Button>
      <div
        ref={ref}
        style={{ height: '100px', width: '100px', backgroundColor: 'red' }}
      >
        1
      </div>
    </>
  );
}
export default App;

// export default connect(({ global }) => {
//   return {
//     global,
//   };
// })(App);

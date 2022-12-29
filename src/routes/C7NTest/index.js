import React from 'react';
import { Animate, Button } from 'choerodon-ui';

export default class C7NTest extends React.PureComponent {
  state = { list: [1, 2, 3, 4] };

  start = 5;

  insert = () => {
    const list = this.state.list.slice();
    list.splice(2, 0, (this.start += 1));
    this.setState({ list });
  };

  remove = value => {
    const list = this.state.list.slice();
    const index = list.indexOf(value);
    if (index !== -1) {
      list.splice(index, 1);
      this.setState({ list });
    }
  };

  renderItems() {
    const { list } = this.state;
    return list.map(value => (
      <Li value={value} key={value} />
      //       <li
      //   key={value}
      //   style={{ border: '1px solid #000', marginBottom: '10px' }}
      // >
      //   <div onClick={() => this.remove(value)}>{value}</div>
      // </li>
    ));
  }

  render() {
    return (
      <div>
        <Button onClick={this.insert}>添加</Button>
        <Animate component="ul" transitionName="fade">
          {this.renderItems()}
        </Animate>
      </div>
    );
  }
}

function Li({ value }) {
  return (
    <li key={value} style={{ border: '1px solid #000', marginBottom: '10px' }}>
      <div>{value}</div>
    </li>
  );
}

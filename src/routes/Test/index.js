import React, { useState } from 'react';
import { Input, Dropdown, Menu } from 'antd';

const data = [
  {
    value: '1',
    meaning: 'abc1',
  },
  {
    value: '2',
    meaning: 'teaabst2',
  },
  {
    value: '3',
    meaning: 'acc',
  },
];

function renderMenu(items) {
  if (Array.isArray(items) && items.length > 0) {
    return (
      <Menu>
        {items.map(item => (
          <Menu.Item>{item.meaning}</Menu.Item>
        ))}
      </Menu>
    );
  } else {
    return (
      <Menu>
        <Menu.Item>没有匹配选项</Menu.Item>
      </Menu>
    );
  }
}

export default function Test() {
  const [menu, setMune] = useState(() => renderMenu(data));

  function handleInput(e) {
    e.nativeEvent.preventDefault();
    const matchData = data.filter(o =>
      o.meaning.includes(e.nativeEvent.target.value)
    );
    console.log(matchData);
    const newMenu = renderMenu(matchData);
    setMune(newMenu);
  }
  return (
    <div style={{ width: '200px' }}>
      <Dropdown trigger={['click']} overlay={menu}>
        <Input onInput={handleInput} />
      </Dropdown>
    </div>
  );
}

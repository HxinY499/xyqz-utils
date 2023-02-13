import {
  useEffect,
  createElement,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';

import AnimateChild from './AnimateChild';

function findEntryAndLeave(currentAllChildren, pre) {
  const preKeys = pre.slice();
  const entryKeys = [];
  const allKeys = [];
  currentAllChildren.forEach(child => {
    allKeys.push(child.key);
    const findIndex = preKeys.findIndex(o => o === child.key);
    // 找到，说明是已经进入的child，pre里删掉这个key
    if (findIndex > -1) {
      preKeys.splice(findIndex, 1);
    } else {
      // 没找到，说明是新进入的child
      entryKeys.push(child.key);
    }
  });
  // 循环完pre里还存在的就是要离开的
  return {
    entryKeys,
    leaveKeys: preKeys,
    allKeys,
  };
}

export default function Animate(props) {
  const { children } = props;
  const preChildrenKeys = useRef([]);
  const childRefs = useRef([]);
  const entryKeys = useRef([]);
  const leaveKeys = useRef([]);
  const [stateChildren, setStateChildren] = useState([]);
  useEffect(() => {
    const res = findEntryAndLeave(children, preChildrenKeys.current);
    preChildrenKeys.current = res.allKeys;
    entryKeys.current = res.entryKeys;
    leaveKeys.current = res.leaveKeys;
    if (leaveKeys.current.length > 0) {
      leaveKeys.current.forEach(key => {
        const leaveRef = childRefs.current.find(o => o.key === key);
        leaveRef?.ref?.leaveAnimation();
      });
    }
    childRefs.current = [];
    const newChildren = children.map((child, i) => {
      return createElement(
        AnimateChild,
        {
          key: child.key,
          ref: ref => {
            childRefs.current[i] = { ref, key: child.key };
          },
        },
        child
      );
    });
    setStateChildren(newChildren);
  }, [children]);

  useLayoutEffect(() => {
    stateChildren.forEach((child, i) => {
      if (entryKeys.current.find(o => o === child.key)) {
        childRefs.current[i].ref.entryAnimation();
      }
      if (leaveKeys.current.find(o => o === child.key)) {
        childRefs.current[i].ref.leaveAnimation();
      }
    });
  }, [stateChildren]);

  return stateChildren;
}

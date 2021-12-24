import React from 'react'
import { RouteChildrenProps } from 'react-router';

interface Props extends RouteChildrenProps {
  children?: any;
}

function MemoChildrenWithRouteMatch(props: Props) {
  return props.children;
}

export default React.memo(MemoChildrenWithRouteMatch, (preProps, nextProps) => {
  // 不命中就不渲染，仅在match有值时才渲染组件
  return !nextProps.match;
})

function MemoChildrenWithRouteExactMatch(props: Props) {
  return props.children;
}

export const MemoChildrenWithRouteMatchExact = React.memo(
  MemoChildrenWithRouteExactMatch,
  (preProps, nextProps) => {
    // 不命中就不渲染，仅在match有值切绝对匹配时才渲染组件
    return !(nextProps.match && nextProps.match.isExact);
  }
)
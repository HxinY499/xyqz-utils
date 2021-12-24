import * as React from "react";
import { __RouterContext as RouterContext, matchPath, SwitchProps } from "react-router";
import invariant from "tiny-invariant";

interface SwitchPropsExt extends SwitchProps {
  // 不缓存模式
  noCache?: boolean;
}

export default function CacheSwitch(props: SwitchPropsExt) {
  // 需要一个数组记录哪些子组件曾经渲染过
  const renderedComponentsRef = React.useRef<string[]>([]);
  return (
    <RouterContext.Consumer>
      {context => {
        const location = props.location || context.location;
        // 保存所有需要渲染的子组件
        const components = [];
        // 标识第一次命中匹配
        let isMatched = false;
        React.Children.forEach(props.children, child => {
          // 还原Switch的行为 在命中后不再进行后续child的操作
          if (props.noCache && isMatched) {
            return;
          }
          if (React.isValidElement(child)) {
            const element: any = child;
            const path = element.props.path || element.props.from;
            const match = path
              ? matchPath(location.pathname, { ...child.props, path })
              : context.match;

            const compnentIdentity = element.key || path;
            // 渲染组件方法，通过判断命中数组确保组件命中过
            const renderComponent = forceHide => {
              invariant(compnentIdentity, `请确认组件${element.type}的key`);
              // 曾经渲染过的组件应该继续渲染，隐藏与否根据forceHide参数决定
              renderedComponentsRef.current.includes(compnentIdentity) &&
                components.push(
                  // 使用cloneElement保留原element的props
                  React.cloneElement(element, {
                    // 与Switch一致，将Switch的location传入Route
                    location,
                    computedMatch: match,
                    // 在noCache时 Route行为与原生一致
                    shouldDestroyDomWhenNotMatch: props.noCache,
                    // 渲染组件的css强制控制
                    forceHide: forceHide,
                    // 使用key是必要的，因为Switch下的children是组件数组
                    // 优先使用element的key，如果没有，使用path作为key
                    key: compnentIdentity
                  })
                );
            };
            if (match) {
              if (!isMatched) {
                // 此组件已经满足渲染要求 更新标识符
                !renderedComponentsRef.current.includes(compnentIdentity) &&
                  renderedComponentsRef.current.push(compnentIdentity);
                //第一次匹配成功
                isMatched = true;
                //第一次匹配成功，不强制隐藏
                renderComponent(false);
              } else {
                //不是第一次匹配成功，强制隐藏
                renderComponent(true);
              }
            } else {
              //未匹配成功，强制隐藏
              renderComponent(true);
            }
          }
        });
        // 更新一次标识组件渲染的数组，以满足在key变化时，旧的key能得到清理
        renderedComponentsRef.current = components.map(element => element.key);
        return components;
      }}
    </RouterContext.Consumer>
  );
}
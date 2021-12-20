import * as React from "react";
import { Route, RouteChildrenProps, RouteProps } from "react-router";
import { omit } from "lodash";
import MemoChildrenWithRouteMatch, {
  MemoChildrenWithRouteMatchExact
} from "./MemoCache";
import Remount from "./Remount";

interface Props {
  forceHide?: boolean; // 是否强制刷新，true则无论是否命中均隐藏渲染（为Switch组件服务）
  shouldReMount?: boolean;// 是否重新挂载
  shouldDestroyDomWhenNotMatch?: boolean;// 渲染模式是否为销毁模式，true则在未命中时销毁
  shouldMatchExact?: boolean;// 组件缓存时是全匹配缓存还是模糊匹配缓存
}

export default function CacheRoute(props: RouteProps & Props) {
  const routeHadRenderRef = React.useRef(false);
  return (
    <Route
      {...omit(props, "component", "render", "children")}
      children={(routeProps: RouteChildrenProps) => {
        const Component = props.component;
        const routeMatch = routeProps.match;
        let match = !!routeMatch;
        if (props.shouldMatchExact) {
          match = routeMatch && routeMatch.isExact;
        }
        if (props.shouldDestroyDomWhenNotMatch) {
          if (!match) routeHadRenderRef.current = false;
          // 按正常逻辑
          if (props.render) {
            return match && props.render(routeProps);
          }
          return (
            match && Component && React.createElement(Component, routeProps)
          );
        } else {
          const matchStyle = {
            // 隐藏
            display: match && !props.forceHide ? "block" : "none"
          };
          if (match && !routeHadRenderRef.current) {
            routeHadRenderRef.current = true;
          }
          let shouldRender = true;
          if (!match && !routeHadRenderRef.current) {
            shouldRender = false;
          }
          const MemoCache = props.shouldMatchExact
            ? MemoChildrenWithRouteMatchExact
            : MemoChildrenWithRouteMatch;
          // css隐藏保留dom
          let component;
          if (props.render) {
            component = props.render(routeProps);
          } else {
            component = <Component {...routeProps} />;
          }
          return (
            shouldRender && (
              <div style={matchStyle}>
                {/*提供remount能力*/}
                <Remount shouldRemountComponent={props.shouldReMount}>
                  {/*提供渲染优化*/}
                  <MemoCache {...routeProps}>{component}</MemoCache>
                </Remount>
              </div>
            )
          );
        }
      }
      }
    />
  );
}
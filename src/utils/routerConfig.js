import React from "react";
import dynamic from "dva/dynamic";
import routerConfig from "../config/routes";

function dynamicWrapper(app, _models, _component, pageWrapperComponent) {
  return dynamic({
    app,
    models: () =>
      _models
        .filter((item) => typeof item === "function" || "string")
        .map((model) => {
          if (typeof model === "function") {
            return model();
          } else {
            return import(`../models/${model}`);
          }
        }),
    component: () => {
      return _component().then((raw) => {
        const Component = raw.default || raw;
        return (props) => {
          if (pageWrapperComponent) {
            return React.createElement(
              pageWrapperComponent,
              null,
              React.createElement(Component, props)
            );
          } else {
            return React.createElement(Component, props);
          }
        };
      });
    },
  });
}

function getConvertRouter(options) {
  const { app } = options;
  const routerData = routerConfig.map((config) => {
    const path = config.path || "/";
    const models = config.models || [];
    const title = config.title || "";
    const exact = config.exact || false;
    const icon = config.icon || null;
    let cpn;
    if (config.component === undefined) {
      // cpn =
    } else {
      cpn =
        typeof config.component === "string"
          ? () => config.component
          : config.component;
    }
    const component = dynamicWrapper(
      app,
      models,
      cpn,
      options.pageWrapperComponent
    );
    return {
      path,
      component,
      title,
      exact,
      icon,
    };
  });
  return routerData;
}

export function getRouterData(options) {
  return getConvertRouter(options);
}

import React from "react";
import dynamic from "dva/dynamic";
import routerConfig from "../config/routes";
import { uuid } from "./utils";

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

const modelNotExisted = (app = {}, model) =>
  !(app._models || []).some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf("/") + 1);
  });

function getConvertRouter(options) {
  const { app } = options;
  const routerData = routerConfig.map((config) => {
    const path = config.path || "/";
    const models = config.models || [];
    const title = config.title || "";
    const exact = config.exact || false;
    const icon = config.icon || null;
    const key = uuid();
    let cpn = config.component;
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
      key,
    };
  });
  return routerData;
}

export function getRouterData(options) {
  return getConvertRouter(options);
}

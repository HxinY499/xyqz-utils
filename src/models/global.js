import { getRouterData } from "../utils/routerConfig";

const global = {
  namespace: "global",

  state: {
    routerData: [11],
  },

  effects: {},

  reducers: {
    init(state, { payload }) {
      getRouterData();
      return {
        test1: [...state.test1, ...payload],
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },
};
export default global;

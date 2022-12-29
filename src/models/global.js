import { getRouterData } from '../utils/convertRouter';
import { app } from '../index';

const global = {
  namespace: 'global',

  state: {
    routerData: [],
  },

  effects: {
    *init(state, { put }) {
      window.dvaApp = app;
      const routes = getRouterData({ app });
      yield put({ type: 'updateState', payload: { routerData: routes } });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default global;

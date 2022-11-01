const test = {
  namespace: 'test',

  state: {
    testArr: 'a',
  },

  effects: {},

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      console.log('test');
      // eslint-disable-line
    },
  },
};
export default test;

const test = {
  namespace: 'test2',

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
      console.log('test2');
    },
  },
};
export default test;

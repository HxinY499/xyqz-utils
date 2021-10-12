export default {
  namespace: "example",

  state: {
    test1: [1, 2, 3],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   // eslint-disable-line
    //   yield put({ type: "save" });
    // },
  },

  reducers: {
    save(state, action) {
      console.log(state, action);
      return {
        test1: [...state.test1, ...action.payload],
      };
    },
  },
};

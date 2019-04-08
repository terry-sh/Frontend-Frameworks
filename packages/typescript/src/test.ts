import { Dispatch, Action } from "./lib/index";

const dispatch: Dispatch = function(action: any) {
  return action;
};

interface User {
  id: number;
  name: string;
}

const UserStore = {
  namespace: "user",
  state: {
    users: []
  },
  reducers: {
    update(state, { payload }: Action<User[]>) {
      return { ...state, users: payload }
    }
  },
  effects: {
    *fetchData(_, { put, call }: { put: Dispatch, call: any }) {
      try {
        const { data } = yield call(fetch('/api/users'))
        if (data) {
          put({ type: UserStore.reducers.update, payload: data });
        }
      } catch (error) {
        
      }
    }
  }
};

dispatch({ type: UserStore.reducers.update, payload: [] });
dispatch({ type: UserStore.reducers['update'], payload: [] });

interface AutState {}

const AuthStore = {
  namespace: "sys.auth",
  state: {} as AutState,
  reducers: {
    update(state: AutState, { payload }: Action<string>) {}
  },
  effects: {
    *doAuth({ payload }: Action<{ userName: string; password: string }>, { call, put }) {
      yield fetch("/api/auth");
    }
  }
};

dispatch({ type: AuthStore.reducers.update, payload: "L19leK32aeR" });
dispatch({ type: AuthStore.effects["doAuth"], payload: { userName: "admin", password: "1234" } });

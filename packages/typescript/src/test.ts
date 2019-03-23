import { Dispatch, Action } from "./lib/index";

const dispatch: Dispatch = function(action: any) {
  return action;
};

const UserStore = {
  namespace: "user",
  state: {},
  reducers: {
    update() {}
  }
};

dispatch({ type: UserStore.reducers.update, payload: 1 });
dispatch({ type: UserStore.reducers["update"], payload: 1 });

interface AutState {}
const AuthStore = {
  namespace: "sys.auth" as "sys.auth",
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

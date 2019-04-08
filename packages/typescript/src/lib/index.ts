export type Action<P = void> = { type: string } & P extends void ? {} : { payload: P };

export type Reducer<S, P = undefined> = P extends undefined
  ? (state: S, action: {}) => void
  : (state: S, action: { payload: P }) => void;

type Reducers<S> = Record<string, Reducer<S, any>>;

type Effect<S, P> = (state: S, payload: P) => void;
type Effects<S, P> = (state: S, payload: P) => void;

export interface StoreModel<S, R extends Reducers<S>, E, L> {
  state: S;
  reducers: R;
  effects: E;
  subscription: L;
}

type StoreReducersOnly<A extends object> = {
  reducers: A;
};

type StoreEffectsOnly<A extends object> = {
  effects: A;
};

type StoreActions<A extends object, E extends object> = {
  reducers: A;
  effects: E;
};

export type Actioner<S> = S extends StoreActions<infer R, infer E>
  ? (R & E)
  : S extends StoreReducersOnly<infer R>
  ? R
  : S extends StoreEffectsOnly<infer E>
  ? E
  : {};

type GetPayload<A> = A extends Reducer<any, infer P>
  ? P
  : A extends (action: { payload: infer P }, ...args: any[]) => void
  ? P
  : never;

export interface Dispatch {
  <T>(action: { type: T; payload: T extends string ? any : GetPayload<T> }): void;
}

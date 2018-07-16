// redux-act types by zerobias
// https://gist.github.com/zerobias/8c6aa2f286efe6fd0418c61b51786c2e

declare module 'redux-act' {
  /**
   * Single "action" as it referenced from classic redux
   * @typedef {{ type: string, payload: P }} Act.<P>
   * @template P
   */
  declare export type Act</* ::+*/ P = mixed> = {
    /* ::+*/ type: string,
    /* ::+*/ payload: P,
    error?: boolean,
  }

  /**
   * Function "action-creator", as it referenced from classic redux
   *
   * For us action-creator is nonsense; it *is* an action
   *
   * You have to use this as action type itself
   * @typedef {{(data: P) => Act}} Action.<P>
   * @template P
   * @export
   */
  declare export class Action<P = mixed> {
    (data: P): Act<P>;
    getType(): string;
  }

  declare export class AsyncAction<
    P = mixed,
    D = void,
    E = mixed,
  > extends Action<P> {
    done: Action<{ params: P, result: D }>;
    fail: Action<{ params: P, error: E }>;
  }

  declare export function createAction<P>(description: string): Action<P>

  /**
   * Reducer, which represents typed state value
   *
   * Generic type S could be inferred from your
   *  state reduce functions
   *
   * @class ReduxField
   * @template S
   * @export
   */
  declare export class ReduxField<S> {
    (state: S, action: any): S;
    on<P, A /* ::: Action<P> | $ReadOnlyArray<Action<P>> */>(
      actions: A,
      reducer: (state: S, payload: P) => S,
    ): ReduxField<S>;
  }

  declare export function createReducer<S>(
    untypedHandlers: {},
    defaults: S,
  ): ReduxField<S>
}

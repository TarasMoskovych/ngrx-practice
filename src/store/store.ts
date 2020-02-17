import { Action, State, Reducer } from '../models';

export class Store {
  private state: State;
  private reducers: Reducer;
  private subscribers: Function[];

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
    this.subscribers = [];
  }

  get value() {
    return this.state;
  }

  subscribe(fn: Function) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter((sub: Function) => sub !== fn);
    }
  }

  dispatch(action: Action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach((fn: Function) => fn(this.value));
  }

  private reduce(state: State, action: Action | {}) {
    const newState = {};

    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }

    return newState;
  }
}

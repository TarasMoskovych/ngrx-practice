import { Todo } from './../models';

export const ADD_TODO = '[Todo] Add Todo';
export const REMOVE_TODO = '[Todo] Remove Todo';

export class AddTodo {
  readonly type = ADD_TODO;

  constructor(public payload: Todo) { }
}

export class RemoveTodo {
  readonly type = REMOVE_TODO;

  constructor(public payload: Todo) { }
}

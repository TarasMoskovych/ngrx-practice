import { State } from './models';
import { renderTodos } from './utils';
import { AddTodo, RemoveTodo, Store, reducer } from './store';
// import * as actions from './store/actions';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  todos: reducer
};

const store = new Store(reducers);

// DOM Subscriptions
button.addEventListener('click',
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };

    // store.dispatch({
    //   type: actions.ADD_TODO,
    //   payload
    // });

    store.dispatch(new AddTodo(payload));

    input.value = '';
  },
  false
);

todoList.addEventListener('click', event => {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    const todo = JSON.parse(target.getAttribute('data-todo')!);
    store.dispatch(new RemoveTodo(todo));
  }
});

destroy.addEventListener('click', () => sub$());

// Store Subscriptions
const sub$ = store.subscribe((state: State) => renderTodos(state.todos.data));
store.subscribe((state: State) => console.log('STATE:', state));

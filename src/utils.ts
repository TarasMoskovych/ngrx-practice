import { Todo } from './models/todo.model';

const span = document.querySelector('span') as HTMLSpanElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

export function renderTodos(collection: Array<Todo>) {
  span.innerHTML = collection.length.toString();
  todoList.innerHTML = '';
  for (const item of collection) {
    todoList.innerHTML += `
      <li style="padding: 5px 0;">
        <div style="display: flex; justify-content: space-between;">
          ${item.label}
          <button type="button" data-todo='${JSON.stringify(item)}'>
            Delete
          </button>
        </div>
      </li>
     `;
  }
}

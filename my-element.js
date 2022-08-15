import {LitElement, html, css} from 'lit';

class Todo extends LitElement {
  constructor() {
    super();
    this.TodosList = [];
    this.input = null;
  }

  static properties = {
    TodosList: {type: Array},
    input: {type: String},
  };

  setInput(event) {
    this.input = event.target.value;
  }

  addTodo() {
    this.TodosList.push({
      name: this.input,
      id: this.TodosList.length + 1,
      completed: false,
    });
    this.requestUpdate();
  }

  updateTodo(todo) {
    todo.completed = !todo.completed;
    this.requestUpdate;
  }

  removeTodo(todo) {
    // console.log(todo);
    const id = todo.id;
    this.TodosList = this.TodosList.filter((todo) => todo.id !== id);
    this.requestUpdate();
  }

  static styles = css`
    .todos-wrapper {
      width: 35%;
      margin: 0px auto;
      background-color: rgb(136, 139, 241);
      padding: 20px;
      font-family: 'Verdana';
    }
    .list {
      margin-top: 9px;
    }
    .list li {
      background-color: white;
      list-style: none;
      padding: 6px;
      margin-top: 3px;
    }
    .completed {
      text-decoration-line: line-through;
      color: #777;
    }
    input {
      padding: 5px;
      width: 70%;
    }
    button {
      padding: 5px 10px;
      font-weight: bold;
    }
  `;

  render() {
    return html`<div class="todos-wrapper">
      <h4>My Todos List</h4>
      <input placeholder="Add task..." @input=${this.setInput} />
      <button @click=${this.addTodo}>Add</button>
      <div class="list">
        ${this.TodosList.map(
          (todo) => html` <li
            @click=${() => this.updateTodo(todo)}
            class=${todo.completed && 'completed'}
          >
            ${todo.name}
            <button @click=${() => this.removeTodo(todo)}>X</button>
          </li>`
        )}
      </div>
    </div>`;
  }
}

customElements.define('my-element', Todo);

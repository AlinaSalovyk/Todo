import TodoList from "./TodoList"
import "./TodoApp.css"

function TodoApp() {
    return (
        <div className="todo-app">
            <h1 className="todo-title">Todo List</h1>
            <TodoList />
        </div>
    )
}

export default TodoApp

"use client"

import { useState } from "react"
import TodoItem from "./TodoItem"
import AddTodoForm from "./AddTodoForm"
import "./TodoList.css"

function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: "Complete the React course." },
        { id: 2, text: "Get started with Node.js" },
        { id: 3, text: "Polish DS and Algorithms concepts." },
        { id: 4, text: "Test this app." },
    ])

    const handleAddTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
        }
        setTodos((prevTodos) => [...prevTodos, newTodo])
    }

    const handleDeleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }

    return (
        <div>
            <div className="add-todo-section">
                <h2 className="add-todo-title">Add Todo</h2>
                <AddTodoForm onAddTodo={handleAddTodo} />
            </div>
            <div className="todo-list">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
                ))}
            </div>
        </div>
    )
}

export default TodoList

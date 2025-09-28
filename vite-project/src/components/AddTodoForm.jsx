"use client"

import { useState } from "react"
import "./AddTodoForm.css"

function AddTodoForm({ onAddTodo }) {
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            onAddTodo(inputValue.trim())
            setInputValue("")
        }
    }

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                placeholder="Add new todo"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="add-button">
                Submit
            </button>
        </form>
    )
}

export default AddTodoForm

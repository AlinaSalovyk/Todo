"use client"

import { useState } from "react"
import "../components/TodoItem.css"

function TodoItem({ todo, onDelete }) {
    const [isCompleted, setIsCompleted] = useState(false)

    const handleComplete = () => {
        setIsCompleted(!isCompleted)
    }

    const handleDelete = () => {
        onDelete(todo.id)
    }

    return (
        <div className="todo-item">
            <span className={`todo-text ${isCompleted ? "completed" : ""}`}>{todo.text}</span>
            <div className="todo-actions">
                <button className="complete-button" onClick={handleComplete}>
                    ✓
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    ✕
                </button>
            </div>
        </div>
    )
}

export default TodoItem

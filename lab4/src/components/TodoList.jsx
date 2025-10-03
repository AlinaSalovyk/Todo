import { useState } from "react";
import useTodos from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import styles from "../styles/todolist.module.css";

export default function TodoList() {
    const [newTask, setNewTask] = useState("");
    const { todos, isLoading, error, addTodo, deleteTodo, toggleTodo } = useTodos(20);

    const handleAdd = () => {
        if (!newTask.trim()) return;
        addTodo(newTask);
        setNewTask("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <input
                    className={styles.input}
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Нова задача..."
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <button className={styles.addBtn} onClick={handleAdd}>
                    Додати
                </button>
            </div>

            {isLoading && <p className={styles.loading}>Завантаження...</p>}
            {error && <p className={styles.error}>Помилка: {String(error)}</p>}

            <ul className={styles.list}>
                {todos.length === 0 && !isLoading && (
                    <li className={styles.empty}>Список задач порожній</li>
                )}
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

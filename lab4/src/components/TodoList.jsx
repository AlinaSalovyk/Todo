import React, { useState, useMemo, useCallback } from "react";
import useTodos from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import styles from "../styles/todolist.module.css";

export default function TodoList() {
    const [newTask, setNewTask] = useState("");

    const {
        todos,
        isLoading,
        error,
        addTodo,
        deleteTodo,
        toggleTodo,
        editTodoTitle,
        searchTerm,
        setSearchTerm,
        currentPage,
        limitPerPage,
        totalTodos,
        totalPages,
        goToNextPage,
        goToPrevPage,
        setLimit,
    } = useTodos(10);

    const handleAdd = useCallback(() => {
        if (!newTask.trim()) return;
        addTodo(newTask);
        setNewTask("");
    }, [newTask, addTodo]);

    const visibleTodos = useMemo(() => todos, [todos]);

    return (
        <div className={styles.container}>
            {/* Add */}
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

            {/* Search */}
            <div className={styles.controls}>
                <input
                    className={styles.input}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Пошук за назвою..."
                />
                <select
                    className={styles.input}
                    value={limitPerPage}
                    onChange={(e) => setLimit(Number(e.target.value))}
                >
                    <option value={5}>5 / стор.</option>
                    <option value={10}>10 / стор.</option>
                    <option value={20}>20 / стор.</option>
                </select>
            </div>

            {/* Status */}
            {isLoading && <p className={styles.loading}>Завантаження...</p>}
            {error && <p className={styles.error}>Помилка: {String(error)}</p>}

            {/* List */}
            <ul className={styles.list}>
                {visibleTodos.length === 0 && !isLoading && (
                    <li className={styles.empty}>Нічого не знайдено</li>
                )}
                {visibleTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onEdit={editTodoTitle}
                    />
                ))}
            </ul>

            {/* Pagination */}
            <div className={styles.pagination}>
                <div className={styles.paginationButtons}>
                    <button
                        className={styles.pageBtn}
                        onClick={goToPrevPage}
                        disabled={currentPage <= 1}
                    >
                        ⬅ Previous
                    </button>
                    <button
                        className={styles.pageBtn}
                        onClick={goToNextPage}
                        disabled={currentPage >= totalPages}
                    >
                        Next ➡
                    </button>
                </div>
                <div className={styles.pageInfo}>
                    Сторінка <strong>{currentPage}</strong> з{" "}
                    <strong>{totalPages}</strong> • Всього:{" "}
                    <strong>{totalTodos}</strong>
                </div>
            </div>
        </div>
    );
}

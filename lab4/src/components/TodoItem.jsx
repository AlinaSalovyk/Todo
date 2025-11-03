import React, { useState } from "react";
import styles from "../styles/todoitem.module.css";

const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(todo.todo);

    const startEdit = () => {
        setDraft(todo.todo);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setDraft(todo.todo);
        setIsEditing(false);
    };

    const saveEdit = async () => {
        const title = draft.trim();
        if (!title || title === todo.todo) {
            setIsEditing(false);
            return;
        }
        await onEdit(todo.id, title);
        setIsEditing(false);
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") cancelEdit();
    };

    return (
        <li className={`${styles.item} ${todo.completed ? styles.completed : ""}`}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                {isEditing ? (
                    <input
                        className={styles.text}
                        autoFocus
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                ) : (
                    <span className={styles.text}>{todo.todo}</span>
                )}
            </label>
            <div className={styles.actions}>
                {isEditing ? (
                    <>
                        <button className={styles.delBtn} onClick={saveEdit}>Save</button>
                        <button className={styles.delBtn} onClick={cancelEdit}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className={styles.delBtn} onClick={startEdit}>Edit</button>
                        <button className={styles.delBtn} onClick={() => onDelete(todo.id)}>Видалити</button>
                    </>
                )}
            </div>
        </li>
    );
});

export default TodoItem;

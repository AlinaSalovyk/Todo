import styles from "../styles/todoitem.module.css";

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className={`${styles.item} ${todo.completed ? styles.completed : ""}`}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span className={styles.text}>{todo.todo}</span>
            </label>
            <div className={styles.actions}>
                <button className={styles.delBtn} onClick={() => onDelete(todo.id)}>
                    Видалити
                </button>
            </div>
        </li>
    );
}

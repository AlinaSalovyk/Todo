import styles from "../styles/app.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>Мій Todo List</h1>
            <p className={styles.subtitle}>Список справ для ефективного дня</p>
        </header>
    );
}

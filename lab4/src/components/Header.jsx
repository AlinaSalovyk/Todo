import React from "react";
import styles from "../styles/app.module.css";

const Header = React.memo(function Header() {
    return (
        <header className={styles.header}>
            <h1>Мій Todo List</h1>
            <p className={styles.subtitle}>Список справ для ефективного дня</p>
        </header>
    );
});

export default Header;

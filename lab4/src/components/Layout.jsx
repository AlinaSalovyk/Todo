// src/components/Layout.jsx
import Header from "./Header";
import styles from "../styles/app.module.css";

export default function Layout({ children }) {
    return (
        <div className={styles.app}>
            <Header />
            <main className={styles.main}>{children}</main>
        </div>
    );
}

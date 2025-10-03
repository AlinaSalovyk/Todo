// src/App.jsx
import React from "react";
import TodoList from "./components/TodoList";
import Layout from "./components/Layout";

export default function App() {
    return (
        <Layout>
            <TodoList />
        </Layout>
    );
}
